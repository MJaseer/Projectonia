import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Assignee, Project, Task } from "./space-store";


export const selectAssignee = createFeatureSelector<Assignee[]>('assignee')

export const selectAssigneeById = (assigneeId: string | null) =>
    createSelector(selectAssignee, (assigne: Assignee[]) => {
        let assigneeById = assigne.filter((_) => _._id == assigneeId);
        if (assigneeById.length == 0) {
            return null
        }
        return assigneeById[0]
    })

export const selectProject = createFeatureSelector<Project[]>('project')

export const selectProjectById = (projectId:string|null) => 
createSelector(selectProject,(project:Project[]) =>{
    let projectById = project.filter((_) => _._id == projectId)
    if(projectById.length == 0) {
        return null
    }
    return projectById[0]
})


export const selectTask = createFeatureSelector<Task[]>('Task')