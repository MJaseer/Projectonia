import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { HelperService } from '../service/helper.service';
import { map, tap } from 'rxjs';
import { Project, Task } from 'src/app/global/store/space-store';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private adminService: AdminService,
    private helper: HelperService,
    private router: Router) { }

  users: any
  date = Date.now()
  time = new Date()
  name: string = ''

  dateOption: any = ''

  graphTime = new Date('1/1/2020')

  statusCounts: any = ''
  listTasks: any[] = []
  managers: any;
  tasks: Task[] = [{ title: '' }]

  updatedData = [{ y: 0, x: new Date() }]
  userData = [{ y: 0, name: '', color: '' }]
  taskData = [{ y: 0, x: new Date() }]

  ngOnInit(): void {
    const user: any = localStorage.getItem('admin')
    const manager: any = JSON.parse(user)
    if (manager) {
      this.name = manager?.fname
    }
    if (!this.adminService.isLoggedIn()) {
      this.router.navigate(['/admin/login'])
    }

    this.fetchUsers()
    this.getTasks()
  }
  graphData = [{ title: '', count: 0, status: false }]
  getTasks() {
    this.helper.getTasks().subscribe(
      (result) => {
        this.tasks = result
        this.fetchProjectData(result)
      }
    )
  }

  fetchProjectData(tasks: Task[]) {

    const dateCounts = new Map<Date, number>();
    const updateCounts = new Map<Date, number>();
    if (tasks != undefined) {
      for (const item of tasks.values()) {
        if (item.createdAt) {
          const date = new Date(item.createdAt)
          dateCounts.set(date, (dateCounts.get(date) || 0) + 1);
        }
      }

    }

    const dateData = []
    for (let [month, count] of dateCounts.entries()) {
      dateData.push({ y: count, x: month })
    }

    const consolidatedData: Record<number, { y: number, x: number | any }> = {};
    dateData.forEach(obj => {
      const month = obj.x.getMonth();
      if (consolidatedData[month]) {
        consolidatedData[month].y += obj.y;
      } else {
        consolidatedData[month] = { y: obj.y, x: month };
      }
    });
    const consolidatedArray = Object.values(consolidatedData);

    consolidatedArray.forEach(obj => {
      if (obj.x >= 1 && obj.x <= 12) {
        const now = new Date();
        now.setMonth(obj.x);
        obj.x = now
      } else {
        obj.x = "Invalid Month";
      }
    });

    const months = [...new Set(dateData.map(obj => obj.x.getMonth()))];
    const allMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const missingMonths = allMonths.filter(month => !months.includes(month));
    const missingMonthObjects = missingMonths.map(month => {
      const now = new Date();
      now.setMonth(month);
      return ({
        y: 0,
        x: now
      })
    });

    const resultArray = [...consolidatedArray, ...missingMonthObjects];
    resultArray.sort((a, b) => a.x - b.x)
    this.taskData = resultArray
    if (tasks != undefined) {
      for (const item of tasks.values()) {
        if (item.updatedAt) {
          const date = new Date(item.updatedAt)
          updateCounts.set(date, (updateCounts.get(date) || 0) + 1);
        }
      }
    }
    console.log(resultArray);
    
    const updatedCout = []
    for (let [month, count] of updateCounts.entries()) {
      updatedCout.push({ y: count, x: month })
    }

    const updatedConsolidatedData: Record<number, { y: number, x: number | any }> = {};
    updatedCout.forEach(obj => {
      const month = obj.x.getMonth();
      if (updatedConsolidatedData[month]) {
        updatedConsolidatedData[month].y += obj.y;
      } else {
        updatedConsolidatedData[month] = { y: obj.y, x: month };
      }
    });
    const updatedConsolidatedArray = Object.values(updatedConsolidatedData);

    updatedConsolidatedArray.forEach(obj => {
      if (obj.x >= 1 && obj.x <= 12) {
        const now = new Date();
        now.setMonth(obj.x);
        obj.x = now
      } else {
        obj.x = "Invalid Month";
      }
    });

    const updatedMonths = [...new Set(updatedCout.map(obj => obj.x.getMonth()))];

    const allUpdatedMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const missingUpdatedMonths = allUpdatedMonths.filter(month => !updatedMonths.includes(month));
    const missingUpdatedMonthObjects = missingUpdatedMonths.map(month => {
      const now = new Date();
      now.setMonth(month);
      return ({
        y: 0,
        x: now
      })
    });

    const updateArray = [...updatedConsolidatedArray, ...missingUpdatedMonthObjects];
    updateArray.sort((a, b) => a.x - b.x)
    this.updatedData = updateArray

    let chartOptions = {
      animationEnabled: true,
      axisY: {
        title: "Number of Tasks"
      },
      data: [{
        type: "area",
        name: "Created",
        showInLegend: true,
        legendMarkerType: "square",
        color: "rgba(40,175,101,0.6)",
        markerSize: 0,
        dataPoints: resultArray
      }, {
        type: "area",
        name: "Update At",
        showInLegend: true,
        legendMarkerType: "square",
        color: "rgba(0,75,141,0.7)",
        markerSize: 0,
        dataPoints: updateArray
      }]
    }
    console.log(chartOptions);
    
    this.dateOption = chartOptions
  }
  
  fetchUsers() {

    this.helper.getUsers().subscribe(
      (result) => {
        this.users = result
        this.updateChart(this.users)

      }, (err: any) => {

        console.log(err, 'error');
        this.router.navigate(['/admin/login'])

      }
    )
  }



  updateChart(tasks: any) {

    if (tasks) {
      tasks.filter((data: any) => {
        if (data?.status == 'UnBlock') {
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
          case 'Block':
            color = 'Red'
            break
          case 'UnBlock':
            color = 'Green'
            break
        }
        this.userData.push({ y: count, name: status, color: color })
        dataPoints.push({ y: count, name: status, color: color });
      }

      const chartOptions = {
        animationEnabled: true,
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

  taskButton = ['blue', '']
  changeTask(num: number, item: string) {
    this.taskButton[num] = 'blue'
    for (let i = 0; i < this.taskButton.length; i++) {
      if (i !== num) {
        this.taskButton[i] = ''
      } else {
        this.taskButton[num] = 'blue'

        this.listTasks = []
        this.users?.forEach((element: any) => {

          if (item == element.status) {
            this.listTasks.push(element)
          }

        });
      }
    }
  }

}
