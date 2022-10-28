import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  details = {
    username: '',
    password: '',
  };
  constructor(private authService:AuthService,private router:Router) {}

  ngOnInit(): void {}
  changeName(val: any) {
    this.details.username = val.target.value;
  }
  changePass(val: any) {
    this.details.password = val.target.value;
  }
  login(){
    if (
      !this.details.password ||
      !this.details.username
    ) {
      alert('check all the fields');
      return;
    }
    this.authService.login(this.details).then(async(data)=>{
      data = await data.json();
      window.localStorage.setItem('tokens',JSON.stringify(data));
      alert("Success!");
      this.details = {
        username: '',
        password: '',
      };
      this.router.navigateByUrl('/home/dashboard')
    });
  }
}
