import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new User()
  message;
  
  constructor(private _router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.user.register(this.userModel)
    .subscribe(
      res => {
        if(res == 'Email Already Exists'){
          this.message = res
        }
        else{
          this._router.navigate(["/login"])
        }
      },
        error => console.log(error)
      )
  }

  onClose(){
    this.message = null
  }

}
