import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpaceService } from 'src/app/global/services/space.service';
import { ToasterService } from 'src/app/global/services/toaster.service';
import { i_manager } from 'src/app/global/user/i_manager';
import { environment } from 'src/environments/environment';

const URL = `${environment.backendPort}/api`;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  constructor(private spaceService: SpaceService,
    private toastr: ToasterService) { }


  manager: i_manager = {
    _id: '',
    email: '',
    fname: '',
    image: ''
  }
  hidden = true

  ngOnInit() {

    const managers = this.spaceService.getManager()
    managers.subscribe((value) => {
      this.manager = value
      // this.managerU()
    })



  }


  async imageFethcer(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files?.length! > 0) {
      const promise = this.readFielTobase64(input.files[0]);
      promise.then((base64String) => {
        this.manager.image = base64String
        this.postImage()
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

  postImage() {
    this.spaceService.postImage(this.manager).subscribe(
      (result) => {
        console.log(result);

      }, (err) => {
        console.log(err);
        
        this.toastr.error(`Image size should be less than 100kb,${err.statusText}`)
        this.ngOnInit()
      }
    )
  }

  managerU() {
    console.log(this.manager);

  }

  changeData() {
    this.hidden = !this.hidden
    this.spaceService.updateManager(this.manager).subscribe(
      (result) => {
        this.manager.fname = result.fname
      }
    )
  }

}
