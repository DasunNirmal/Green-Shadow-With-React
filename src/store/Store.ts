import {configureStore} from "@reduxjs/toolkit";
import FieldsSlice from "../reducers/FieldsSlice.ts";
import CropsSlice from "../reducers/CropsSlice.ts";
import StaffsSlice from "../reducers/StaffsSlice.ts";
import VehicleSlice from "../reducers/VehicleSlice.ts";
import EquipmentSlice from "../reducers/EquipmentSlice.ts";
import FieldLogsSlice from "../reducers/FieldLogsSlice.ts";

export const store = configureStore({
   reducer: {
       fields: FieldsSlice,
       crops: CropsSlice,
       staffs: StaffsSlice,
       vehicles: VehicleSlice,
       equipments: EquipmentSlice,
       fieldLogs: FieldLogsSlice
   }
});

export type AppDispatch = typeof store.dispatch;