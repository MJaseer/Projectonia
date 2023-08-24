import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { json } from 'body-parser';
import { TaskService } from 'src/app/global/services/task.service';
import { invokeFetchTaskAPI, invokeProjectAPI } from 'src/app/global/store/space.action';
import { selectProject, selectTask } from 'src/app/global/store/space.selector';
import { Project } from '../Project/interface/project';
import { Task } from 'src/app/global/store/space-store';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})

export class AuthHomeComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private store: Store
  ) { }

  projects!: Project[];
  project: number = 0
  tasks: any
  task: number = 0

  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];


  date = Date.now()
  time = new Date()
  name: string = ''
  statusCounts: any = ''

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


  }

  updateChart(tasks: any) {


    const statusCounts = new Map<string, number>();
    if (this.tasks != undefined) {
      for (const item of this.tasks.values()) {
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

        dataPoints.push({ y: count, name: color, backgroundColor: status });
      }

      for (const item of this.tasks.values()) {
        statusCounts.set(item['priority'], (statusCounts.get(item['status']) || 0) + 1);
      }
      let priorityColor = ''
      let bgColors = []
      for (let [priority, count] of statusCounts.entries()) {

        switch (priority) {
          case 'Blue':
            priorityColor = 'NORMAL'
            break
          case 'Red':
            priorityColor = 'DUE'
            break
          case 'Orange':
            priorityColor = 'ONDUE'
            break
          default:
            priorityColor = 'TODO'
        }

        this.chartData.push(count);
        this.chartDatalabels.push(priorityColor);
        bgColors.push(priority)
      }

      this.ctx = document.getElementById('myChart');
      this.config = {
        type: 'pie',
        options: {
        },
        data: {
          labels: this.chartDatalabels,
          datasets: [{
            label: 'Chart Data',
            data: this.chartData,
            borderWidth: 5,
            borderColor: 'grey',
            backgroundColor: bgColors,
          }],
        },
        height: 400,
        width: 400
      }
      const myChart = new Chart(this.ctx, this.config);
      const chartOptions = {
        animationEnabled: true,
        title: {
          text: "Sales by Department"
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



  getProjects() {
    this.store.dispatch(invokeProjectAPI());
    this.store.pipe(select(selectProject)).subscribe(data => {
      if (data?.length > 0 && this.project == 0) {
        this.project++;
        this.projects = data;
        console.log(this.projects);
      }
    })

  }

}
