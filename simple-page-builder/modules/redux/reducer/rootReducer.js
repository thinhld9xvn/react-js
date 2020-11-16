import { combineReducers } from 'redux';
import { UIComponentsReducer } from './UIComponentsReducer';
import { SplitColumnsRowReducer } from './SplitColumnsRowReducer';

export const rootReducer = combineReducers({   
    UIComponentsReducer,
    SplitColumnsRowReducer   
});