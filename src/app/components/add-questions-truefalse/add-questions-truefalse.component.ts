import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'add-questions-truefalse',
  templateUrl: './add-questions-truefalse.component.html',
  styleUrls: ['./add-questions-truefalse.component.css'],
})
export class AddQuestionsTruefalseComponent implements OnInit {
  @Output() addQuestion = new EventEmitter<any>();
  @Input() fromTest: boolean = false;
  @Input() questionEdit: any = {};

  answersList: any = ['True', 'False'];
  question: any = {};
  array = Array;
  count = 2;
  correctAnswerIndex: 0;
  difficultyLevels: { id: number; name: string }[];
  constructor(
    private toastr: ToastrService,
    private questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.difficultyLevels = this.questionService.getDifficutlyLevels();
  }

  ngOnChanges() {
    if (this.questionEdit) {
      this.question = this.questionEdit;
      console.log(this.question);
      this.question.questionType = 2;
      if (this.question.answers && this.question.answers.length > 0) {
        this.count = this.question.answers.length;
        this.correctAnswerIndex = this.question.answers.indexOf(
          this.question.answers.find((a) => a.isCorrectAnswer)
        );
      } else {
        this.count = 2;
        this.question.answers = [];
        this.question.answers.push({ name: 'True' });
        this.question.answers.push({ name: 'False' });
      }
    }
  }

  dataChanged(event, i, type) {
    if (type === 'name')
      this.question.answers[i] = Object.assign(this.question.answers[i] || {}, {
        name: event,
      });
  }

  setCorrectAnswer() {
    if (this.question.answers.length > 0) {
      this.question.answers.map((qu) => {
        qu.isCorrectAnswer = false;
        qu.questionType = 1;
      });
      var answer = this.question.answers[this.correctAnswerIndex];
      answer.isCorrectAnswer = true;
    } else {
      this.toastr.error('Please add at lease one answer');
    }
  }

  AddQuestion() {
    if (this.question.id) {
      this.UpdateQuestion();
    } else {
      if (this.question.answers.length > 0) {
        this.questionService.add(this.question).subscribe(
          (qid: any) => {
            if (this.fromTest) {
              this.question.id = qid;
              this.question.givenAnswerId = null;
              this.addQuestion.emit(this.question);
            }

            this.toastr.info('True/False Question Successfully Added');
            this.question = {};
            this.question.answers = [];
            this.question.answers.push({ name: 'True' });
            this.question.answers.push({ name: 'False' });
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
          this.toastr.info('Question updated successfully');
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
