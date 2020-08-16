import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteContainerComponent } from './note-container/note-container.component';

const routes: Routes = [
  {
    path: '',
    component: NoteContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
