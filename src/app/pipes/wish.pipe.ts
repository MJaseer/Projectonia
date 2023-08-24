import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wish',
  standalone:true
})
export class WishPipe implements PipeTransform {

  transform(value: Date) {
    const hour = value.getHours();

    if (hour >= 12 && hour <= 17) {
      return 'Good Afternoon';
    } else if (hour > 17 && hour <= 24) {
      return 'Good Evening';
    } else {
      return 'Good Morning';
    }
  }

}
