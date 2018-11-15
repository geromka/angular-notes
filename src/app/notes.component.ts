import {Component} from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent {
  private notesUrl = 'http://localhost:8080/notes';
  notes: Note[] = [
    {text: 'Note one'},
    {text: 'Note two'}
  ];
  text: string;

  constructor(private http: Http) {
    this.getNotes().then(notes => {
      this.notes = notes;
      console.log(notes);
    });
  }

  add() {
    const note = { text: this.text };
    this.notes.push(note);
    this.text = '';
  }

  remove(idx) {
    this.notes.splice(idx,1);
  }

  getNotes(): Promise<Note[]> {
    return this.http.get(this.notesUrl)
      .toPromise()
      .then(response => response.json() as Note[]);
  }

  // TODO:
  /*
  Additional tasks
  1) Add «Send to top» button
  2) Implement sending data to server to add a note
  */
}

interface Note {
  text: string;
}
