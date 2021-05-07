import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  tests: any = [];
  constructor(
    private testService: TestService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    var user = localStorage.getItem('userName');
    this.testService.getAll(user).subscribe(
      (testsList: any) => {
        this.tests = testsList;
        console.log(this.tests);
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
