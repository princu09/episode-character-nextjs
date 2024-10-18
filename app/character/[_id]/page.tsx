"use client";
import { useEffect, useState } from "react";
import CharacterBox from "@/components/CharacterBox.component";
import { useCharacterStore } from "@/store/character.store";
import { useEpisodeStore } from "@/store/episode.store";
import apiClient from "@/config/_axiosSetupClient";

interface ICharacterProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface Character {
  id: number;
  loaded: boolean;
  [key: string]: any;
}

const SingleCharacter: React.FC<ICharacterProps> = () => {
  const loadedCharacters = useCharacterStore((state) => state.loadedCharacters);
  const setLoadedCharacters = useCharacterStore(
    (state) => state.setLoadedCharacters
  );
  const currentEpisodeCharacters = useEpisodeStore(
    (state) => state.currentEpisodeCharacters
  );

  const [mainData, setMainData] = useState<Character[]>([]);
  const [filteredData, setFilteredData] = useState<Character[]>([]);

  useEffect(() => {
    if (currentEpisodeCharacters) {
      const ids = currentEpisodeCharacters.map((character) =>
        character.replace("https://rickandmortyapi.com/api/character/", "")
      );

      const charactersWithLoadStatus = ids.map((id) => {
        const loadedCharacter = loadedCharacters.find(
          (character) => Number(character.id) === Number(id)
        );

        return loadedCharacter
          ? { id: Number(id), loaded: true, ...loadedCharacter }
          : { id: Number(id), loaded: false };
      });

      setMainData(charactersWithLoadStatus);
      setFilteredData(charactersWithLoadStatus);
    }
  }, [currentEpisodeCharacters]);

  const loadCharacterData = async (characterId: number) => {
    try {
      const { data } = await apiClient(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );

      setFilteredData((prev) =>
        prev.map((item) =>
          item.id === characterId
            ? {
                ...item,
                ...data,
                loaded: true,
              }
            : item
        )
      );
    } catch (error) {
      console.error(`Error fetching character with ID ${characterId}:`, error);
    }
  };

  useEffect(() => {
    if (mainData) {
      const unloadedCharacters = mainData.filter(
        (character) => !character.loaded
      );

      unloadedCharacters.forEach((character) => {
        setTimeout(() => {
          loadCharacterData(character.id);
        }, 1000);
      });
    }
  }, [mainData]);

  useEffect(() => {
    const uniqueCharacters = filteredData.filter(
      (item) =>
        !loadedCharacters.some((char) => char.id === item.id) && item.loaded
    );

    setLoadedCharacters([...loadedCharacters, ...uniqueCharacters]);
  }, [filteredData]);

  return (
    <div className="flex flex-wrap gap-x-5">
      {filteredData.map((character) => (
        <CharacterBox
          key={character.id}
          item={character}
          loaded={character.loaded}
        />
      ))}
    </div>
  );
};

export default SingleCharacter;
