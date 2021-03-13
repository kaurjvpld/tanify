import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({});

const configureStore = () => createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore;
