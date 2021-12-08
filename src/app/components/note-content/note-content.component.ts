import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss'],
})
export class NoteContentComponent implements OnInit {
  note: Note = { title: '', content: '' };
  id: number = -1;
  form: any;
  isdisabled = true;
  get title() {
    return this.form.get('title');
  }
  get content() {
    return this.form.get('content');
  }

  constructor(private fb: FormBuilder, private notesService: NotesService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      content: [''],
    });

    this.notesService.getnoteitem().subscribe((note: any) => {
      this.note = note[0];
      this.id = note[1];
      this.title.setValue(this.note.title);
      this.content.setValue(this.note.content);
    });

    this.title.valueChanges.subscribe((val: any) => {
      this.isdisabled = val === this.note.title;
    });
    this.content.valueChanges.subscribe((val: any) => {
      this.isdisabled = val === this.note.content;
    });
  }

  onSubmit() {
    alert('Note was saved');
    console.log(this.form.value);
    this.notesService.add(this.form.value);
    this.isdisabled = true;
  }

  revert() {
    alert('Note was reverted');
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
