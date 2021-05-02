import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Inject,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';
import { EditTestFormComponent } from '../edit-test-form/edit-test-form.component';

@Component({
  selector: 'tests-select-questions',
  templateUrl: './tests-select-questions.component.html',
  styleUrls: ['./tests-select-questions.component.css'],
})
export class TestsSelectQuestionsComponent implements OnInit {
  questions: any = [];
  @Output() addQuestionToTestEvent = new EventEmitter<any>();
  questionTypes: any;
  difficultyLevels: any;
  filteredQuestion: any;

  constructor(
    @Inject(EditTestFormComponent) private parent: EditTestFormComponent,
    private questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    const types$ = this.questionService.getQuetionTypes();
    const levels$ = this.questionService.getDifficultyLevels();
    const questions$ = this.questionService.getAll();
    combineLatest([types$, levels$, questions$]).subscribe(
      ([types, levels, questionsList]: any) => {
        this.questionTypes = types;
        this.difficultyLevels = levels;
        questionsList.map((question: any) => {
          this.parent.selectedQuestions.some((el) => el.title == question.title)
            ? (question.isSelected = true)
            : (question.isSelected = false);
          this.questions.push(question);
          this.filteredQuestion = this.questions;
        });
        console.log(this.filteredQuestion);
      }
    );
  }

  AddQuestionToTest(data: any) {
    this.addQuestionToTestEvent.emit(data);
  }

  onSearchChange(searchText) {
    this.filteredQuestion =
      searchText !== ''
        ? this.questions.filter((qq) =>
            qq.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : this.questions;
  }
  onTypeChange(qtype) {
    this.filteredQuestion =
      qtype !== 'all'
        ? this.questions.filter((qq) => qq.questionType == qtype)
        : this.questions;
  }
  onLevelChange(qlevel) {
    this.filteredQuestion =
      qlevel !== 'all'
        ? this.questions.filter((qq) => qq.difficultyLevel == qlevel)
        : this.questions;
  }
}
