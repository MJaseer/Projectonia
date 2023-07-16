import { createReducer, on, select } from "@ngrx/store";
import { Appstate } from "./app-state";
import { setAPIStatus } from "./app.action";



export const initialState: Readonly<Appstate> = {
    apiResponseMessage: '',
    apiStatus: ''
}

export const appReducer = createReducer(
    initialState,
    on(setAPIStatus, (state, { apiStatus }) => {
        return {
            ...state,
            ...apiStatus
        }
    })
)
