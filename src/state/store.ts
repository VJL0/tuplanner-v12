import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    //user: userReducer,
    //university: universityReducer,
    //degree: degreeReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Needed if working with async actions
