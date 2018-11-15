import {Component} from '@angular/core';

@Component({
  selector: 'notes',
  template: `Notes list:
    <ul>
      <li *ngFor="let note of notes ">
        {{note.text}}
      </li>
    </ul>
    <textarea [(ngModel)]="text"></textarea>
    <button (click)="add()">Add</button>`
})
export class NotesComponent {
  notes: Note[] = [
    {text: 'Note one'},
    {text: 'Note two'}
  ];
  text: string;

  add() {
    const note = { text: this.text };
    this.notes.push(note);
    this.text = '';
  }
}

interface Note {
  text: string;
}
