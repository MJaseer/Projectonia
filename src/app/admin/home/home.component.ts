import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private adminService: AdminService,
    private helper:HelperService,
    private router: Router) { }

  users:any

  ngOnInit(): void {
    if (!this.adminService.isLoggedIn()) {
      this.router.navigate(['/admin/login'])
    }

    this.helper.getUsers().subscribe(
      (result) => {
        console.log(result)
        this.users = result
      }, (err: any) => {

        console.log(err, 'error');
        this.router.navigate(['/admin/login'])

      }
    )

  }

  

}
