import { Component, OnInit } from '@angular/core';
import { SpaceService } from 'src/app/global/services/space.service';
import { i_manager } from 'src/app/global/user/i_manager';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 

  constructor(private spaceService: SpaceService) {}


  manager: i_manager = {
    _id:'',
    email:'',
    fname:'',
    image:''
  }
  hidden = true

  ngOnInit() {

    const managers = this.spaceService.getManager()
    managers.subscribe((value) =>{
      this.manager = value
      this.managerU()
    })

    

  }
  

 async imageFethcer(event:Event){
  const input = event.target as HTMLInputElement;
  if (input.files && input.files?.length! > 0) {
    const promise = this.readFielTobase64(input.files[0]);
    promise.then((base64String) => {      
      this.manager.image = base64String
      this.hi()
    });
  }
  
  }

  readFielTobase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  }
  
  hi(){
    console.log(this.manager.image)
    this.spaceService.getImage(this.manager).subscribe(
      (result) => {
        console.log(result);
        
      }
    )
  }

  managerU(){
    console.log(this.manager);

  }

  changeData(){
    this.hidden = !this.hidden
    console.log(this.manager);
    this.spaceService.updateManager(this.manager).subscribe(
      (result) => {
        this.manager = result
      }
    )
  }

}
