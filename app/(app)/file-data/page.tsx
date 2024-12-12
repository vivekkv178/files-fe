"use client";

import React from "react";

import { FileDataProvider, useFileDataContext } from "./context/context";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "@ag-grid-community/theming";
import { Button } from "@vivekkv178/library";
import { Icon } from "@iconify/react";
import { FE_ROUTES } from "@/lib/constants";
import Link from "next/link";

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
      {commonState?.loading ? (
        <div className="tw-grid tw-place-items-center">
          <Icon
            icon="lucide:loader-circle"
            className="tw-h-12 tw-w-12 tw-animate-spin"
          />
        </div>
      ) : (
        <AgGridReact
          theme={myTheme}
          defaultColDef={commonState?.defaultColDef}
          ref={commonState?.gridRef}
          pagination={true}
          rowData={commonState?.rowData}
          columnDefs={commonState?.colDefs}
          singleClickEdit
        />
      )}
    </>
  );
}

const ManageFileData = () => {
  return (
    <FileDataProvider>
      <FileData />
    </FileDataProvider>
  );
};

export default ManageFileData;
