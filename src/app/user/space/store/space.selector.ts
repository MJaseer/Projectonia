import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Assignee } from "./space-store";


export const selectAssignee = createFeatureSelector<Assignee[]>('assignee')

export const selectAssigneeById = (assigneeId:string|null) => 
createSelector(selectAssignee,(assigne:Assignee[]) => {
    let assigneeById = assigne.filter((_) => _._id == assigneeId);
    if(assigneeById.length == 0) {
        return null
    }
    return assigneeById[0]
})
