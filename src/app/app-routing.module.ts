import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { TestResultsComponent } from './components/test-results/test-results.component';
import { EditTestFormComponent } from './components/edit-test-form/edit-test-form.component';
import { TestsSelectQuestionsComponent } from './components/tests-select-questions/tests-select-questions.component';
import { QuestionBankComponent } from './components/question-bank/question-bank.component';
import { AddQuestionsFormComponent } from './components/add-questions-form/add-questions-form.component';
import { AddQuestionHomeComponent } from './components/add-question-home/add-question-home.component';
import { QuizHomePageComponent } from './components/quiz-home-page/quiz-home-page.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { TestResultHomeComponent } from './components/test-result-home/test-result-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'qb', component: QuestionBankComponent },
  { path: 'qb/new', component: AddQuestionHomeComponent },
  { path: 'qb/edit/:id', component: AddQuestionHomeComponent },
  { path: 'tests/new', component: EditTestFormComponent },
  { path: 'tests/qb', component: TestsSelectQuestionsComponent },
  { path: 'tests/edit/:id', component: EditTestFormComponent },
  { path: 'tests/:testId/links/new', component: TestDetailsComponent },
  { path: 'tests/:testId/links/:linkId', component: TestDetailsComponent },
  { path: 'results', component: TestResultHomeComponent },
  { path: 'results/:id', component: TestResultsComponent },
  { path: 'online-test/start', component: QuizHomePageComponent },
  { path: 'online-test/test', component: QuizQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
