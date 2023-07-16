import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SpaceService } from "../services/space.service";
import { Store, select } from "@ngrx/store";
import { addNewAssigneeAPISuccess, assigneFetchAPISuccess, invokeAddAssigneAPI, invokeAssigneAPI, invokeUpdateAssigneeAPI, updateAssigneeSuccess } from "./space.action";
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { selectAssignee } from "./space.selector";
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

}