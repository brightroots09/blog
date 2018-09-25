import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blogModel;
  param;
  filtersLoaded: Promise<boolean>;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {

    this.route.params.subscribe( params => {
      this.param = params 
    });


  }

  ngOnInit() {
    try {
      this.blogDetails()
    } catch (error) {
      return error
    }
  }

  blogDetails(){
    this.user.myBlogDetails(this.param.id)
      .subscribe(res => {
        this.blogModel = res[0];
        this.filtersLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

  onFormSubmit(){
    this.user.editBlog(this.param.id, this.blogModel)
      .subscribe(res => {
        this.router.navigate([`/blog/${this.param.id}`])
      })
  }

  cancelUpdate(){
    this.router.navigate(["/my-blogs"])
  }

}
