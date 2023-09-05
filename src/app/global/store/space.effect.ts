import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SpaceService } from "../services/space.service";
import { Store, select } from "@ngrx/store";
import {
    addNewAssigneeAPISuccess, assigneFetchAPISuccess,
    blockManagerSuccess,
    createProjectSuccess,
    createTaskAPISuccess,
    deleteAssigneeAPISuccess, deleteProjectAPISuccess, deleteTaskAPISuccess, invokeAddAssigneAPI, invokeAssigneAPI,
    invokeBlockManager,
    invokeCreateProject,
    invokeCreateTaskAPI,
    invokeDeleteAssigneeAPI, invokeDeleteProjectAPI, invokeDeleteTaskAPI, invokeFetchTaskAPI, invokeManagerFecthAPI, invokeProjectAPI,
    invokeUpdateAssigneeAPI, invokeUpdateTaskAPI, managerFetchAPISuccess, projectFetchAPISuccess, taskFetchAPISuccess, updateAssigneeSuccess, updateTaskAPISuccess
} from "./space.action";
import { EMPTY, Observable, catchError, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { selectAssignee, selectManager, selectProject, selectTask } from "./space.selector";
import { Appstate } from "src/app/shared/store/app-state";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { AuthService } from "../../user/service/auth.service";
import { HelperService } from "src/app/admin/service/helper.service";


@Injectable()
export class ManagerEffects {

    constructor(
        private action$: Actions,
        private helperService: HelperService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }

    loadAllManager$ = createEffect(() =>
    this.action$.pipe(
        ofType(invokeManagerFecthAPI),
        withLatestFrom(this.store.pipe(select(selectManager))),
        mergeMap(([, managerStore]) => {
            if (managerStore.length > 0) {
                return EMPTY
            }
            return this.helperService
                .getUsers()
                .pipe(map((data) => managerFetchAPISuccess({ allManager: data })))
        })
    ))

    updateManager$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeBlockManager),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.helperService.blockUser(action.blockManager).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        );
                        return blockManagerSuccess({ blockManager: data })
                    }),
                    catchError((error) =>{
                        console.log(error);
                        return of(error)
                    })
                )
            })
        )
    })

}





@Injectable()
export class SpaceEffects {

    constructor(
        private action$: Actions,
        private spaceService: SpaceService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }


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
                    }),
                    catchError((error) =>{
                        console.log(error);
                        return of(error)
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
        private appStore: Store<Appstate>
    ) { }


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
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        )
                        return deleteProjectAPISuccess({ id: action.id })
                    })
                )
            })
        )
    })

}

@Injectable()
export class TaskEffects {

    constructor(
        private action$: Actions,
        private spaceService: SpaceService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }


    loadAllTask = createEffect(() =>
        this.action$.pipe(
            ofType(invokeFetchTaskAPI),
            withLatestFrom(this.store.pipe(select(selectTask))),
            mergeMap(([, taskStore]) => {
                if (taskStore.length > 0) {
                    return EMPTY
                }
                return this.spaceService
                    .getTask()
                    .pipe(map((data) => taskFetchAPISuccess({ allTask: data })))
            })
        )
    )

    createTask$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeCreateTaskAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                )
                return this.spaceService.createTask(action.newTask).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        )
                        return createTaskAPISuccess({ newTask: data })
                    })
                    //   ,takeUntil(this.action$.pipe(ofType(createTaskAPISuccess)))
                )
            })
        )
    })

    updateTask$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeUpdateTaskAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.spaceService.editTask(action.updateTask).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        );
                        return updateTaskAPISuccess({ updateTask: data })
                    })
                )
            })
        )
    })

    deleteTask$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeDeleteTaskAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                )
                return this.spaceService.deleteTask(action.id).pipe(
                    map(() => {
                        this.appStore.dispatch(
                            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
                        )
                        return deleteTaskAPISuccess({ id: action.id })
                    })
                )
            })
        )
    })

}