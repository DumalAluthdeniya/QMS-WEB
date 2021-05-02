import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    name: '',
    password:''
  };

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    
  }

 Login() {
   this.auth.login(this.user).subscribe(
    (res : any) => {
    
    let tokenInfo = this.getDecodedAccessToken(res.token); // decode token
    let expireDate = tokenInfo.exp; // get token expiration dateTime

    localStorage.setItem('token', res.token);
    localStorage.setItem('userName', tokenInfo.UserName);

    this.router.navigateByUrl('/dashboard');
   },
   err => {
    if (err.status == 400)
      this.toastr.error('Incorrect username or password.', 'Authentication failed.');
    else
      console.log(err);
    }
   );
 }

 getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}



}
