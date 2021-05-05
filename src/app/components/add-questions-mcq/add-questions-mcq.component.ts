import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { error } from 'selenium-webdriver';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'add-questions-mcq',
  templateUrl: './add-questions-mcq.component.html',
  styleUrls: ['./add-questions-mcq.component.css'],
})
export class AddQuestionsMcqComponent implements OnInit {
  @Output() addQuestion = new EventEmitter<any>();
  @Input() fromTest: boolean = false;
  @Input() question: any = { questionType: '1', answers: [] };
  array = Array;
  count = 4;

  difficultyLevels: any = [];
  correctAnswerIndex: 0;
  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.question.answers = [];
    this.difficultyLevels = this.questionService.getDifficutlyLevels();
    this.count =
      this.question && this.question.answers.length > 0
        ? this.question.answers.length
        : 4;
    this.question.answers = this.question ? this.question.answers : [];
  }

  AddMoreAnswers() {
    this.count++;
  }

  RemoveAnswerFieds(i: number) {
    this.count--;
    if (this.question.answers.length > 0) {
      var xx = this.question.answers[i];
      this.question.answers.splice(i, 1);
      console.log(this.question.answers);
    }
  }

  setCorrectAnswer() {
    if (this.question.answers.length > 0) {
      this.question.answers.map((qu) => {
        qu.isCorrectAnswer = false;
      });
      var answer = this.question.answers[this.correctAnswerIndex];
      answer.isCorrectAnswer = true;
    } else {
      this.toastr.error('Please add at lease one answer');
    }
  }

  dataChanged(event, i, type) {
    if (type === 'name')
      this.question.answers[i] = Object.assign(this.question.answers[i] || {}, {
        name: event,
      });
  }

  AddQuestion() {
    if (this.question.id) {
      this.UpdateQuestion();
    } else {
      if (this.question.answers.length > 0) {
        this.questionService.add(this.question).subscribe(
          (qId: any) => {
            this.toastr.info('MCQ Successfully Added');
            if (this.fromTest) {
              this.question.id = qId;
              this.question.givenAnswerId = null;
              this.addQuestion.emit(this.question);
            }

            this.question = {};
            this.question.answers = [];
          },
          (err) => {
            this.toastr.error(err);
          }
        );
      } else {
        this.toastr.error('Please add at lease one answer');
      }
    }
  }
  UpdateQuestion() {
    if (this.question.answers.length > 0) {
      this.questionService.update(this.question.id, this.question).subscribe(
        (qId: any) => {
          this.toastr.info('MCQ updated successfully');
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    } else {
      this.toastr.error('Please add at lease one answer');
    }
  }
}
