"use client";

import React, { Suspense, useCallback } from "react";
import { FileDataProvider, useFileDataContext } from "./context/context";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "@ag-grid-community/theming";
import { Button } from "@vivekkv178/library";
import { Icon } from "@iconify/react";
import { FE_ROUTES } from "@/lib/constants";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FILE_DATA_CONSTANTS } from "./utils/constants";

const myTheme = themeQuartz.withParams({
  accentColor: "#212130",
  // backgroundColor: "#FEF9F5",
  browserColorScheme: "light",
  foregroundColor: "#212130",
  headerBackgroundColor: "#e6e9ed",
  headerFontSize: 14,
  headerTextColor: "#212130",
});

function FileData() {
  const { commonState } = useFileDataContext();

  const getRowId = useCallback(function (params: any) {
    return params.data.id;
  }, []);

  return (
    <>
      <div className="tw-flex tw-justify-between">
        <Link href={FE_ROUTES.HOME}>
          <Button variant="outline">
            <Icon icon="lucide:circle-arrow-left" className="mr-2 h-4 w-4" />
            <span>Back to All Files</span>
          </Button>
        </Link>
        <div>
          <div className="tw-text-right tw-text-xl tw-font-bold">
            {commonState?.fileData?.fileName}
          </div>
          <div className="tw-text-right tw-text-sm ">
            {commonState?.fileData?.status}
          </div>
          <div className="tw-text-right tw-text-sm ">
            {commonState?.fileData?.createdAt}
          </div>
        </div>
      </div>

      <Tabs
        defaultValue={commonState?.selectedTab}
        onValueChange={commonState?.setSelectedTab}
      >
        <TabsList className="tw-mb-2">
          <TabsTrigger
            className="data-[state=active]:tw-bg-white"
            value={FILE_DATA_CONSTANTS.SERVER_PAGINATION}
            disabled={commonState?.loading}
          >
            Server Pagination
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:tw-bg-white"
            value={FILE_DATA_CONSTANTS.CLIENT_PAGINATION}
            disabled={commonState?.loading}
          >
            Client Pagination
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {commonState?.gridReady &&
        commonState?.selectedTab === FILE_DATA_CONSTANTS.SERVER_PAGINATION && (
          <AgGridReact
            theme={myTheme}
            defaultColDef={commonState?.defaultColDef}
            ref={commonState?.gridRef}
            pagination={true}
            columnDefs={commonState?.colDefs}
            singleClickEdit
            rowModelType={"infinite"}
            cacheBlockSize={10}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            maxConcurrentDatasourceRequests={1}
            getRowId={getRowId}
            onGridReady={commonState?.onGridReady}
            loading={commonState?.loading}
          />
        )}

      {commonState?.gridReady &&
        commonState?.selectedTab === FILE_DATA_CONSTANTS.CLIENT_PAGINATION && (
          <AgGridReact
            theme={myTheme}
            defaultColDef={commonState?.defaultColDef}
            ref={commonState?.gridRef}
            pagination={true}
            rowData={commonState?.rowData}
            columnDefs={commonState?.colDefs}
            singleClickEdit
            loading={commonState?.loading}
          />
        )}
    </>
  );
}

const ManageFileData = () => {
  return (
    <Suspense>
      <FileDataProvider>
        <FileData />
      </FileDataProvider>
    </Suspense>
  );
};

export default ManageFileData;
