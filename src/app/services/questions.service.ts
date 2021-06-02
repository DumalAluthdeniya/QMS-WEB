import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}
  readonly BaseURI = 'https://localhost:44329/api';

  getAll() {
    return this.http.get(
      this.BaseURI + '/questions/all/' + localStorage.getItem('userName')
    );
  }
  get(id) {
    return this.http.get(this.BaseURI + '/questions/' + id);
  }
  add(question) {
    return this.http.post(this.BaseURI + '/questions', question);
  }

  update(id, question) {
    return this.http.post(this.BaseURI + '/questions/' + id, question);
  }

  delete(id) {
    return this.http.delete(this.BaseURI + '/questions/' + id);
  }

  getDifficutlyLevels() {
    return [
      { id: 1, name: 'Easy' },
      { id: 2, name: 'Medium' },
      { id: 3, name: 'Hard' },
    ];
  }

  getQuetionTypes() {
    return this.http.get(this.BaseURI + '/questions/types');
  }
  getDifficultyLevels() {
    return this.http.get(this.BaseURI + '/questions/difficultyLevels');
  }
}
