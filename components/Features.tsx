import React from "react";
import { Stat } from "@vivekkv178/library";
import { Icon } from "@iconify/react";

const Features = () => {
  return (
    <section id="features" className="tw-mb-12 xl:tw-mb-20">
      <div className="container mx-auto">
        <h2 className="section-title mb-12 xl:mb-24 text-center mx-auto">
          Features
        </h2>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 xl:tw-grid-cols-4 tw-justify-center tw-items-center tw-gap-y-4 xl:tw-gap-y-4 xl:tw-gap-x-2">
          {[
            {
              icon: "lucide:shield-plus",
              badgeText: "Sign Up",
            },
            {
              icon: "lucide:shield-check",
              badgeText: "Sign In",
            },
            {
              icon: "lucide:cloud-upload",
              badgeText: "Upload CSV Files",
            },
            {
              icon: "lucide:file-search",
              badgeText: "View File Data",
            },
          ]?.map((stat: any, index: any) => (
            <div
              key={index}
              className="tw-flex tw-justify-center tw-items-center"
            >
              <Stat
                key={index}
                containerStyles=""
                icon={<Icon icon={stat?.icon} className="w-8 h-8" />}
                endCountNum={stat?.endCountNum}
                endCountText={stat?.endCountText}
                badgeText={stat?.badgeText}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
