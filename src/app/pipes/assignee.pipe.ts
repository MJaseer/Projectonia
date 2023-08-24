import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assignee',
  standalone: true
})

export class AssigneePipe implements PipeTransform {

  transform(id?: string, data?:any[]) {
    
    const assigne = data?.find((_) => _?._id == id )
    const name = assigne?.fname.toUpperCase()
    if(name){
      return name;
    } else {
      return 'Manager'
    }
  }

}
