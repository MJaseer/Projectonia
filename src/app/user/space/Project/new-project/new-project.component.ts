import { Component } from '@angular/core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {

  project!:string;

  create(){
    if(this.project){
      console.log(this.project);
    }else{
      
    }
    
  }

}
