import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Projectonia';
  ngOnInit(): void {
    initFlowbite();
  }
}



// addNewAssignee$ = createEffect(() => {
//   return this.action$.pipe(
//       ofType(invokeAddAssigneAPI),
//       switchMap((action) => {
//           this.appStore.dispatch(
//               setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
//           )
//           return this.spaceService.addAssignee(action.newAssignee)
//               .pipe(map((data) => {
//                   this.appStore.dispatch(
//                       setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
//                   )
//                   return addNewAssigneeAPISuccess({ newAssignee: data })
//               }))
//       })
//   )
// })