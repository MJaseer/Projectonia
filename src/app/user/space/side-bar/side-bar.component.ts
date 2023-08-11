import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }

  isHidden = false
  openDrawer() {
    this.isHidden = false
  }

  isDrawerHidden = false;
  windowWidth!: number

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth

    if (this.windowWidth < 640) {
      this.isHidden = true
    }
    if (this.windowWidth > 640) {
      this.isHidden = false
      this.refreshComponent()
    }
  }

  refreshComponent() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth
    this.onWindowResize()
  }




}
