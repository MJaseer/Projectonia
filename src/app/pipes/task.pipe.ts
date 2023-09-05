import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'task',
    standalone: true
})

export class TaskPipe implements PipeTransform {

    transform(id?: string, data?: any[]) {

        const task = data?.find((_) => _?._id == id)
        const name = task?.title.toUpperCase()
        return name;

    }

}
