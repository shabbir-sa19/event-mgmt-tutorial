import { configureStore } from '@reduxjs/toolkit'
import { imageSlice } from './features/Images/images';
import { counterSlice } from './features/counter/counter';
export const makeStore = () => {

  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      images: imageSlice.reducer
    }
  })
}
// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]