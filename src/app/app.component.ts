import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import { NbSidebarService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog';

  items: NbMenuItem[] = [
    {
      title: "Profile",
      icon: "far fa-user",
      link: "/profile"
    },
    {
      title: "Blogs",
      icon: "fas fa-rss",
      link: "/blogs"
    },
    {
      title: "Add Blog",
      icon: 'fas fa-plus-circle',
      link: '/add-blogs'
    }
   ];

  constructor (private _authService: AuthService, private sidebarService: NbSidebarService ){ }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

}
