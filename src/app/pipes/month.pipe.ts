import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthAndDate',
  standalone: true
})

export class MonthAndDatePipe implements PipeTransform {

  transform(value?: string): string {
    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (value) {
      const data = new Date(value)
      const month = data.getMonth() + 1;
      const date = data.getDate();

      const monthName = shortMonthNames[month-1]
      return `${date}-${monthName}`;
    }
    else {
      return ''
    }
  }

}
