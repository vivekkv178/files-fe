import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@vivekkv178/library";
import { Button } from "@vivekkv178/library";
import { useComponentContext } from "../context/context";
import { Loader2 } from "lucide-react";
import { HOME_CONSTANTS } from "../utils/constants";

const SuccessDialog = () => {
  const { commonState } = useComponentContext();

  return (
    <Dialog
      open={commonState?.successDialog}
      onOpenChange={() =>
        commonState?.dialogCloseHandler(HOME_CONSTANTS.SUCCESS_DIALOG)
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Success</DialogTitle>
          <DialogDescription>
            Your file has been successfully uploaded! We are currently
            processing it. Please refresh the page to check the status of your
            file.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="default"
            onClick={() =>
              commonState?.dialogCloseHandler(HOME_CONSTANTS.SUCCESS_DIALOG)
            }
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
