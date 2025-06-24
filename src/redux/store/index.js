import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlices'
import userSlice from '../slices/userSlice'

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth slice
  blacklist: [], // Don't persist these slices
}

// User slice persist config (separate config for user data)
const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['preferences', 'settings'], // Only persist specific user data
}

// Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice,
  user: persistReducer(userPersistConfig, userSlice)
})

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER'
        ],
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates']
      },
      thunk: {
        extraArgument: {
          // You can add extra services here if needed
          // api: apiService,
        }
      }
    }),
  devTools: import.meta.env.MODE !== 'production', // Enable Redux DevTools in development
})

// Create Persistor
export const persistor = persistStore(store)

// Export types for TypeScript (if you migrate to TS later)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// Helper function to get current state
export const getStoreState = () => store.getState()

// Helper function to dispatch actions
export const dispatchAction = (action) => store.dispatch(action)