import { create } from "zustand";

import { ICharactorResult } from "@/interface";

interface ICharacterStore {
  loadedCharacters: ICharactorResult[];
  setLoadedCharacters: (characters: ICharactorResult[]) => void;
}

export const useCharacterStore = create<ICharacterStore>((set) => ({
  loadedCharacters: [],
  setLoadedCharacters: (characters) => set({ loadedCharacters: characters }),
}));
