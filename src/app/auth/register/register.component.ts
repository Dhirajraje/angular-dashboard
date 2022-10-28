import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  details = {
    username: '',
    email: '',
    password: '',
  };
  constructor(private authService: AuthService, private router:Router) {}
  changeName(val: any) {
    this.details.username = val.target.value;
  }
  changeEmail(val: any) {
    this.details.email = val.target.value;
  }
  changePass(val: any) {
    this.details.password = val.target.value;
  }
  ngOnInit(): void {}
  signUp() {
    if (
      !this.details.email ||
      !this.details.password ||
      !this.details.username
    ) {
      alert('check all the fields');
      return;
    }
    this.authService.register(this.details).then((data)=>{
      console.log("yay!");
      alert("Success! Go to sign in.");
      this.details = {
        username: '',
        email: '',
        password: '',
      };
      this.router.navigateByUrl('/auth/login')
    });
  }
}
