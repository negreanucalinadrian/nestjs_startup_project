import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import appStore, { ApplicationState } from '@/store/appStore';

export type AppState = ApplicationState;

export const useStore = create(
    devtools((set: any, get: any) => ({
        ...appStore(set, get),
    })),
);
