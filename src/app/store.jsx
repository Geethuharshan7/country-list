import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../reducers/fetchCountries'

export const store = configureStore({
  reducer: {
    countries: countriesReducer
  }
})