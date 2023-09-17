import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GeoPosition, MapState, MarkerIconProps } from '../libs/types';
import { defaultPosition } from '../libs/constants';
import { PositionType } from '../libs/enums';

const useMapStore = create<MapState>()(
    persist(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (set, _get) => ({
            flyToPositionType: PositionType.default,
            position: {
                lat: defaultPosition.lat,
                lon: defaultPosition.lon,
            },
            markerIconProps: { imagePath: './restaurant.svg', backgroundColor: 'bg-orange-300' },
            setPosition: (position: GeoPosition) => set({ position: position }),
            setFlyToPositionType: (flyToType: PositionType) => set({ flyToPositionType: flyToType }),
            setMarkerIconProps: (iconProps: MarkerIconProps) => set({ markerIconProps: iconProps }),
        }),

        {
            name: 'map-state-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useMapStore;
