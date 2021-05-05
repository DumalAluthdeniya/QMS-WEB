import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions.service';

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
  @Output() delete = new EventEmitter<any>();

  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  UpdateTest(question: any) {
    this.question.isSelected = !this.question.isSelected;
    this.addQuestionToTestEvent.emit({
      question: question,
      action: this.question.isSelected ? 'add' : 'remove',
    });
  }

  DeleteQuestion(id) {
    this.questionService.delete(id).subscribe((res: any) => {
      this.toastr.info('Question Deleted Successfully');
      this.delete.emit(id);
    });
  }
}
