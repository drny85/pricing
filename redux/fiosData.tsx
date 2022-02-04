import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

interface DataState {
    fiosAutoPay: 0 | 10;
    isFiosFirstResponder: boolean;
    hasWireless: boolean;
    wirelessDiscount: number;
    isUnlimited: boolean;
    wirelessWithin30Days: boolean;
    wirelessBonus: 0 | 15;
    fiosPrice: {
        fios200: number;
        fios400: number;
        fiosGig: number;
    };
}

const initialState: DataState = {
    fiosAutoPay: 10,
    isFiosFirstResponder: false,
    hasWireless: false,
    wirelessDiscount: 0,
    isUnlimited: true,
    wirelessWithin30Days: false,
    wirelessBonus: moment().isBefore(new Date('2021-03-31')) ? 0 : 15,
    fiosPrice: {
        fios200: 49.99,
        fios400: 74.99,
        fiosGig: 99.99,
    },
};

const fiosDataSlide = createSlice({
    name: 'fiosData',
    initialState,
    reducers: {
        setFiosAutoPay: (
            state,
            { payload }: PayloadAction<DataState['fiosAutoPay']>
        ) => {
            state.fiosAutoPay = payload;
        },
        setFiosFirstResponder: (state, { payload }: PayloadAction<boolean>) => {
            state.isFiosFirstResponder = payload;
        },
        setWirelessDiscount: (state, { payload }: PayloadAction<number>) => {
            state.wirelessDiscount = payload;
        },
        setHasWireless: (state, { payload }: PayloadAction<boolean>) => {
            state.hasWireless = payload;
        },
        setFiosPrices: (
            state,
            { payload }: PayloadAction<DataState['fiosPrice']>
        ) => {
            state.fiosPrice = payload;
        },
        setIsUnlimited: (state, { payload }: PayloadAction<boolean>) => {
            state.isUnlimited = payload;
        },
        setWirelessWithin30Days: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.wirelessWithin30Days = payload;
        },
        fiosReset: (state) => {
            return (state = initialState);
        },
    },
});

export const {
    setFiosAutoPay,
    setFiosFirstResponder,
    setHasWireless,
    setIsUnlimited,
    setFiosPrices,
    setWirelessDiscount,
    setWirelessWithin30Days,
    fiosReset,
} = fiosDataSlide.actions;
export default fiosDataSlide.reducer;
