import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'add-questions-mcq',
  templateUrl: './add-questions-mcq.component.html',
  styleUrls: ['./add-questions-mcq.component.css'],
})
export class AddQuestionsMcqComponent implements OnInit {
  @Output() addQuestion = new EventEmitter<any>();
  @Input() fromTest: boolean = false;
  @Input() questionEdit: any = {};
  array = Array;
  count = 4;
  question: any = {};
  difficultyLevels: any = [];
  correctAnswerIndex: 0;

  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.questionEdit.id) {
      this.question = {};
      this.question.answers = [];
      this.count = 4;
      this.question.questionType = 1;
      this.question.user = localStorage.getItem('userName');
    }
    this.difficultyLevels = this.questionService.getDifficutlyLevels();
  }

  ngOnChanges() {
    if (this.questionEdit) {
      this.question = this.questionEdit;
      this.question.questionType = 1;
      if (this.question.answers) {
        this.count = this.question.answers.length;
        this.correctAnswerIndex = this.question.answers.indexOf(
          this.question.answers.find((a) => a.isCorrectAnswer)
        );
      } else {
        this.question.answers = [];
        this.count = 4;
      }
    }
  }

  AddMoreAnswers() {
    this.count++;
  }

  RemoveAnswerFieds(i: number) {
    this.count--;
    if (this.question.answers.length > 0) {
      var xx = this.question.answers[i];
      this.question.answers.splice(i, 1);
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
      console.log(this.question);
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
            this.question.user = localStorage.getItem('userName');
            this.question.questionType = 1;
            this.question.answers = [];
            this.correctAnswerIndex = 0;
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
    {
      if (this.question.answers.length > 0) {
        this.questionService.update(this.question.id, this.question).subscribe(
          (qId: any) => {
            this.toastr.info('MCQ updated Successfully');
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
}
