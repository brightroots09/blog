import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NbThemeModule, NbSidebarModule, NbLayoutModule,  NbMenuModule, NbMenuService, NbSidebarService, NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbUserModule, NbListModule, NbAlertModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BlogsComponent,
    BlogDetailsComponent,
    PageNotFoundComponent,
    AddBlogComponent,
    EditBlogComponent,
    AllBlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbTabsetModule,
    BrowserAnimationsModule,
    NbAccordionModule,
    NbButtonModule,
    NbUserModule,
    NbListModule,
    NbAlertModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, {provide: LocationStrategy, useClass: HashLocationStrategy}, NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
