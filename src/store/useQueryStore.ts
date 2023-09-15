import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Category, CategoryKey } from '../libs/enums';
import { MapCategoryState } from '../libs/types';

const useQueryStore = create<MapCategoryState>()(
    persist(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (set, _get) => ({
            categoryKey: CategoryKey.amenity,
            category: Category.restaurant,
            setCategoryKey: (key: CategoryKey) => set({ categoryKey: key }),
            setCategory: (category: Category) => set({ category: category }),
        }),

        {
            name: 'query-state-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useQueryStore;
