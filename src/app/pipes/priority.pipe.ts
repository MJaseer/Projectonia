import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority',
  standalone:true
})
export class PriorityPipe implements PipeTransform {

  
  transform(value?: string): string {
    switch (value) {
      case 'Blue':
        return 'Normal'
      case 'Red':
        return 'Urgent'
      case 'Orange':
        return 'High'
      default :
        return 'TODO'
    }
  }

}
