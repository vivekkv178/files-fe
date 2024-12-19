import React from "react";
import { Button, CardFooter } from "@vivekkv178/library";
import { useComponentContext } from "../context/context";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@vivekkv178/library";
import { MainItem } from "../utils/types";
import { HOME_CONSTANTS } from "../utils/constants";
import { FE_ROUTES } from "@/lib/constants";

type MainProps = {
  mainItem: MainItem;
};

const MainComp: React.FC<MainProps> = ({ mainItem }) => {
  const { commonState } = useComponentContext();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Icon
            icon="fa-solid:file-csv"
            className="mr-2 h-8 w-8 tw-fill-red-50"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainItem?.fileName}</div>
        <div className="tw-flex tw-mt-2">
          {mainItem?.status === HOME_CONSTANTS.STATUS_COMPLETED && (
            <Icon icon="lucide:circle-check" className="mr-2 h-4 w-4" />
          )}
          {mainItem?.status === HOME_CONSTANTS.STATUS_ERROR && (
            <Icon icon="lucide:circle-x" className="mr-2 h-4 w-4" />
          )}
          {mainItem?.status === HOME_CONSTANTS.STATUS_PROCESSING && (
            <Icon icon="lucide:clock-4" className="mr-2 h-4 w-4" />
          )}
          <p className="text-xs text-muted-foreground">
            {mainItem?.status === HOME_CONSTANTS.STATUS_COMPLETED
              ? HOME_CONSTANTS.STATUS_PROCESSED
              : mainItem?.status}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <Button
          disabled={mainItem?.status === HOME_CONSTANTS.STATUS_PROCESSING}
          onClick={() =>
            commonState?.redirectHandler(
              `${FE_ROUTES.FILE_DATA}?fileId=${mainItem?._id}`,
            )
          }
        >
          <Icon icon="lucide:file-symlink" className="mr-2 h-4 w-4" />
          View Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MainComp;
