import { create } from "zustand";
import { BeersService } from "@/app/lib/BearsAPI";
import { TBeer } from "@/app/types/bears";

type State = {
  firstIndex: number;
  displayedBeers: TBeer[];
  selectedBeers: number[]; //array with ids
  beers: TBeer[];
  page: number;
  areMoreBears: boolean;
};

type Action = {
  setBeers: (beers: TBeer[]) => void;
  addNext5: () => void;
  removeBears: () => void;
  updateDisplayedBeers: () => void;
  addSelected: (id: number) => void;
  removeSelected: (id: number) => void;
};

const sliceBeers = (startIndex: number, beers: TBeer[]) => {
  //since array slice returns a shallow copy, it's better to make a deep copy
  const result = [];
  for (let i = startIndex; i < startIndex + 15; i++) {
    result.push(beers[i]);
  }

  return result;
};

export const useBeers = create<State & Action>((set, get) => {
  return {
    areMoreBears: true,
    firstIndex: 0,
    beers: [],
    page: 1,
    displayedBeers: [],
    selectedBeers: [],
    setBeers: (beers) =>
      set((state) => ({
        beers,
        firstIndex: 0,
        displayedBeers: sliceBeers(0, beers),
      })),
    addNext5: async () => {
      const firstIndex = get().firstIndex + 5;
      if (get().beers.length - 1 - get().firstIndex <= 15) {
        const fetchedBeers = await BeersService.getPage(get().page + 1);
        if (fetchedBeers.length === 0) {
          set((state) => ({
            areMoreBears: false,
          }));
          return;
        }
        const allBeers = [...get().beers, ...fetchedBeers];
        const displayedBeers = sliceBeers(firstIndex, allBeers);
        set((state) => ({
          beers: allBeers,
          firstIndex,
          page: state.page + 1,
          displayedBeers,
          selectedBeers: state.selectedBeers.filter((id) =>
            displayedBeers.some((beer) => beer.id === id),
          ),
        }));
      }
      set((state) => ({
        displayedBeers: sliceBeers(firstIndex, state.beers),
        firstIndex,
      }));
    },
    removeBears: () => {
      const beers = get().beers.filter((beer) => {
        return get().selectedBeers.every((id) => id != beer.id);
      });

      set(() => ({
        beers,
        selectedBeers: [],
      }));

      get().updateDisplayedBeers();
    },
    updateDisplayedBeers: async () => {
      //define if we need to fetch more beers after beers deletion
      const leftBeers = get().beers.length - 1 - get().firstIndex;
      if (leftBeers < 15) {
        const fetchedBeers = await BeersService.getPage(get().page + 1);
        if (fetchedBeers.length === 0) {
          set((state) => ({
            areMoreBears: false,
            displayedBeers: sliceBeers(state.firstIndex, state.beers),
          }));
          return;
        }
        const allBeers = [...get().beers, ...fetchedBeers];
        const displayedBeers = sliceBeers(get().firstIndex, allBeers);
        set((state) => ({
          beers: allBeers,
          page: state.page + 1,
          displayedBeers,
        }));
      }

      return set((state) => ({
        displayedBeers: sliceBeers(state.firstIndex, state.beers),
      }));
    },
    addSelected: (id) =>
      set((state) => {
        const selectedBeers = [...state.selectedBeers];
        selectedBeers.push(id);
        return {
          selectedBeers,
        };
      }),
    removeSelected: (id) =>
      set((state) => {
        let selectedBeers = [...state.selectedBeers];
        selectedBeers = selectedBeers.filter((beerId) => beerId !== id);
        return {
          selectedBeers,
        };
      }),
  };
});
