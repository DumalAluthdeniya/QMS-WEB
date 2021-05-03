import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css'],
})
export class QuizQuestionComponent implements OnInit {
  // @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @Input() question: any = {};
  @Input() canSubmit: boolean;
  @Input() hasTimeLimit: boolean;
  @Input() timeLimit: 0;
  @Input() questionList: any;
  @Output() next = new EventEmitter<boolean>();
  @Output() previous = new EventEmitter<boolean>();
  @Output() answer = new EventEmitter<any>();
  @Output() timer = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();

  matchingTextList: any = [];
  constructor() {}

  ngOnInit(): void {}

  shuffle(sourceArray: any) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.matchingTextList = [];
    if (this.question.questionType == 3) {
      this.question.answers.map((a: any) => {
        this.matchingTextList.push(a.matchingText);
      });
    }
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
  }

  onItemChange(data: any) {
    console.log(data);
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
