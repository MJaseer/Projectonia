import { createReducer, on } from "@ngrx/store";
import { Assignee } from "./space-store";
import { addNewAssigneeAPISuccess, assigneFetchAPISuccess, deleteAssigneeAPISuccess, updateAssigneeSuccess } from "./space.action";
import { state } from "@angular/animations";

export const initialState: ReadonlyArray<Assignee> = [];

export const assigneeReducer = createReducer(
    initialState,
    on(assigneFetchAPISuccess, (state, { allAssignee }) => {
        return allAssignee;
    }),
    on(addNewAssigneeAPISuccess, (state, { newAssignee }) => {
        let newStates = [...state]
        let newState = [...newStates]
        newState.unshift(newAssignee)
        return newState
    }),
    on(updateAssigneeSuccess, (state, { updateAssigne }) => {
        let newState = state.filter((_) => _._id != updateAssigne._id)
        newState.unshift(updateAssigne);
        return newState
    }),
    on(deleteAssigneeAPISuccess,(state,{id}) => {
        let newState = state.filter((_) => _._id != id)
        return newState
    })
)

