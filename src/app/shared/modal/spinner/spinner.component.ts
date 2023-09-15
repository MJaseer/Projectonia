import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from 'src/app/global/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})

export class SpinnerComponent implements OnInit {

  constructor(private loader: LoaderService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<SpinnerComponent>,
  ) { }

  loading$ = this.loader.loading$
  ngOnInit() {
    this.loading$.subscribe(data => {
      if (data) {
        this.showSpinner()
      } else {
        this.hideSpinner()
      }
    })
  }

  showSpinner() {
    this.spinner.show()
    // Show the spinner here.
  }

  hideSpinner() {
    this.spinner.hide()
    this.dialogRef.close()
    // Hide the spinner here.
  }


}