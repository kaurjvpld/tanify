import { createStore, combineReducers } from 'redux';
import systemReducer from './system/reducer';

const rootReducer = combineReducers({
    system: systemReducer,
});

const configureStore = () => createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore;
