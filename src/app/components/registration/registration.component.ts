import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = {
    name: '',
    email:'',
    password:''
  };
  constructor(public auth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  Register(){
    this.auth.register(this.user).subscribe((res:any) => {
      if (res.succeeded) {
        this.toastr.success('New user created!', 'Registration successful.');
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken','Registration failed.');
              break;

            default:
            this.toastr.error(element.description,'Registration failed.');
              break;
          }
        });
      }
    });
  }
  
}
