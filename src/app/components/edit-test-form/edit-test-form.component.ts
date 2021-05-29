import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-edit-test-form',
  templateUrl: './edit-test-form.component.html',
  styleUrls: ['./edit-test-form.component.css'],
})
export class EditTestFormComponent implements OnInit {
  test: any = {
    user: localStorage.getItem('userName'),
    questions: [],
  };

  selectedQuestions: any = [];
  currentTestId: number;
  enabled: boolean = true;
  pointsSum: any = 0;

  constructor(
    private testService: TestService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentTestId = params.id;
    });

    this.testService.get(this.currentTestId).subscribe((test: any) => {
      this.test = test;
      this.selectedQuestions = test.questionsList;
      this.selectedQuestions.map((q) => {
        this.pointsSum += q.points;
      });
    });
  }

  AddQuestionToTest(data) {
    if (data.action === 'add') {
      this.test.questions.push(data.question.id);
      this.selectedQuestions.push(data.question);
    } else {
      this.test.questions = this.test.questions.filter(
        (item) => item != data.question.id
      );

      this.selectedQuestions = this.selectedQuestions.filter(
        (item) => item.title != data.question.title
      );
    }
    this.pointsSum = 0;
    this.selectedQuestions.map((q) => {
      this.pointsSum += q.points;
    });
  }

  AddTest() {
    if (this.test.name == '' || this.test.name == null) {
      this.toastr.error('Name is required.');
      return false;
    }
    if (this.test.questions.length <= 0) {
      this.toastr.error('Please add at least one question to test.');
      return false;
    }
    if (!this.currentTestId) {
      this.testService.add(this.test).subscribe(
        (res: any) => {
          this.toastr.success(
            'Test Sucessfully added. Click create link to assign.'
          );
          this.router.navigateByUrl('/tests/edit/' + res);
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    } else {
      console.log(this.test);
      this.testService.update(this.currentTestId, this.test).subscribe(
        (res: any) => {
          this.toastr.success(
            'Test Sucessfully updated. Click create link to assign.'
          );
          this.router.navigateByUrl('/tests/edit/' + res);
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    }
  }

  onQuestionAdd(question: any) {
    question.givenAnswerId = question.givenAnswerId
      ? question.givenAnswerId
      : 0;
    this.test.questions.push(question.id);
    this.selectedQuestions.push(question);
    this.pointsSum = 0;
    this.selectedQuestions.map((q) => {
      this.pointsSum += q.points;
    });
  }

  refreshQuestions() {
    this.enabled = false;
    this.changeDetector.detectChanges();
    // change detection should remove the component now
    // then we can enable it again to create a new instance
    this.enabled = true;
  }

  deleteTest(id) {
    this.testService.delete(id).subscribe((res: any) => {
      this.toastr.success('Test successfully deleted');
      this.router.navigateByUrl('/dashboard');
    });
  }
}
