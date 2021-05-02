import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css'],
})
export class TestResultsComponent implements OnInit {
  currentLinkId: any;
  link: any = {
    test: {},
  };
  student: any = {};

  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentLinkId = params.id;
    });
    this.linkService.get(this.currentLinkId).subscribe((res: any) => {
      this.link = res;
    });
  }

  ShowResultSummery(id: number) {
    let studentSummery: any = {};
    let attempt = this.link.quizAttempts.find((qa) => qa.id == id);

    this.linkService
      .getLinkByCodeAndEmail(this.link.code, attempt.email)
      .subscribe((res: any) => {
        this.link = res;
        console.log(this.link);
      });

    let questionsList = this.link.test.questionsList;
    let easyQuestions = [];
    let mediumQuestions = [];
    let difficultQuestions = [];

    easyQuestions = questionsList
      .filter((qu) => qu.difficultyLevel == 1)
      .map((i) => i.id);
    mediumQuestions = questionsList
      .filter((qu) => qu.difficultyLevel == 2)
      .map((i) => i.id);
    difficultQuestions = questionsList
      .filter((qu) => qu.difficultyLevel == 3)
      .map((i) => i.id);

    studentSummery.name = attempt.name;
    studentSummery.enrollment = attempt.enrollment;
    studentSummery.percentage = attempt.percentage;
    studentSummery.duration = attempt.duration;
    studentSummery.startDate = attempt.startDate;
    studentSummery.finishDate = attempt.finishDate;

    studentSummery.noOfQuestions = questionsList.length;
    studentSummery.correctAnswerCount = attempt.correctQuestions;
    studentSummery.inCorrectAnswerCount =
      questionsList.length - attempt.correctQuestions;

    const uniqueAnswers = [];

    attempt.quizAnswers.map((x) =>
      uniqueAnswers.filter((a) => a.questionId == x.questionId).length > 0
        ? null
        : uniqueAnswers.push(x)
    );

    let correctEasyCount: number = 0;
    let correctMediumCount: number = 0;
    let correctDifficultCount: number = 0;

    uniqueAnswers.forEach((e) => {
      if (easyQuestions.includes(e.questionId) && e.isAnswerCorrect) {
        correctEasyCount++;
      } else if (mediumQuestions.includes(e.questionId) && e.isAnswerCorrect) {
        correctMediumCount++;
      } else if (
        difficultQuestions.includes(e.questionId) &&
        e.isAnswerCorrect
      ) {
        correctDifficultCount++;
      }
    });

    studentSummery.correctEasyQuestion =
      correctEasyCount + ' out of ' + easyQuestions.length;
    studentSummery.correctMediumQuestion =
      correctMediumCount + ' out of ' + mediumQuestions.length;
    studentSummery.correctDifficultQuestion =
      correctDifficultCount + ' out of ' + difficultQuestions.length;
    this.student = studentSummery;
  }
}
