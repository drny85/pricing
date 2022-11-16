import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

interface DataState {
    expressAutoPay: 0 | 10;
    expressFirstResponder: boolean;
    expressHasFios: boolean;
    expressBonus: number;
    expressWhithin30Days: boolean;
    expressInternet: '200' | '400' | 'gig' | undefined;
    BYOD: boolean;
}
const initialState: DataState = {
    expressAutoPay: 10,
    expressFirstResponder: false,
    expressHasFios: false,
    expressWhithin30Days: true,
    expressBonus: moment().isBefore(moment('2022-02-28').endOf('day')) ? 20 : 0,
    expressInternet: undefined,
    BYOD: false,
};
const wirelessSlide = createSlice({
    name: 'wireless',
    initialState,
    reducers: {
        setExpressAutoPay: (
            state,
            { payload }: PayloadAction<DataState['expressAutoPay']>
        ) => {
            state.expressAutoPay = payload;
        },
        setExpressFirstResponder: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.expressFirstResponder = payload;
        },
        setExpressHasFios: (state, { payload }: PayloadAction<boolean>) => {
            state.expressHasFios = payload;
        },

        setExpressInternet: (
            state,
            { payload }: PayloadAction<DataState['expressInternet']>
        ) => {
            state.expressInternet = payload;
        },
        setExpressWithin30Days: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.expressWhithin30Days = payload;
        },
        setExpressReset: (state) => {
            return (state = initialState);
        },
        toogleBYOD: (state) => {
            state.BYOD = !state.BYOD;
        },
    },
});

export const {
    setExpressFirstResponder,
    setExpressAutoPay,
    setExpressHasFios,
    setExpressInternet,
    setExpressWithin30Days,
    setExpressReset,
    toogleBYOD,
} = wirelessSlide.actions;

export default wirelessSlide.reducer;
