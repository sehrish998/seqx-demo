import {configureStore} from '@reduxjs/toolkit';
import {
  colorSelectedReducer,
  userReducer,
} from './userSlice';

const store = configureStore({
  reducer: {
    selectedColor: colorSelectedReducer,
    user: userReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export {store};
