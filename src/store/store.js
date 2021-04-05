
import {applyMiddleware, createStore} from 'redux';
import reduser from './reduser';
import logger from 'redux-logger';
import thunk from "redux-thunk";
const middleware=applyMiddleware(thunk,logger);

export const store=createStore(reduser,middleware);
