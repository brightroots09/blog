import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _registerUrl = "/register";
  private _profileUrl = "/profile";
  private _myBlogsUrl = "myBlogs";
  private _blogsUrl = "/blogs";
  private _blogUrl = "/blog";
  private _editBlogUrl = "/edit_blog";
  private _deleteBlogUrl = "/delete_blog"
  private _commentsUrl = "/comments";
  private _deleteCommentsUrl = "/delete_comment";

  constructor(private http: HttpClient) { }

  register(data): Observable<any>{
    return this.http.post<any>(this._registerUrl, data)
  }

  profile(): Observable<any>{
    return this.http.get<any>(this._profileUrl)
  } 

  allBlogs(): Observable<any>{
    return this.http.get<any>(this._blogsUrl)
  }

  myBlogs(): Observable<any>{
    return this.http.get<any>(this._myBlogsUrl)
  }

  myBlogDetails(id): Observable<any>{
    let url = this._blogUrl + "/" + id
    return this.http.get<any>(url)
  }

  editBlog(id, data): Observable<any>{
    let url = this._editBlogUrl + "/" + id
    return this.http.post<any>(url, data)
  }

  deleteBlog(id): Observable<any>{
    let url = this._deleteBlogUrl + "/" + id;
    return this.http.post<any>(url, id)
  }

  insertComment(data, id): Observable<any>{
    let url = this._commentsUrl + "/" + id
    return this.http.post<any>(url, data)
  }

  addBlog(data): Observable<any>{
    return this.http.post<any>(this._blogsUrl, data)
  }

  deleteComment(id): Observable<any>{
    let url = this._deleteCommentsUrl + "/" + id
    return this.http.post<any>(url, id)
  }

}
