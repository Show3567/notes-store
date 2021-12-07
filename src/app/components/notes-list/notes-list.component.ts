import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  noteslist$: any;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.noteslist$ = this.notesService.subj$;
  }

  deletnote(noteindex: number) {
    console.log(noteindex);
    this.notesService.delete(noteindex);
  }

  showitem(noteindex: number) {
    this.notesService.showitem(noteindex);
  }
  emptyform() {
    this.notesService.emptyform();
  }
}
