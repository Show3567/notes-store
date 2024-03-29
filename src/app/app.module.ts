import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteContentComponent } from './components/note-content/note-content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PickpicComponent } from './pickpic/pickpic.component';

@NgModule({
  declarations: [AppComponent, NotesListComponent, NoteContentComponent, PickpicComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
