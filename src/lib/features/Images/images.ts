
import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface galleryImages {
  images: string[]
}
const initialState: galleryImages = {
  images: []
}

export const imageSlice = createSlice({
  name: "GalleryImages",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload)
    }
  }
})
export const { addImage } = imageSlice.actions;
export const selectImages = (state: RootState) => state.images
export default imageSlice.reducer
