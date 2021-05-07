import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'add-questions-form',
  templateUrl: './add-questions-form.component.html',
  styleUrls: ['./add-questions-form.component.css'],
})
export class AddQuestionsFormComponent implements OnInit {
  @Input() fromTest: boolean = false;
  @Output() addQuestion = new EventEmitter<any>();

  type = 1;
  currentQuestionId: any;
  questionEdit: any = {};
  addNew: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentQuestionId = params.id;
    });

    if (this.currentQuestionId) {
      this.addNew = false;
      this.questionService
        .get(this.currentQuestionId)
        .subscribe((question: any) => {
          this.questionEdit = question;
          this.type = question.questionType;
        });
    } else {
      this.addNew = true;
    }
  }

  onButtonClick(type) {
    this.type = type;
  }

  onAddQuestion(event) {
    this.addQuestion.emit(event);
  }
}
