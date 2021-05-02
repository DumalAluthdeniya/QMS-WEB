import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'add-question-freetext',
  templateUrl: './add-question-freetext.component.html',
  styleUrls: ['./add-question-freetext.component.css'],
})
export class AddQuestionFreetextComponent implements OnInit {
  @Output() addQuestion = new EventEmitter<any>();
  @Input() fromTest: boolean = false;
  question = {
    id: 0,
    givenAnswerId: null,
    answers: [],
    points: 0,
    title: '',
    questionType: 4,
    difficultyLevel: 0,
  };
  answer: any;
  difficultyLevels: { id: number; name: string }[];
  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.difficultyLevels = this.questionService.getDifficutlyLevels();
  }
  AddQuestion() {
    console.log(this.answer);
    if (this.answer !== '') {
      this.question.answers = [{ name: this.answer, isCorrectAnswer: true }];

      this.questionService.add(this.question).subscribe(
        (qid: any) => {
          if (this.fromTest) {
            this.question.id = qid;
            this.question.givenAnswerId = null;
            this.addQuestion.emit(this.question);
          }
          this.toastr.info('Free Text Question Successfully Added');
          this.question = {
            id: 0,
            givenAnswerId: null,
            answers: [],
            points: 0,
            title: '',
            questionType: 4,
            difficultyLevel: 0,
          };
          this.answer = '';
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    } else {
      this.toastr.error('Please add the correct answer');
    }
  }
}
