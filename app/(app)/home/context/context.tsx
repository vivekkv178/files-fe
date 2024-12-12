import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import useCommonState from "../hooks/useCommonState";
import { MainItem } from "../utils/types";

/**
 * @todo
 * Handle types properly
 */
type CommonState = {
  // Define the structure of your common state here
  listLoading: boolean;
  mainItems: MainItem[];
  onFileUpload: any;
  onFileChange: any;
  uploadProgress: any;
  isUploading: any;
  urlLoading: any;
  successDialog: boolean;
  dialogCloseHandler: any;
};

type ComponentContextType = {
  commonState: CommonState;
};

type ComponentProviderProps = {
  children: React.ReactNode;
};

const ComponentContext = createContext<ComponentContextType | null>(null);

export const ComponentProvider: React.FC<ComponentProviderProps> = ({
  children,
}) => {
  const commonState = useCommonState();
  return (
    <ComponentContext.Provider value={{ commonState }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error(
      "useComponentContext must be used within an ComponentProvider",
    );
  }
  return context;
};
