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
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<any>();
  @Output() answer = new EventEmitter<any>();
  @Output() timer = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Output() stopwatch = new EventEmitter<any>();

  matchingTextList: any = [];
  timerRef: any;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  counter: number;
  running: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.counter = this.question.counter;
    this.running = true;
    this.startTimer();

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
    this.answer.emit(data);
  }

  Next() {
    this.running = false;

    this.startTimer();
    let lapTime = '00:' + this.minutes + ':' + this.seconds;

    this.next.emit({
      question: this.question,
      counter: this.counter,
      lapTime: lapTime,
    });
  }
  Previous() {
    this.running = false;
    this.startTimer();
    let lapTime = '00:' + this.minutes + ':' + this.seconds;

    this.previous.emit({
      question: this.question,
      counter: this.counter,
      lapTime: lapTime,
    });
  }

  handleEvent(event) {
    this.timer.emit(event);
  }

  SubmitQuiz() {
    this.Next();
    this.submit.emit(true);
  }

  startTimer() {
    if (this.running) {
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.milliseconds = Math.floor(
          Math.floor(this.counter % 1000) / 10
        ).toFixed(0);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(
          Math.floor(this.counter % 60000) / 1000
        ).toFixed(0);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    clearInterval(this.timerRef);
    this.counter = undefined;
    (this.milliseconds = '00'), (this.seconds = '00'), (this.minutes = '00');
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    let lapTime = '00:' + this.minutes + ':' + this.seconds;
    console.log(lapTime);
  }
}
