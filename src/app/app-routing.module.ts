import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/blogs",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "blog/:id",
    component: BlogDetailsComponent
  },
  {
    path: "my-blogs",
    component: BlogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "blogs",
    component: AllBlogsComponent
  },
  {
    path: "add-blogs",
    component: AddBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit_blog/:id",
    component: EditBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
