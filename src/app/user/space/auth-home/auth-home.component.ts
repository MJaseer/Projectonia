import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeAssigneAPI, invokeFetchTaskAPI, invokeProjectAPI } from 'src/app/global/store/space.action';
import { selectAssignee, selectProject, selectTask } from 'src/app/global/store/space.selector';
import { Project } from '../Project/interface/project';
import { Assignee, Task } from 'src/app/global/store/space-store';
import { TaskService } from 'src/app/global/services/task.service';
import { i_history } from 'src/app/global/user/i_history';
import { take } from 'rxjs';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})

export class AuthHomeComponent implements OnInit {

  constructor(
    private store: Store,
    private taskService: TaskService
  ) { }

  projects: Project[] = [{ title: '' }]
  project: number = 0
  tasks: any
  task: number = 0
  listTasks: any[] = []

  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  recents: i_history[] = [
    {
      content: '',
      createdAt: '',
      doneBy: '',
      tasks: ''
    }
  ]

  date = Date.now()
  time = new Date()
  name: string = ''
  statusCounts: any = ''
  status: any = ''
  projectPercentage = 0
  projectCount = 0
  projectComplted = 0

  taskPercentage = 0
  taskCount = 0
  taskComplted = 0

  assigneePercentage = 0
  assigneeCount = 0
  assigneeComplted = 0

  priorityData = [{ y: 0, name: '', color: '' }]
  statusData = [{ y: 0, name: '', color: '' }]

  assignees: Assignee[] = [
    {
      managerId: '',
      email: '',
      __v: 0,
      _id: '',
      fname: '',
      lname: '',
      password: '',
      phone: 0,
      place: '',
      post: '',
      skill: '',
      timeStamp: ''
    }
  ]

  ngOnInit(): void {

    const user: any = localStorage.getItem('data')
    const manager: any = JSON.parse(user)
    if (manager) {
      this.name = manager?.fname
    }

    this.store.dispatch(invokeFetchTaskAPI())
    this.store.pipe(select(selectTask)).subscribe((data) => {
      if (data?.length > 0 && this.task == 0) {
        this.task++;
        this.tasks = data;
        this.updateChart(data)
      }
    })

    this.getProjects()
    this.getAssignees()
    this.getRecent()
  }


  updateChart(tasks: any) {
    this.taskCount = tasks?.length
    if (tasks) {
      tasks.filter((data: any) => {
        if (data?.status == 'Orange') {
          if (data) {
            this.listTasks.push(data)
          }
        }
      })

      tasks?.forEach((values: any) => {
        if (values.status == 'Green') {
          this.taskComplted++
        }
      })
    }
    
    this.taskPercentage = (this.taskComplted/this.taskCount)*100

    const statusCounts = new Map<string, number>();
    const donoughtCounts = new Map<string, number>()
    if (this.tasks != undefined) {
      for (const item of this.tasks.values()) {
        statusCounts.set(item['status'], (statusCounts.get(item['status']) || 0) + 1);
      }
      const statusData = []
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
        statusData.push({ y: count, name: color, color: status })
        dataPoints.push({ y: count, name: color, color: status });
      }
      this.statusData = statusData

      for (const item of this.tasks.values()) {
        donoughtCounts.set(item['priority'], (donoughtCounts.get(item['priority']) || 0) + 1);
      }
      const priorityData = []
      const dougnutPoint = []
      let priorityColor = ''
      for (let [priority, count] of donoughtCounts.entries()) {
        switch (priority) {
          case 'Blue':
            priorityColor = 'NORMAL'
            priority = 'blue'
            break
          case 'Red':
            priorityColor = 'URGENT'
            priority = 'red'
            break
          case 'Orange':
            priorityColor = 'HIGH'
            priority = 'orange'
            break
          default:
            priorityColor = 'LOW'
            priority = 'gray'
            break;
        }

        priorityData.push({ y: count, name: priorityColor, color: priority })
        dougnutPoint.push({ y: count, name: priorityColor, color: priority })
      }

      this.priorityData = priorityData
      const chartOptions = {
        backgroundColor: "#3f3f46",
        animationEnabled: true,
        data: [{
          type: "pie",
          startAngle: -90,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: dataPoints
        }]
      }

      const doughnutChart = {
        backgroundColor: "#3f3f46",
        animationEnabled: true,
        data: [{
          type: "doughnut",
          startAngle: -90,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: dougnutPoint
        }]
      }
      this.statusCounts = chartOptions
      this.status = doughnutChart

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
        this.tasks?.forEach((element: any) => {
          if (item == element.status) {
            this.listTasks.push(element)
          }
          if (element.status == 'Blue' && item == 'Gray') {
            this.listTasks.push(element)
          }

        });
      }
    }
  }

  getProjects() {
    this.store.dispatch(invokeProjectAPI());
    this.store.pipe(select(selectProject)).subscribe(data => {
      if (data?.length > 0 && this.project == 0) {
        let cmpltProject = 0
        let taskCount = 0
        let tasks: Task[] = []
        this.project++;
        this.projects = data;
        data.forEach((value) => {
          this.projectCount++

          if (value.tasks?.length) {
            taskCount = value.tasks.length
            let completeCount = 0
            tasks = value.tasks
            
            if (tasks?.length) {
              tasks.forEach((element: any) => {
                if (element.status == 'Green') {
                  completeCount++
                }
              });
              
              if((completeCount/taskCount*100) == 100){
                cmpltProject++
              }
            }
          }
        })
        this.projectComplted = (cmpltProject/this.projectCount)* 100
      }      
    })

  }

  getAssignees() {
    let count = 0
    this.store.dispatch(invokeAssigneAPI())
    this.store.pipe(select(selectAssignee)).subscribe(data => {
      if (data?.length > 0 && count == 0) {
        count++
        this.assignees = data
        this.assigneeCount=data?.length
        data?.forEach((values: any) => {
          if (values.status) {
            this.assigneeComplted++
          }
        })
        this.assigneePercentage = (this.assigneeComplted/this.assigneeCount)*100
        console.log(this.assigneePercentage);
      }
    })
  }

  getRecent() {
    this.taskService.getRecent().subscribe(data => {
      this.recents = data
    })
  }

}
