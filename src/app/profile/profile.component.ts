import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  filtersLoaded: Promise<boolean>;
  blogsLoaded: Promise<boolean>;

  userModel;
  blogs;

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    try {
      this.getProfile();
      this.getMyBlogs();

    } catch (error) {
        return error
    }
  }

  getProfile(){
    this.user.profile()
      .subscribe(res => {
        this.userModel = res
        this.filtersLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

  getMyBlogs(){
    this.user.myBlogs()
      .subscribe(res => {
        this.blogs = res
        this.blogsLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

}
