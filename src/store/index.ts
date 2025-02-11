import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './slices';
import {reduxPersistStorage} from '@/storage';
import {persistReducer, persistStore} from 'redux-persist';

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
