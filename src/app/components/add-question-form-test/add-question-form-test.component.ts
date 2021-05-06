import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'add-question-form-test',
  templateUrl: './add-question-form-test.component.html',
  styleUrls: ['./add-question-form-test.component.css'],
})
export class AddQuestionFormTestComponent implements OnInit {
  @Output() addQuestion = new EventEmitter<any>();

  type = 1;
  currentQuestionId: any;
  question: any = {};
  addNew: boolean;

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(type) {
    this.type = type;
  }

  onAddQuestion(event) {
    this.addQuestion.emit(event);
  }
}
