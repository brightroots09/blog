import { Component, OnInit } from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Blog } from '../blog';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  
  blogModel = new Blog()
  message = {
    info: "",
    data: ""
  };

  public Editor = ClassicEditor;
  descriptionError: boolean = false;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.blogModel.description = "Enter Your Blog Here!"
    // ClassicEditor
    // .create( document.querySelector( '#description' ) )
    // .catch( error => {
    //     console.error( error );
    // } );
  }

  onFormSubmit(){
    if(this.blogModel.description == '' || this.blogModel.description == '<p>&nbsp;</p>' || this.blogModel.description == 'Enter Your Blog Here!' ){
      this.descriptionError = true
    }
    else{
      // console.log(this.blogModel)
      this.descriptionError = false
      this.user.addBlog(this.blogModel)
        .subscribe(res => {
          console.log(res)
          this.message.info = "Blog Insert!"
          this.message.data = res
        }, error => {
          console.error(error)
          this.message.info = "Unable to add Blog"
          this.message.data = "Try again later"
        })
    }
  }

  onClose(){
    this.message.info = "";
    this.message.data = ""
  }

  cancelUpdate(){
    this.router.navigate(["/blogs"])
  }

}
