import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private noteslist: Note[] = [];

  private subj$ = new BehaviorSubject(this.noteslist);
  private showitem$ = new BehaviorSubject([{}, -1, false]);

  constructor() {
    const notesliststr = localStorage.getItem('notes');
    if (notesliststr) {
      this.noteslist = JSON.parse(notesliststr);
      this.subj$.next(this.noteslist);
    }
  }

  add(note: Note) {
    const obj = this.noteslist.find((ele) => ele.title === note.title);
    if (obj) {
      obj.content = note.content;
    } else {
      this.noteslist.push(note);
    }

    localStorage.setItem('notes', JSON.stringify(this.noteslist));
    this.subj$.next(this.noteslist);
  }

  delete(noteindex: number) {
    this.noteslist = this.noteslist.filter((note, i) => i !== noteindex);
    localStorage.setItem('notes', JSON.stringify(this.noteslist));
    this.subj$.next(this.noteslist);
  }
  showitem(noteindex: number) {
    this.showitem$.next([this.noteslist[noteindex], noteindex, true]);
  }
  emptyform() {
    this.showitem$.next([{ title: '', content: '' }, -1, false]);
  }

  getnoteslist() {
    return this.subj$.asObservable();
  }
  getnoteitem() {
    return this.showitem$.asObservable();
  }
}
