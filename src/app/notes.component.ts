import {Component} from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  constructor(private http: HttpClient, private http2: HttpClient) {
    this.getNotes().subscribe(notes => {
      this.notes = notes;
      console.log(notes);
    });
  }

  add() {
    const note = { text: this.text, section: this.section };
    this.notes.push(note);
    this.addNote(note).subscribe();
    this.text = '';
  }

  remove(idx) {
    this.notes.splice(idx,1);
  }

  getNotes(): Observable<Note[]> {
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('section', this.section);
    // return this.http.get<Note[]>(`${this.notesUrl}/?section=${this.section}`).pipe(
    //   tap(_ => this.log(`found heroes matching "${this.section}"`)),
    //   catchError(this.handleError<Note[]>('getNotes', []))
    // );
    const params: URLSearchParams = new URLSearchParams();
    params.set('section', this.section);
    return this.http2.get(this.notesUrl, {search: params})
      .pipe(
        map(response => response.json() as Note[])
      );
    // TODO: !!! pipe was added to make example workable with import { Observable }
  }

  /** POST: add a new hero to the server */
  addNote (note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, httpOptions).pipe(
      tap((note: Note) => this.log(`added hero w/ text=${note.text}`)),
      catchError(this.handleError<Note>('addNote'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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
