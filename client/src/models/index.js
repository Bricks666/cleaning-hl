import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer } from "./auth";
import { userReducer } from "./user";
import { carsReducer } from "./cars";
import { offersReducer } from "./offers";
import { workersReducer } from "./workers";
import { votesReducer } from "./votes";
import { usersReducer } from "./users";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	cars: carsReducer,
	offers: offersReducer,
	workers: workersReducer,
	votes: votesReducer,
	users: usersReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
