"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IEpisodeResult } from "@/interface";
import { useEpisodeStore } from "@/store/episode.store";

interface EpisodeBoxProps {
  episode: IEpisodeResult;
}

const EpisodeBox: React.FC<EpisodeBoxProps> = ({ episode }) => {
  const { _id } = useParams();
  const [selectedEpisode, setSelectedEpisode] = useState(false);
  const router = useRouter();

  const setCurrentEpisodeCharacters = useEpisodeStore(
    (state) => state.setCurrentEpisodeCharacters
  );

  useEffect(() => {
    if (Number(_id) === episode.id) {
      setSelectedEpisode(true);

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setSelectedEpisode(false);
          router.push("/?page=1");
        }
      });
    } else {
      setSelectedEpisode(false);
    }
  }, []);

  const handleBoxClick = () => {
    if (selectedEpisode) {
      setSelectedEpisode(false);
      router.push("/?page=1");
      return;
    }

    setSelectedEpisode(true);
    router.push(`/character/${episode.id}`);
    setCurrentEpisodeCharacters(episode.characters);
  };

  return (
    <button
      className={`bg-red-50/20 rounded-lg p-2 cursor-pointer select-none text-center max-w-[200px] ${selectedEpisode ? "border-2 border-red-500 bg-white text-red-500" : ""}`}
      id="episode-box"
      onClick={handleBoxClick}
    >
      <h1 className="">{episode.name}</h1>
      <p className="text-xs">{episode.episode}</p>
    </button>
  );
};

export default EpisodeBox;
