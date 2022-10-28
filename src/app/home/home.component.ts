import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../apis/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  details = {
    name: '',
    email: '',
  };
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUser().then(async (data: any) => {
      data = await data.json();
      this.details = {
        email: data.email,
        name: data.name,
      };
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
  ngOnInit(): void {}
}
