import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SpaceService } from "../services/space.service";
import { Store, select } from "@ngrx/store";
import {
    addNewAssigneeAPISuccess, assigneFetchAPISuccess,
    createProjectSuccess,
    deleteAssigneeAPISuccess, deleteProjectAPISuccess, invokeAddAssigneAPI, invokeAssigneAPI,
    invokeCreateProject,
    invokeDeleteAssigneeAPI, invokeDeleteProjectAPI, invokeProjectAPI,
    invokeUpdateAssigneeAPI, projectFetchAPISuccess, updateAssigneeSuccess
} from "./space.action";
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { selectAssignee, selectProject } from "./space.selector";
import { Appstate } from "src/app/shared/store/app-state";
import { setAPIStatus } from "src/app/shared/store/app.action";


@Injectable()
export class SpaceEffects {



    constructor(
        private action$: Actions,
        private spaceService: SpaceService,
        private store: Store,
        private appStore: Store<Appstate>) { }

    loadAllAssignee$ = createEffect(() =>
        this.action$.pipe(
            ofType(invokeAssigneAPI),
            withLatestFrom(this.store.pipe(select(selectAssignee))),
            mergeMap(([, assigneStore]) => {
                if (assigneStore.length > 0) {
                    return EMPTY
                }
                return this.spaceService
                    .getAssignee()
                    .pipe(map((data) => assigneFetchAPISuccess({ allAssignee: data })))
            })
        ))

    addNewAssignee$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeAddAssigneAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                )
                return this.spaceService.addAssignee(action.newAssignee)
                    .pipe(map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        )
                        return addNewAssigneeAPISuccess({ newAssignee: data })
                    }))
            })
        )
    })

    updateAssignee$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeUpdateAssigneeAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.spaceService.editAssignee(action.updateAssigne).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        );
                        return updateAssigneeSuccess({ updateAssigne: data })
                    })
                )
            })
        )
    })

    deleteAssignee$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeDeleteAssigneeAPI),
            switchMap((actions) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                )
                return this.spaceService.deleteAssignee(actions.id).pipe(
                    map(() => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        )
                        return deleteAssigneeAPISuccess({ id: actions.id })
                    })
                )
            })
        )
    })



}

@Injectable()
export class ProjectEffects {

    constructor(
        private action$: Actions,
        private spaceService: SpaceService,
        private store: Store,
        private appStore: Store<Appstate>) { }

    loadAllProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(invokeProjectAPI),
            withLatestFrom(this.store.pipe(select(selectProject))),
            mergeMap(([, projectStore]) => {
                if (projectStore?.length > 0) {
                    return EMPTY;
                }
                return this.spaceService
                    .getProject()
                    .pipe(map((data) => projectFetchAPISuccess({ allProjects: data })))
            })
        )
    )

    createProject$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeCreateProject),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                )
                return this.spaceService.newProject(action.newProject).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        )
                        return createProjectSuccess({ newProject: data })
                    })
                )
            })
        )
    })

    deleteProject$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeDeleteProjectAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                )
                return this.spaceService.deleteProject(action.id).pipe(
                    map(() => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                        )
                        return deleteProjectAPISuccess({ id: action.id })
                    })
                )
            })
        )
    })

}