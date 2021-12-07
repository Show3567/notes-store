import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  noteslist: Note[] = [];

  subj$ = new BehaviorSubject(this.noteslist);
  showitem$ = new BehaviorSubject([{}, -1]);

  constructor() {
    const notesliststr = localStorage.getItem('notes');
    if (notesliststr) {
      this.noteslist = JSON.parse(notesliststr);
      this.subj$.next(this.noteslist);
    }
  }

  add(note: any) {
    const obj = this.noteslist.find((ele) => ele.title === note.title);
    if (obj) {
      obj.content = note.content;
    } else {
      this.noteslist.push(note);
    }
    console.log('this.noteslist: ', this.noteslist);

    localStorage.setItem('notes', JSON.stringify(this.noteslist));
    this.subj$.next(this.noteslist);
  }
  delete(noteindex: number) {
    this.noteslist = this.noteslist.filter((note, i) => i !== noteindex);
    localStorage.setItem('notes', JSON.stringify(this.noteslist));
    this.subj$.next(this.noteslist);
  }
  showitem(noteindex: number) {
    this.showitem$.next([this.noteslist[noteindex], noteindex]);
  }
  emptyform() {
    this.showitem$.next([{ title: '', content: '' }, -1]);
  }
  revert() {
    localStorage.getItem('notes');
  }
}
