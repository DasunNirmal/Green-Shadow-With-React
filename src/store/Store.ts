import {configureStore} from "@reduxjs/toolkit";
import FieldsSlice from "../reducers/FieldsSlice.ts";

export const store = configureStore({
   reducer: {
       fields: FieldsSlice
   }
});

export type AppDispatch = typeof store.dispatch;