import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBlogger } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-item-nav',
  templateUrl: './item-nav.component.html',
  styleUrls: ['./item-nav.component.css']
})
export class ItemNavComponent {
  faBlogger = faBlogger
  isHidden = false

  constructor(private router: Router) { }
  

  color = ['', '', '']

  changeColor(num: number) {

    for (let count = 0; count < this.color.length; count++) {
      if (count !== num) {
        this.color[count] = ''
      } else {
        this.color[count] = 'blue'
      }
    }

    switch (num) {
      case 0:
        this.router.navigate(['/space/task'])
        break;
      case 1:
        this.router.navigate(['/space/board'])
        break;
      case 2:
        this.router.navigate(['/space/table'])
        break;
    }

  }

}
