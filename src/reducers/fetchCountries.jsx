import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload || [];
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message || 'Error';
            });
    }
});

export const fetchCountries = createAsyncThunk('countries/fetch', async () => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,flag');
    if (!response.ok) {
        throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    return data;
});

export default countriesSlice.reducer;

