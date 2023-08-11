import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone:true
})
export class StatusPipe implements PipeTransform {

  transform(value?: string): string {
    switch (value) {
      case 'Blue':
        return 'INPROGRESS'
      case 'Red':
        return 'DUE'
      case 'Green':
        return 'DONE'
      case 'Orange':
        return 'ONDUE'
      default :
        return 'TODO'
    }
  }

}
