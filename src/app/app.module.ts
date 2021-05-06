import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CountdownModule } from 'ngx-countdown';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TestsComponent } from './components/tests/tests.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestResultsComponent } from './components/test-results/test-results.component';
import { EditTestFormComponent } from './components/edit-test-form/edit-test-form.component';
import { QuestionCardPreviewComponent } from './components/common/question-card-preview/question-card-preview.component';
import { TestsSelectQuestionsComponent } from './components/tests-select-questions/tests-select-questions.component';
import { QuestionBankComponent } from './components/question-bank/question-bank.component';
import { AddQuestionsFormComponent } from './components/add-questions-form/add-questions-form.component';
import { AddQuestionsMcqComponent } from './components/add-questions-mcq/add-questions-mcq.component';
import { AddQuestionsTruefalseComponent } from './components/add-questions-truefalse/add-questions-truefalse.component';
import { AddQuestionsMatchingComponent } from './components/add-questions-matching/add-questions-matching.component';
import { AddQuestionHomeComponent } from './components/add-question-home/add-question-home.component';
import { QuizHomePageComponent } from './components/quiz-home-page/quiz-home-page.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { TestResultHomeComponent } from './components/test-result-home/test-result-home.component';
import { AddQuestionFreetextComponent } from './components/add-question-freetext/add-question-freetext.component';
import { TimerComponent } from './components/common/timer/timer.component';
import { AddQuestionFormTestComponent } from './components/add-question-form-test/add-question-form-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    TestsComponent,
    TestDetailsComponent,
    NavBarComponent,
    DashboardComponent,
    TestResultsComponent,
    EditTestFormComponent,
    QuestionCardPreviewComponent,
    TestsSelectQuestionsComponent,
    QuestionBankComponent,
    AddQuestionsFormComponent,
    AddQuestionsMcqComponent,
    AddQuestionsTruefalseComponent,
    AddQuestionsMatchingComponent,
    AddQuestionHomeComponent,
    QuizHomePageComponent,
    QuizQuestionComponent,
    TestResultHomeComponent,
    AddQuestionFreetextComponent,
    TimerComponent,
    AddQuestionFormTestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      progressBar: true,
    }),
    CountdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
