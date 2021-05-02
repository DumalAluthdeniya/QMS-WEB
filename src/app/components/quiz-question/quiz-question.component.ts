import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css'],
})
export class QuizQuestionComponent implements OnInit {
  @Input() question: any = {};
  @Input() canSubmit: boolean;
  @Input() hasTimeLimit: boolean;
  @Input() questionList: any;
  @Input() timerConfig: any = {};
  @Output() next = new EventEmitter<boolean>();
  @Output() previous = new EventEmitter<boolean>();
  @Output() answer = new EventEmitter<any>();
  @Output() timer = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();

  matchingTextList: any = [];
  constructor() {}

  ngOnInit(): void {
    console.log(this.questionList);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.matchingTextList = [];
    if (this.question.questionType == 3) {
      this.question.answers.map((a) => {
        this.matchingTextList.push(a.matchingText);
      });
    }

    // console.log(this.canSubmit);
    console.log(this.questionList);
  }

  SetCurrentQuestion(question: any, i) {
    question.currentNo = i + 1;
    this.matchingTextList = [];
    if (question.questionType == 3) {
      question.answers.map((a) => {
        this.matchingTextList.push(a.matchingText);
      });
    }
    this.question = question;
    console.log(this.question);
  }

  onItemChange(data: any) {
    this.answer.emit(data);
  }

  Next() {
    this.next.emit(true);
  }
  Previous() {
    this.previous.emit(true);
  }

  handleEvent(event) {
    this.timer.emit(event);
  }

  SubmitQuiz() {
    this.submit.emit(true);
  }
}
