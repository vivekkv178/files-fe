"use client";
import { SectionTitle } from "@vivekkv178/library";

const Usecase = () => {
  return (
    <section id="usecase" className="relative mb-2 xl:mb-48 p-8">
      <div className="container mx-auto xl:flex xl:space-x-8 gap-x-20">
        {/* text */}
        <div className="tw-max-w-[500px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col justify-center items-center xl:items-start">
          <SectionTitle title="Usecase" />
          <p className="subtitle mb-8 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <p className="subtitle">
                  This application demonstrates a common use case scenario where
                  a user uploads CSV files to the platform for processing and
                  storage. The user can then search, filter, and explore their
                  data with ease. Users can efficiently manage and analyze their
                  data using dynamic, real-time search.
                </p>
              </div>
            </div>
          </p>
        </div>
        <div className="mx-auto">
          <img
            src="https://raw.githubusercontent.com/vivekkv178/cdn/main/files/Usecase.png"
            className="tw-rounded-sm tw-h-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Usecase;
