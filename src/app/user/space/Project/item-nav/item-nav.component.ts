import { Component } from '@angular/core';
import { faBlogger } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-item-nav',
  templateUrl: './item-nav.component.html',
  styleUrls: ['./item-nav.component.css']
})
export class ItemNavComponent {
  faBlogger = faBlogger 

}
