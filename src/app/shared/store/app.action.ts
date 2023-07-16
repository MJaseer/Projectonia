import { createAction, props } from "@ngrx/store";
import { Appstate } from "./app-state";


export const setAPIStatus = createAction(
    '[API] success or failure status',
    props<{ apiStatus: Appstate }>()
)