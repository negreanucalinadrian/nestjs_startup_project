import { SetState, GetState } from 'zustand';
import { AppState } from '@/store/index';

export interface ApplicationState {
    isOktaLoading: boolean;
    setIsOktaLoadingUser: (isOpened: boolean) => void;
}

export default (set: SetState<AppState>, get: GetState<AppState>): ApplicationState => ({
    isOktaLoading:true,
    setIsOktaLoadingUser: (isLoading: boolean) => {
        set({ isOktaLoading: isLoading });
    },
});
