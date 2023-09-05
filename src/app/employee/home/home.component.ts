import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';
import { invokeFetchTaskAPI } from 'src/app/global/store/space.action';
import { selectTask } from 'src/app/global/store/space.selector';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/global/store/space-store';

@Component({
  selector: 'app-employee-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private store: Store,
    private router: Router
  ) { }

  employeeId: any
  projects!: any[]
  tasks!: any[]
  tasks$!: Observable<Task[]>;
  assignedTask!: Task[];

  project: number = 0
  task: number = 0
  listTasks: any[] = []
  statusCounts: any = ''

  availableProject: any[] = []

  date = Date.now()
  time = new Date()
  name: string = ''

  ngOnInit(): void {
    const user: any = localStorage.getItem('employee')
    const manager: any = JSON.parse(user)
    if (manager) {
      this.name = manager?.fname
    }

    if (!this.employeeService.isLoggedIn()) {
      this.router.navigate(['/admin/login'])
    }
    this.store.dispatch(invokeFetchTaskAPI());
    this.fetchTask()
  }

  fetchTask() {
    let task = 0
    this.tasks$ = this.store.pipe(select(selectTask))
    this.tasks$.subscribe(data => {
      this.tasks = data
      if (data.length > 0 && task == 0) {
        task++;
        this.tasks = data;
        this.fetchAssignable(data)
      }
    })
  }

  fetchAssignable(data: Task[]) {
    this.employeeId = this.employeeService.getToken()
    this.assignedTask = data.filter((_) => _.assigneeId == this.employeeId._id)
    
    this.updateChart(this.assignedTask)
  }
  

  updateChart(tasks: any) {
    
    if(tasks) {
      tasks.filter((data: any) => {
        if (data?.status == 'Orange') {
          if (data) {
            this.listTasks.push(data)
          }
        }
      })
    }


    const statusCounts = new Map<string, number>();
    if (tasks != undefined) {
      for (const item of tasks.values()) {
        statusCounts.set(item['status'], (statusCounts.get(item['status']) || 0) + 1);
      }
      const dataPoints = [];
      let color = ''
      for (let [status, count] of statusCounts.entries()) {

        switch (status) {
          case 'Blue':
            color = 'INPROGRESS'
            break
          case 'Red':
            color = 'DUE'
            break
          case 'Green':
            color = 'DONE'
            break
          case 'Orange':
            color = 'ONDUE'
            break
          default:
            color = 'TODO'
        }

        dataPoints.push({ y: count, name: color, color: status });
      }
      const chartOptions = {
        animationEnabled: true,
        title: {
          text: "Tasks by Status"
        },
        data: [{
          type: "pie",
          startAngle: -90,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: dataPoints
        }]
      }
      this.statusCounts = chartOptions

    }

  }

  taskButton = ['blue', '', '', '']
  changeTask(num: number, item: string) {
    this.taskButton[num] = 'blue'
    for (let i = 0; i < this.taskButton.length; i++) {
      if (i !== num) {
        this.taskButton[i] = ''
      } else {
        this.taskButton[num] = 'blue'

        this.listTasks = []
        this.assignedTask?.forEach((element: any) => {
          if (item == element.status) {
            this.listTasks.push(element)
          } 
          if(element.status == 'Blue' && item == 'Gray'){
            this.listTasks.push(element)
          }
   
        });
      }
    }
  }
}
