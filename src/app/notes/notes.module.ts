import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteContainerComponent } from './note-container/note-container.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [NoteContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
