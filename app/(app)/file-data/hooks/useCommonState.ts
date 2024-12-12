import { useEffect, useMemo, useRef, useState } from "react";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import { replaceUrl, toast } from "@vivekkv178/library";
import { AgGridReact } from "ag-grid-react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/reduxHooks";

const useCommonState = () => {
  const authState = useAppSelector((state) => state.auth);
  const api = useApi();

  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState([]);
  const [fileData, setFileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [colDefs, setColDefs] = useState<any[]>([]);

  const defaultColDef = useMemo(() => {
    return {
      width: 100,
      editable: false,
      sortable: true,
      filter: true,
    };
  }, []);

  const getFileData = async () => {
    setLoading(true);
    try {
      const response = await api.callApi({
        url: replaceUrl(BE_ROUTES.GET_FILE_DATA_URL, { fileId: fileId || "" }),
        method: HttpMethod.GET,
      });
      const generatedColumnDefs = response?.fields?.map((field: string) => ({
        headerName: field,
        field,
        sortable: true,
        filter: true,
        resizable: true,
      }));
      setColDefs(generatedColumnDefs);
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

  useEffect(() => {
    if (authState?.user) getFileData();
  }, [authState?.user]);

  return {
    gridRef,
    loading,
    defaultColDef,
    rowData,
    colDefs,
    fileData,
  };
};

export default useCommonState;
