import {Component} from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  section: string = 'Work';

  constructor(private http: Http) {
    this.getNotes().subscribe(notes => {
      this.notes = notes;
      console.log(notes);
    });
  }

  add() {
    const note = { text: this.text, section: this.section };
    this.notes.push(note);
    this.text = '';
  }

  remove(idx) {
    this.notes.splice(idx,1);
  }

  getNotes(): Observable<Note[]> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('section', this.section);
    return this.http.get(this.notesUrl, {search: params})
      .pipe(
        map(response => response.json() as Note[])
      );
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
