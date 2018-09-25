import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  filtersLoaded: Promise<boolean>;
  blogs;
  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    try {
      this.getBlogs();

    } catch (error) {
      return error
    }
  }

  getBlogs(){
    this.user.myBlogs()
      .subscribe(res => {
        console.log(res)
        this.blogs = res
        this.filtersLoaded = Promise.resolve(true)
      }, error => {
        console.error(error);
      })
  }

  edit(id){
    this.router.navigate([`/edit_blog/${id}`])
  }

  delete(id){
    this.user.deleteBlog(id)
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }

}
