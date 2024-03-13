import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice/counterSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({ counters: counterSlice })

const persistConfig = {
    key: 'root-counters',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: null,
        }),
})

export const persistor = persistStore(store)
