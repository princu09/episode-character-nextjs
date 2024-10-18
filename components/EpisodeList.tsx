"use client";

import { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import EpisodeBox from "./EpisodeBox.component";

import { IEpisodeRes, IEpisodeResult } from "@/interface";
import api from "@/config/_axiosSetup";

const EpisodeList = () => {
  const [page, setPage] = useState({
    page: 1,
    maxPage: 1,
  });
  const [episodeData, setEpisodeData] = useState<IEpisodeResult[] | null>(null);
  const fetchEpisodes = async (currentPage = 1) => {
    const res: IEpisodeRes = await api
      .get(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
      .then((res) => res.data);

    if (res) {
      setPage({
        ...page,
        maxPage: res.info.pages,
      });
    }

    if (currentPage === 1) setEpisodeData(res?.results);

    if (currentPage > 1) {
      setEpisodeData((prev) => [...(prev || []), ...res?.results]);
    }

    return res;
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  return (
    <ScrollShadow
      hideScrollBar
      className="flex flex-col gap-y-2 h-[80vh] pb-10 min-w-[250px]"
    >
      {episodeData?.map((episode) => (
        <EpisodeBox key={episode.id} episode={episode} />
      ))}

      {page.page < page.maxPage && (
        <button
          className="bg-blue-500 text-white rounded-md py-2 w-fit px-4"
          onClick={() => {
            if (page.page < page.maxPage) {
              fetchEpisodes(page.page + 1).then(() =>
                setPage({
                  ...page,
                  page: page.page + 1,
                })
              );
            }
          }}
        >
          Load More
        </button>
      )}
    </ScrollShadow>
  );
};

export default EpisodeList;
