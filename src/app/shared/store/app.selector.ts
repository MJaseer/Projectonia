import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./app-state";


export const selectAppState = createFeatureSelector<Appstate>('appState')