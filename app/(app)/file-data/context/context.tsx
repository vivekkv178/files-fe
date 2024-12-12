import React, { MutableRefObject, createContext, useContext } from "react";
import useCommonState from "../hooks/useCommonState";
import { AgGridReact } from "ag-grid-react";

/**
 * @todo
 * Handle types properly
 */
type CommonState = {
  // Define the structure of your common state here
  gridRef: MutableRefObject<AgGridReact | null>;
  loading: boolean;
  defaultColDef: any;
  rowData: any;
  colDefs: any;
  fileData: any;
};

type FileDataContextType = {
  commonState: CommonState;
};

type FileDataProviderProps = {
  children: React.ReactNode;
};

const FileDataContext = createContext<FileDataContextType | null>(null);

export const FileDataProvider: React.FC<FileDataProviderProps> = ({
  children,
}) => {
  const commonState = useCommonState();
  return (
    <FileDataContext.Provider value={{ commonState }}>
      {children}
    </FileDataContext.Provider>
  );
};

export const useFileDataContext = () => {
  const context = useContext(FileDataContext);
  if (!context) {
    throw new Error(
      "useFileDataContext must be used within an FileDataProvider",
    );
  }
  return context;
};
