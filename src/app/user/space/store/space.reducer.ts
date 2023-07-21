import { createReducer, on } from "@ngrx/store";
import { Assignee, Project } from "./space-store";
import {
    addNewAssigneeAPISuccess, assigneFetchAPISuccess,
    createProjectSuccess,
    deleteAssigneeAPISuccess, deleteProjectAPISuccess, projectFetchAPISuccess, updateAssigneeSuccess
} from "./space.action";

export const initialStateAssignee: ReadonlyArray<Assignee> = [];

export const assigneeReducer = createReducer(
    initialStateAssignee,
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
    on(deleteAssigneeAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _._id != id)
        return newState
    }),
)

export const initialStateProject: ReadonlyArray<Project> = []

export const projectReducer = createReducer(
    initialStateProject,
    on(projectFetchAPISuccess, (state, { allProjects }) => {
      return allProjects;
    }),
    on(createProjectSuccess, (state, { newProject }) => {
        let newStates = [...state]
        newStates.unshift(newProject)
        return newStates
    }),
    on(deleteProjectAPISuccess,(state,{id}) => {
        let newState = state.filter((_) => _._id != id);
        return newState
    })
)

