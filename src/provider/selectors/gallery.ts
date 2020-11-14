import { AppState } from "provider/reducer";
import { createSelector } from "reselect";

export const getGalleryState = (state: AppState) => state.gallery;

export const getGalleryImagesSelector = createSelector(
  getGalleryState,
  (gallery) => gallery.images
);

export const getGalleryImagesTotalNumberSelector = createSelector(
  getGalleryState,
  (gallery) => gallery.total
);
