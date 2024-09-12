import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
	reducer: {
		contacts: persistedContactsReducer,
		filters: filtersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});
const persistor = persistStore(store);

export { persistor, store };
