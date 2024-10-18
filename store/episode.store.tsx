import { create } from "zustand";

export interface IEpisodeStore {
  currentEpisodeCharacters: string[];
  setCurrentEpisodeCharacters: (characters: string[]) => void;
}

export const useEpisodeStore = create<IEpisodeStore>((set) => ({
  currentEpisodeCharacters: [],
  setCurrentEpisodeCharacters: (characters) =>
    set({ currentEpisodeCharacters: characters }),
}));
