import { createSlice } from '@reduxjs/toolkit';

interface DataState {
    wirelessAutoPay: boolean;
}
const initialState: DataState = {
    wirelessAutoPay: true,
};
const wirelessSlide = createSlice({
    name: 'wireless',
    initialState,
    reducers: {},
});

export default wirelessSlide.reducer;
