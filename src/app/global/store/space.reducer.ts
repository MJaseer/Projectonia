import { createReducer, on } from "@ngrx/store";
import { Assignee, Manager, Project, Task } from "./space-store";
import {
    addNewAssigneeAPISuccess, assigneFetchAPISuccess,
    blockManagerSuccess,
    createProjectSuccess,
    createTaskAPISuccess,
    deleteAssigneeAPISuccess, deleteProjectAPISuccess, deleteTaskAPISuccess, managerFetchAPISuccess, projectFetchAPISuccess, taskFetchAPISuccess, updateAssigneeSuccess, updateTaskAPISuccess
} from "./space.action";

export const initialStateManager: ReadonlyArray<Manager> = []

export const managerReducer = createReducer(
    initialStateManager,
    on(managerFetchAPISuccess, (state, { allManager }) => {
        return allManager;
    }),
    on(blockManagerSuccess,(state, {blockManager}) => {
        let newState = state.filter((_) => _._id != blockManager._id)
        newState.unshift(blockManager);
        return newState
    })
)


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
    on(deleteProjectAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _._id != id);
        return newState
    })
)


export const initialStateTask: ReadonlyArray<Task> = []

export const taskReducer = createReducer(
    initialStateTask,
    on(taskFetchAPISuccess, (state, { allTask }) => {
        return allTask
    }),
    on(createTaskAPISuccess, (state, { newTask }) => {
        let newStates = [...state]
        newStates.unshift(newTask)
        return newStates
    }),
    on(updateTaskAPISuccess, (state, { updateTask }) => {
        let newState = state.filter((_) => _._id != updateTask._id)
        newState.unshift(updateTask);
        return newState
    }),
    on(deleteTaskAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _._id != id)
        return newState
    }),
)
