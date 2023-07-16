import { createAction, props } from "@ngrx/store";
import { Assignee } from './space-store'
import { FormGroup } from "@angular/forms";

export class SpaceAction {
}

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