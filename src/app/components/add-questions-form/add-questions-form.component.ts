import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'add-questions-form',
  templateUrl: './add-questions-form.component.html',
  styleUrls: ['./add-questions-form.component.css'],
})
export class AddQuestionsFormComponent implements OnInit {
  @Input() fromTest: boolean = false;
  @Output() addQuestion = new EventEmitter<any>();

  type = 0;

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(type) {
    this.type = type;
  }

  onAddQuestion(event) {
    this.addQuestion.emit(event);
  }
}
