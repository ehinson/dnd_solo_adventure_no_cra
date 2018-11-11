import player from './player';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


const dndApp = combineReducers({
    player,
    form: formReducer,
});

export default dndApp