import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import { replaceUrl, toast } from "@vivekkv178/library";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/reduxHooks";
import { FILE_DATA_CONSTANTS } from "../utils/constants";

const useCommonState = () => {
  const authState = useAppSelector((state) => state.auth);
  const api = useApi();

  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState([]);
  const [fileData, setFileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [gridReady, setGridReady] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    FILE_DATA_CONSTANTS.SERVER_PAGINATION,
  );
  const [colDefs, setColDefs] = useState<any[]>([]);

  const defaultColDef = useMemo(() => {
    return {
      width: 100,
      editable: false,
      sortable: true,
      filter: true,
    };
  }, []);

  const generateColumns = (fields: any) => {
    const generatedColumnDefs = fields?.map((field: string) => ({
      headerName: field,
      field,
      sortable: true,
      filter: selectedTab === FILE_DATA_CONSTANTS.CLIENT_PAGINATION,
      resizable: true,
    }));

    generatedColumnDefs[0].cellRenderer = (props: CustomCellRendererProps) => {
      if (props.value !== undefined) {
        return props.value;
      } else {
        return "Loading........";
      }
    };
    setColDefs(generatedColumnDefs);
  };

  const getFileData = async () => {
    setLoading(true);
    try {
      const response = await api.callApi({
        url: replaceUrl(BE_ROUTES.GET_FILE_DATA_URL, { fileId: fileId || "" }),
        method: HttpMethod.GET,
      });
      generateColumns(response?.fields);
      setRowData(response?.data);
      setFileData(response);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while fetching.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const getServerSideDatasource = () => {
    return {
      getRows: async (params: any) => {
        const { startRow, endRow } = params;
        try {
          setLoading(true);

          const response = await api.callApi({
            url: replaceUrl(BE_ROUTES.GET_FILE_DATA_URL, {
              fileId: fileId || "",
            }),
            method: HttpMethod.GET,
            params: {
              startRow,
              endRow,
            },
          });

          generateColumns(response?.fields);
          setLoading(false);

          params.successCallback(response.data, response.totalRecords);
        } catch (error) {
          params.fail();
        }
      },
    };
  };

  const onGridReady = useCallback(
    (params: any) => {
      if (authState?.user) {
        const datasource = getServerSideDatasource();
        params.api.setGridOption("datasource", datasource);
      }
    },
    [authState?.user],
  );

  useEffect(() => {
    if (authState?.user) {
      setGridReady(true);
    }
  }, [authState?.user]);

  useEffect(() => {
    if (selectedTab === FILE_DATA_CONSTANTS.CLIENT_PAGINATION) {
      getFileData();
    }
  }, [selectedTab]);

  return {
    gridRef,
    loading,
    defaultColDef,
    rowData,
    colDefs,
    fileData,
    selectedTab,
    gridReady,
    setSelectedTab,
    onGridReady,
  };
};

export default useCommonState;
