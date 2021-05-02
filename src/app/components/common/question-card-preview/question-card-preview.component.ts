import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'question-card-preview',
  templateUrl: './question-card-preview.component.html',
  styleUrls: ['./question-card-preview.component.css'],
})
export class QuestionCardPreviewComponent implements OnInit {
  @Input() question: any = {};
  @Input() isTest: boolean = false;
  @Input() isResult: boolean = false;
  @Input() showAddQuestion: boolean;
  @Output() addQuestionToTestEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  UpdateTest(question: any) {
    this.question.isSelected = !this.question.isSelected;
    this.addQuestionToTestEvent.emit({
      question: question,
      action: this.question.isSelected ? 'add' : 'remove',
    });
  }
}
