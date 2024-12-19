"use client";

import React from "react";
import { Button, Input, Label } from "@vivekkv178/library";
import { Progress } from "@/components/ui/progress";
import { useComponentContext } from "../context/context";
import { Icon } from "@iconify/react";

const Upload = () => {
  const { commonState } = useComponentContext();

  return (
    <>
      <div className="tw-flex tw-items-end tw-gap-2">
        <div className="tw-w-full tw-items-center tw-gap-1.5">
          <Label htmlFor="csv-file">CSV File</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={commonState?.onFileChange}
          />
        </div>
        <div>
          <Button
            onClick={commonState?.onFileUpload}
            disabled={commonState?.urlLoading || !commonState?.file}
          >
            {commonState?.urlLoading ? (
              <Icon
                icon="lucide:loader-circle"
                className="h-4 w-4 animate-spin"
              />
            ) : (
              <Icon icon="lucide:upload" className="mr-2 h-4 w-4" />
            )}
            Upload
          </Button>
        </div>
      </div>

      {commonState?.isUploading ? (
        <Progress value={commonState?.uploadProgress} />
      ) : null}
    </>
  );
};

export default Upload;
