import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { LinkService } from 'src/app/services/link.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit {
  code: Guid;
  baseUrl: string = 'http://localhost:4200/online-test/start?quiz=';

  link: any = {
    timeLimit: 0,
    user: localStorage.getItem('userName'),
    test: {
      name: '',
    },
  };
  currentTestId: any;
  currentLinkId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private linkService: LinkService,
    private testService: TestService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentTestId = params.testId;
      this.currentLinkId = params.linkId;
    });

    if (this.currentLinkId) {
      this.linkService.get(this.currentLinkId).subscribe((link: any) => {
        this.link = link;
        this.link.testId = this.currentTestId;
      });
    } else if (this.currentTestId) {
      this.testService.get(this.currentTestId).subscribe((test: any) => {
        this.link.test = test;
        this.link.testId = this.currentTestId;
        let code = Guid.create().toString();
        this.link.url = this.baseUrl + code;
        this.link.code = code;
      });
    }
  }

  AddLink() {
    if (this.link.name == '' || this.link.name == null) {
      this.toastr.error('Please add reference name');
      return false;
    }

    if (!this.link.id) {
      this.linkService.add(this.link).subscribe(
        (linkId) => {
          this.router.navigateByUrl(
            '/tests/' + this.currentTestId + '/links/' + linkId
          );
          this.toastr.info('Link Successfully Created.');
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    } else {
      this.linkService.update(this.link.id, this.link).subscribe(
        (linkId) => {
          console.log(linkId);
          this.router.navigateByUrl(
            '/tests/' + this.currentTestId + '/links/' + linkId
          );
          this.toastr.info('Link updated successfully.');
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    }
  }
}
