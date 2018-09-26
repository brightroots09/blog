import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Comment } from '../comment'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blogModel;
  userModel;
  commentModel;
  param;
  newComment = new Comment();
  filtersLoaded: Promise<boolean>;
  message;

  constructor(private _authService: AuthService, private router: Router, private user: UserService, private route: ActivatedRoute) {

    this.route.params.subscribe( params => {
      this.param = params 
    });


  }

  ngOnInit() {
    try {
      this.blogDetails()
      this.getProfile()
    } catch (error) {
      return error
    }
  }

  getProfile(){
    this.user.profile()
      .subscribe(res => {
        this.userModel = res._id
      })
  }

  blogDetails(){
    this.user.myBlogDetails(this.param.id)
      .subscribe(res => {
        this.blogModel = res[0];
        this.commentModel = res[1];
        this.filtersLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }



  onFormSubmit(){
    if(this.newComment.description == null || this.newComment.description == ''){
      this.message = "Cannot insert empty message"
    }
    else{
      this.user.insertComment(this.newComment, this.param.id)
        .subscribe(res => {
          window.location.reload()
        }, error => {
          console.error(error)
        })
    }
  }

  onClose(){
    this.message = null
  }

  deleteComment(id){
    this.user.deleteComment(id)
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }

}
