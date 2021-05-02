import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}
  readonly BaseURI = 'https://localhost:44329/api';

  addQuizAttempt(attempt: any) {
    return this.http.post(this.BaseURI + '/quiz/attempt', attempt);
  }

  addQuizAnswer(answer: any) {
    return this.http.post(this.BaseURI + '/quiz/answer', answer);
  }

  submitQuiz(submitObj) {
    return this.http.post(this.BaseURI + '/quiz/submit', submitObj);
  }
}
