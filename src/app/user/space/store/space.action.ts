import { createAction, props } from "@ngrx/store";
import { Assignee, Project } from './space-store'


export const invokeAssigneAPI = createAction(
    '[Assignee API] Invoke Assignee Fetch API'
)

export const assigneFetchAPISuccess = createAction(
    '[Assignee API] Invoke Assignee Fetch API Success',
    props<{ allAssignee: Assignee[] }>()
)

export const invokeAddAssigneAPI = createAction(
    '[Assigne API] Invoke add new assignee api',
    props<{ newAssignee: Assignee }>()
)

export const addNewAssigneeAPISuccess = createAction(
    '[Assignee API] add new assignee api success',
    props<{ newAssignee: Assignee }>()
)

export const invokeUpdateAssigneeAPI = createAction(
    '[Assignee API] invoke update assignee api',
    props<{ updateAssigne: Assignee }>()
)

export const updateAssigneeSuccess = createAction(
    '[Assignee API] update assignee api success',
    props<{ updateAssigne: Assignee }>()
)

export const invokeDeleteAssigneeAPI = createAction(
    '[Assignee API] invoke delete assignee API',
    props<{ id: string }>()
)

export const deleteAssigneeAPISuccess = createAction(
    '[Assignee API] delete assignee API success',
    props<{ id: string }>()
)

export const invokeProjectAPI = createAction(
    '[Project API] invoke project API'
)

export const projectFetchAPISuccess = createAction(
    '[Project API] invoke project API',
    props<{ allProjects: Project[] }>()
)

export const invokeCreateProject = createAction(
    '[Project API] invoke create project API',
    props<{ newProject: Project }>()
)

export const createProjectSuccess = createAction(
    '[Project API] create project API success',
    props<{ newProject: Project }>()
)

export const invokeDeleteProjectAPI = createAction(
    '[Project API] invoke project delete API',
    props<{ id:string}>()
)

export const deleteProjectAPISuccess = createAction(
    '[Project API] delete project API Success',
    props<{ id:string}>()
)