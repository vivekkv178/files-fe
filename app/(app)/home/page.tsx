"use client";

import React from "react";

import Main from "./components/Main";
import { ComponentProvider, useComponentContext } from "./context/context";
import { Icon } from "@iconify/react";
import SuccessDialog from "./components/SuccessDialog";
import Upload from "./components/Upload";

function Home() {
  const { commonState } = useComponentContext();

  return (
    <>
      {commonState?.listLoading ? (
        <div className="tw-grid tw-place-items-center">
          <Icon
            icon="lucide:loader-circle"
            className="tw-h-12 tw-w-12 tw-animate-spin"
          />
        </div>
      ) : (
        <>
          <div className="tw-text-center tw-text-xl tw-font-bold">{`Home`}</div>

          <Upload />

          <div className="tw-text-center tw-text-xl tw-font-bold">{`My Files`}</div>

          <div className="tw-max-w-[85rem] tw-px-4 tw-py-10 sm:tw-px-6 lg:tw-px-8 lg:tw-py-14 tw-mx-auto">
            <div className="tw-grid sm:tw-grid-cols-2 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-3 sm:tw-gap-6">
              {commonState?.mainItems?.map((mainItem, index) => (
                <Main key={index} mainItem={mainItem} />
              ))}
            </div>
          </div>

          <SuccessDialog />
        </>
      )}
    </>
  );
}

const Manage = () => {
  return (
    <ComponentProvider>
      <Home />
    </ComponentProvider>
  );
};

export default Manage;
