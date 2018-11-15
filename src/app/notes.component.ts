import {Component} from '@angular/core';

@Component({
  selector: 'notes',
  template: `Notes list:
    <ul>
      <li *ngFor="let note of notes ">
        {{note.text}}
      </li>
    </ul>`
})
export class NotesComponent {
  notes: Note[] = [
    {text: 'Note one'},
    {text: 'Note two'}
  ];
}

interface Note {
  text: string;
}
