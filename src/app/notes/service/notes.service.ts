import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  apiURL: string = '';
  constructor(
    private _httpClient: HttpClient,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.apiURL = this._document.location.href + 'assets/notes.json';
  }

  getNotes() {
    return this._httpClient.get(this.apiURL);
  }

}
