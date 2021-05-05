import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LinkService } from 'src/app/services/link.service';
import { QuizService } from 'src/app/services/quiz.service';
import { formatDate } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-quiz-home-page',
  templateUrl: './quiz-home-page.component.html',
  styleUrls: ['./quiz-home-page.component.css'],
})
export class QuizHomePageComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    enrollment: '',
  };
  link: any = {};
  code: any;
  validated: boolean = false;
  linkPassword;

  questionsList: any = [];

  currentQuestionId: any = 1;
  nextQuestionId: any;
  previoueQuestionId: any;

  currentQuestion: any = {};
  totalQuestions: number;
  linkId: any;
  attempId: any;
  testId: any;
  hasSelectedAnswer: boolean = false;
  canSubmitQuiz: boolean = false;
  timerConfig: {};
  isSubmitted: boolean;
  hasTimeLimit: boolean = true;
  timeLimit: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private linkService: LinkService,
    private quizService: QuizService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.code = params['quiz'];
    });

    this.linkService.getLinkByCode(this.code).subscribe(
      (link: any) => {
        this.linkPassword = link.password;
        this.linkId = link.id;
        this.hasTimeLimit = link.timeLimit > 0;
        this.timeLimit = link.timeLimit;
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  StartQuiz() {
    if (this.linkPassword === this.user.password) {
      if (
        this.user.email == '' ||
        this.user.name == '' ||
        this.user.enrollment == ''
      ) {
        alert('Please fill the data');
        return false;
      }

      let attempt = {
        name: this.user.name,
        email: this.user.email,
        Enrollment: this.user.enrollment,
        linkId: this.linkId,
      };

      this.quizService.addQuizAttempt(attempt).subscribe((attempId: any) => {
        this.attempId = attempId;
      });

      this.linkService
        .getLinkByCodeAndEmail(this.code, this.user.email)
        .subscribe(
          (link: any) => {
            if (
              link.quizAttempts.find((a) => a.email == this.user.email)
                .submitted
            ) {
              alert(
                'Your quiz is already submitted. You are not allowed to attempt again.'
              );
              this.validated = false;
              return false;
            }

            this.validated = true;

            this.link = link;
            this.testId = link.test.id;
            this.questionsList = link.test.questionsList.sort(
              () => Math.random() - 0.1
            );
            this.totalQuestions = this.questionsList.length;
            this.currentQuestion = this.questionsList[0];
            this.currentQuestion.currentNo = 1;
            this.currentQuestion.counter = 0;
            if (this.currentQuestion.givenAnswerId != -1) {
              this.hasSelectedAnswer = true;
              this.questionsList.find(
                (qq) => qq == this.currentQuestion
              ).completed = true;
            }
            this.questionsList.map((qu) => {
              qu.counter = 0;
              if (qu.questionType == 3) {
                if (
                  qu.answers.filter(
                    (a: { givenMatchingText: any }) =>
                      a.givenMatchingText == null
                  ).length <= 0
                ) {
                  qu.completed = true;
                } else {
                  qu.completed = false;
                }
              } else if (qu.questionType == 4 && qu.answers.length > 0) {
                if (qu.answers[0].givenMatchingText != null)
                  qu.completed = true;
              } else if (qu.givenAnswerId != -1) {
                qu.completed = true;
              }
            });

            if (
              this.questionsList.filter(
                (ql) => ql.completed == undefined || ql.completed == false
              ) <= 0
            ) {
              this.canSubmitQuiz = true;
            } else {
              this.canSubmitQuiz = false;
            }

            //timer
            if (this.timeLimit == 0) {
              this.hasTimeLimit = false;
            } else {
              this.hasTimeLimit = true;
            }
          },
          (err) => {
            alert(err.message);
          }
        );
    } else {
      alert('Quiz Password is incorrect. Please add correct password.');
      return false;
    }
  }

  onAnswerChange(data) {
    this.hasSelectedAnswer = true;
    data.quizAttemptId = this.attempId;
    data.testId = this.testId;

    if (data.questionType == 3) {
      data.matchingText = data.matchingText !== '' ? data.matchingText : null;
      this.questionsList
        .find((q) => q.id == data.questionId)
        .answers.find((a) => a.id == data.givenAnswerId).givenMatchingText =
        data.matchingText;
      if (
        this.questionsList
          .find((q) => q.id == data.questionId)
          .answers.filter((a) => a.givenMatchingText == null).length <= 0
      ) {
        this.questionsList.find(
          (ql) => ql.id == data.questionId
        ).completed = true;
      } else {
        this.questionsList.find(
          (ql) => ql.id == data.questionId
        ).completed = false;
      }
    } else if (data.questionType == 4) {
      this.questionsList.find(
        (ql) => ql.id == data.questionId
      ).completed = true;
      this.questionsList
        .find((q) => q.id == data.questionId)
        .answers.find((a) => a.id == data.givenAnswerId).givenMatchingText =
        data.matchingText;
    } else {
      this.questionsList.find(
        (ql) => ql.id == data.questionId
      ).completed = true;
      this.questionsList.find((q) => q.id == data.questionId).givenAnswerId =
        data.givenAnswerId;
    }
    if (
      this.questionsList.filter(
        (ql) => ql.completed == undefined || ql.completed == false
      ) <= 0
    ) {
      this.canSubmitQuiz = true;
    } else {
      this.canSubmitQuiz = false;
    }
    this.quizService.addQuizAnswer(data).subscribe((res: any) => {});
  }

  onNextClick(data: any) {
    if (this.hasSelectedAnswer) {
      let currentNo = this.currentQuestion.currentNo;
      let index: number = this.questionsList.indexOf(this.currentQuestion);

      this.questionsList[index].counter = data.counter;
      this.questionsList[index].timer = data.lapTime;

      let addQuizAnswer = {
        quizAttemptId: this.attempId,
        testId: this.testId,
        questionId: this.currentQuestion.id,
        duration: data.lapTime,
      };

      this.quizService
        .addQuizAnswerDuration(addQuizAnswer)
        .subscribe((res: any) => {});

      if (this.totalQuestions > index + 1) {
        this.hasSelectedAnswer = false;
        this.currentQuestion = this.questionsList[index + 1];
        this.currentQuestion.currentNo = currentNo + 1;
        if (this.currentQuestion.givenAnswerId != -1)
          this.hasSelectedAnswer = true;
      } else {
        this.canSubmitQuiz = true;
      }
    } else {
      alert('All questions must be answered. You can change the answer later.');
    }
  }

  onPreviousClick(data: any) {
    let currentNo = this.currentQuestion.currentNo;
    let index: number = this.questionsList.indexOf(this.currentQuestion);
    this.questionsList[index].counter = data.counter;
    this.questionsList[index].timer = data.lapTime;

    let addQuizAnswer = {
      quizAttemptId: this.attempId,
      testId: this.testId,
      questionId: this.currentQuestion.id,
      duration: data.lapTime,
    };

    this.quizService
      .addQuizAnswerDuration(addQuizAnswer)
      .subscribe((res: any) => {});

    if (index - 1 >= 0) {
      this.currentQuestion = this.questionsList[index - 1];
      this.currentQuestion.currentNo = currentNo - 1;
    }
  }

  onTimerEventChange(timerEvent: any = {}) {
    if (timerEvent.action === 'notify') {
      console.log(timerEvent.left);
      this.toastr.info(
        'You have ' + timerEvent.left / 1000 / 60 + ' minutes.',
        'Time Limit'
      );
    }

    if (timerEvent.action === 'done') {
      this.submitQuiz();
    }
  }
  onQuizSubmit(event) {
    this.submitQuiz();
  }

  private submitQuiz() {
    let submitObj = {
      quizAttemptId: this.attempId,
      finishTIme: formatDate(
        Date.now(),
        'yyyy-MM-dd HH:mm:ss',
        'en-US',
        '+0530'
      ),
    };

    this.quizService.submitQuiz(submitObj).subscribe((res: any) => {
      this.isSubmitted = true;
    });
  }

  ngOnDestroy() {
    alert('Service destroy');
  }

  onStopWatchChange(data) {
    console.log(data);
  }
}
