import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GeoPosition, MapState } from '../libs/types';
import { defaultPosition } from '../libs/constants';

const useMapStore = create<MapState>()(
    persist(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (set, _get) => ({
            position: {
                lat: defaultPosition.lat,
                lon: defaultPosition.lon,
            },
            setPosition: (position: GeoPosition) => set({ position: position }),
        }),

        {
            name: 'map-state-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useMapStore;
