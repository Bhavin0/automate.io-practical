import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { NotesService } from '../service/notes.service';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss']
})
export class NoteContainerComponent implements OnInit {

  isNavOpen: boolean = true;
  search: string = '';
  notes: any = [];
  note: any = {};

  constructor(private _notesService: NotesService) { }

  ngOnInit() {
    if (localStorage.getItem('notes')) {
      this.notes = JSON.parse(localStorage.getItem('notes'));
    } else {
      this._notesService.getNotes().subscribe((response) => {
        localStorage.setItem('notes', JSON.stringify(response['notes']));
        this.notes = response['notes'];
      });
    }
    if (window.innerHeight < 481 && window.innerWidth < 801) {
      this.isNavOpen = false;
    }
  }

  manageSearch() {
    let notes = JSON.parse(localStorage.getItem('notes'));
    this.notes = [];
    let searchText = this.search ? this.search.toLowerCase() : '';
    if (searchText) {
      this.notes = notes.filter(note => {
        if (note.title.indexOf(searchText.toLowerCase()) > -1) {
          return note.title.indexOf(searchText.toLowerCase()) > -1;
        } else if (note.description.search(searchText) > -1) {
          return note.description.search(searchText) > -1;
        }
      });
    } else {
      notes.unshift({
        'title': 'new note',
        'description': '',
        'created': new Date().toISOString(),
        'id': notes[notes.length - 1].id + 1
      });
      this.notes = notes;
    }
  }

  selectNote(note) {
    if (note.id) {
      this.note = note;
    } else {
      this.note.id = this.notes[this.notes.length - 1].id + 1;
      this.note.created = new Date().toISOString();
      this.note.title = 'New Note';
    }
  }

  removeNote() {
    if (!this.note.title || this.note.title == 'new note') {
      let index = this.notes.findIndex(nt => nt.id == this.note.id);
      this.notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.note = {};
    }
  }

  createOrUpdateNote() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerHeight < 481 && window.innerWidth < 801) {
      this.isNavOpen = false;
    } else {
      this.isNavOpen = true;
    }
  }
}
