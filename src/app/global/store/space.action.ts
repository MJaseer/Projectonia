import { createAction, props } from "@ngrx/store";
import { Assignee, Manager, Project, Task } from './space-store'

export const invokeManagerFecthAPI = createAction(
    '[Manager API] Invoke manager API' 
)

export const managerFetchAPISuccess = createAction(
    '[Manager API] Invoke Manager API Success',
    props<{allManager:Manager[]}>()
)

export const invokeBlockManager = createAction(
    '[Manager API] Invoke block Manager API',
    props<{blockManager:Manager}>()
)

export const blockManagerSuccess = createAction(
    '[Manager API] block Manager API success',
    props<{blockManager:Manager}>()
)




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
    props<{ id: string }>()
)

export const deleteProjectAPISuccess = createAction(
    '[Project API] delete project API Success',
    props<{ id: string }>()
)

export const invokeUpdateProjectAPI = createAction(
    '[Project API] invoke project update API',
    props<{ updateProject: Project[] }>()
)

export const updateProjectAPISuccess = createAction(
    '[Project API] invoke project update API',
    props<{ updateProject: Project[] }>()
)




export const invokeFetchTaskAPI = createAction(
    '[Task API] invoke task API'
)

export const taskFetchAPISuccess = createAction(
    '[Task API] fetch task API Success',
    props<{ allTask: Task[] }>()
)

export const invokeCreateTaskAPI = createAction(
    '[Project API] invoke task create API',
    props<{ newTask: Task }>()
)

export const createTaskAPISuccess = createAction(
    '[Project API]  create task API Success',
    props<{ newTask: Task }>()
)

export const invokeUpdateTaskAPI = createAction(
    '[Task API] invoke update task',
    props<{ updateTask: Task }>()
)

export const updateTaskAPISuccess = createAction(
    '[Task API] update task API success',
    props<{ updateTask: Task }>()
)

export const invokeDeleteTaskAPI = createAction(
    '[Task API] invoke delete task',
    props<{ id: string }>()
)

export const deleteTaskAPISuccess = createAction(
    '[Task API] delete task API success',
    props<{ id: string }>()
)