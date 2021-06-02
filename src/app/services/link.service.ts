import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private http: HttpClient) {}
  readonly BaseURI = 'https://localhost:44329/api';

  add(link) {
    return this.http.post(this.BaseURI + '/link', link);
  }

  getAll() {
    return this.http.get(this.BaseURI + '/link');
  }
  get(id) {
    return this.http.get(this.BaseURI + '/link/' + id);
  }
  getLinkByCodeAndEmail(code: string, email: string) {
    return this.http.get(this.BaseURI + '/link/code/' + code + '/' + email);
  }
  getLinkByCode(code: string) {
    return this.http.get(this.BaseURI + '/link/code/' + code);
  }
  update(id, link) {
    return this.http.post(this.BaseURI + '/link/' + id, link);
  }
  delete(id) {
    return this.http.delete(this.BaseURI + '/link/' + id);
  }
}
