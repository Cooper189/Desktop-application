import article from './article';
import {combineReducers} from 'redux';
import login from './login';

const rootReducers = combineReducers({
    article,
    login
});
export default rootReducers