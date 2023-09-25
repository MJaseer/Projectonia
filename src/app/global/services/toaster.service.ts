import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService{

  constructor(private toastr: ToastrService,
  ) { }

  success(item: string) {
    this.toastr.success('Success', `${item} has succesfully updated`, {
      timeOut: 1000,
    })
  }

  error(item:string){
    this.toastr.warning('Warning', `A problem in updating ${item}`, {
      timeOut: 3000
    })
  }

}
