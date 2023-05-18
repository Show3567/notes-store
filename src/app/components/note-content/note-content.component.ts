import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss'],
})
export class NoteContentComponent implements OnInit {
  private note: Note = { title: '', content: '' };
  private id: number = -1;

  form!: FormGroup;
  isdisabled = true;

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get content(): FormControl {
    return this.form.get('content') as FormControl;
  }

  constructor(private fb: FormBuilder, private notesService: NotesService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: '',
      content: '',
    });

    this.notesService.getnoteitem().subscribe(([note, id, titledis]: any) => {
      this.note = note;
      this.id = id;

      titledis ? this.title.disable() : this.title.enable();

      this.title.setValue(this.note.title);
      this.content.setValue(this.note.content);
    });

    merge(this.title.valueChanges, this.content.valueChanges)
      .pipe(
        tap((_) => {
          const checkcontent = this.content.value === this.note.content;
          const checktitle = this.title.value === this.note.title;
          this.isdisabled = checkcontent && checktitle;
        })
      )
      .subscribe();
  }

  onSubmit() {
    this.notesService.add({
      ...this.note,
      ...this.form.value,
    });
    this.isdisabled = true;

    this.title.setValue('');
    this.content.setValue('');
  }

  revert() {
    // alert('Note was reverted');
    const notelist = localStorage.getItem('notes');
    if (notelist) {
      const note = JSON.parse(notelist)[this.id];
      if (note) {
        this.title.setValue(note.title);
        this.content.setValue(note.content);
      } else {
        this.form.reset();
      }
    }
  }
}
