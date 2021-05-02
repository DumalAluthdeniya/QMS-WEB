import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css'],
})
export class QuestionBankComponent implements OnInit {
  questions: any = [];
  questionsCount: number;
  questionTypes: any;
  difficultyLevels: any;
  filteredQuestion: Object;

  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const types$ = this.questionService.getQuetionTypes();
    const levels$ = this.questionService.getDifficultyLevels();
    const questions$ = this.questionService.getAll();

    combineLatest([types$, levels$, questions$]).subscribe(
      ([types, levels, questions]) => {
        this.questionTypes = types;
        this.difficultyLevels = levels;
        this.filteredQuestion = this.questions = questions;
        this.questionsCount = this.questions.length;
        this.spinner.hide();
        console.log(this.filteredQuestion);
      }
    );
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
