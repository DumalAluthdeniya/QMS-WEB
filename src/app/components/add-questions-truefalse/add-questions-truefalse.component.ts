import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'add-questions-truefalse',
  templateUrl: './add-questions-truefalse.component.html',
  styleUrls: ['./add-questions-truefalse.component.css']
})
export class AddQuestionsTruefalseComponent implements OnInit {
  @Output() addQuestion = new EventEmitter<any>();
  @Input() fromTest: boolean = false;
  answersList = ['True','False'];
  question : any = {  questionType : "2"}

  correctAnswerIndex: 0;
  difficultyLevels: { id: number; name: string; }[];
  constructor(private toastr: ToastrService, private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.question.answers = [];
    this.answersList.map(item => {
      this.question.answers.push({name:item});
    });
    this.difficultyLevels = this.questionService.getDifficutlyLevels();

  }

  dataChanged(event,i,type){
    if(type === 'name') this.question.answers[i] = Object.assign(this.question.answers[i] || {}, {name:event})
  }

  setCorrectAnswer(){
    if(this.question.answers.length > 0) {
          this.question.answers.map(qu => {
            qu.isCorrectAnswer = false;
            qu.questionType = 1;
          });
          var answer = this.question.answers[this.correctAnswerIndex];
          answer.isCorrectAnswer = true;
        }
        else{
          this.toastr.error('Please add at lease one answer')
        }
  }

  AddQuestion(){
    if(this.question.answers.length > 0){
     
      this.questionService.add(this.question).subscribe((qid:any)=>{
        if (this.fromTest) {
          this.question.id = qid;
          this.question.givenAnswerId = null;
          this.addQuestion.emit(this.question);
        }

        this.toastr.info('True/False Question Successfully Added');
        this.question = {};
        this.question.answers = [];
      },
      err => {
        this.toastr.error(err);
      });
    }
    else{
      this.toastr.error('Please add at lease one answer')
    }   
  }

}
