import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {

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
    this.user.allBlogs()
      .subscribe(res => {
        console.log(res)
        this.blogs = res[0]
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
