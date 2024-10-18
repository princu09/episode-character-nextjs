"use client";
import { useEffect } from "react";

import { ICharactorResult } from "@/interface";
import { useCharacterStore } from "@/store/character.store";

interface ILoadNewCharactersProps {
  characters: ICharactorResult[];
}

export const LoadNewCharacters: React.FC<ILoadNewCharactersProps> = ({
  characters,
}) => {
  const loadNewCharacters = useCharacterStore(
    (state) => state.loadedCharacters
  );

  const setLoadedCharacters = useCharacterStore(
    (state) => state.setLoadedCharacters
  );

  useEffect(() => {
    // find unique characters
    const uniqueCharacters = characters.filter(
      (item) => !loadNewCharacters.some((char) => char.id === item.id)
    );

    setLoadedCharacters([...loadNewCharacters, ...uniqueCharacters]);
  }, [characters]);

  return null;
};
