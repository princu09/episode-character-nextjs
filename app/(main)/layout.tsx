import EpisodeList from "../../components/EpisodeList";

import { siteConfig } from "@/config/site";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  // block scrolling

  return (
    <div className="">
      <h1 className="text-center text-red-600 text-2xl font-semibold mt-5 mb-10">
        {siteConfig.name}
      </h1>
      <div className="flex gap-x-10">
        <EpisodeList />
        {children}
      </div>
    </div>
  );
};

export default layout;
