import { Hero as HeroComponent, Stat } from "@vivekkv178/library";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Hero = () => {
  const data = {
    heroTitle: "Typescript, Next.js & Node.js",
    heroDescription:
      "Transform your file management with My-Files – the ultimate solution for seamless file uploads, processing, and dynamic search. Effortlessly organize, explore, and unlock the potential of your data like never before!",
  };
  return (
    <div className="mb-20">
      <HeroComponent
        NavigationComponent={Link}
        heroImg={
          <div className="tw-hidden xl:tw-flex">
            <img
              src={`${process.env.NEXT_PUBLIC_CDN_PATH}/files/Hero.png`}
              className="tw-w-full tw-h-full -tw-mt-20 rounded-lg"
            />
          </div>
        }
        heroDescription={data?.heroDescription!}
        heroTitle={data?.heroTitle}
        heroText={<h1 className="h1 mb-4">{"My-Files"}</h1>}
        primaryButton={{
          icon: <Icon icon="lucide:arrow-down" />,
          label: "Get Started",
          variant: "default",
          link: "#usecase",
        }}
        secondaryButton={{
          icon: <Icon icon="lucide:github" />,
          label: "Github",
          variant: "default",
          link: "https://github.com/vivekkv178/files-fe",
          newTab: true,
        }}
      />
    </div>
  );
};

export default Hero;
