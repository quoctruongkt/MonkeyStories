import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

import rootReducer from './slices';

import {reduxPersistStorage} from '@/storage';

const persistConfig = {
  key: 'root',
  storage: reduxPersistStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Khởi tạo persistor
const persistor = persistStore(store);

export {store, persistor};

// 🔹 Định nghĩa kiểu RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
