import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'add-questions-matching',
  templateUrl: './add-questions-matching.component.html',
  styleUrls: ['./add-questions-matching.component.css'],
})
export class AddQuestionsMatchingComponent implements OnInit {
  @Output() addQuestion = new EventEmitter<any>();
  @Input() fromTest: boolean = false;
  array = Array;
  count = 4;
  question: any = { title: 'Match the options below: ', questionType: '3' };
  difficultyLevels: { id: number; name: string }[];
  constructor(
    private toastr: ToastrService,
    private questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.question.answers = [];
    this.difficultyLevels = this.questionService.getDifficutlyLevels();
  }

  dataChanged(event, i, type) {
    if (type === 'name')
      this.question.answers[i] = Object.assign(this.question.answers[i] || {}, {
        name: event,
      });
    if (type === 'matchingText')
      this.question.answers[i] = Object.assign(this.question.answers[i] || {}, {
        matchingText: event,
      });
  }

  AddQuestion() {
    if (this.question.answers.length > 0) {
      this.questionService.add(this.question).subscribe(
        (qid: any) => {
          if (this.fromTest) {
            this.question.id = qid;
            this.question.givenAnswerId = null;
            this.addQuestion.emit(this.question);
          }
          this.toastr.info('Matching Question Successfully Added');
          this.question = {};
          this.question.answers = [];
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
