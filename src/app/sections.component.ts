import {Component} from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sections',
  templateUrl: './sections.component.html'
})
export class SectionsComponent {
  private sectionsUrl = 'http://localhost:8080/sections'; // URL to web api

  sections: Section[];

  activeSection: string;

  constructor(private http: Http) {
    this.readSections();
  }

  readSections() {
    this.getSections().subscribe(sections => {
      this.sections = sections;
      if (this.activeSection == null && this.sections.length > 0) {
        this.showSection(this.sections[0]);
      }
    });
  }

  getSections(): Observable<Section[]> {
    return this.http.get(this.sectionsUrl)
      .pipe(
        map(response => response.json() as Section[])
      );
    // TODO: !!! pipe was added to make example workable with import { Observable }
  }

  showSection(section: Section) {
    this.activeSection = section.title;
  }
}

interface Section {
  _id: string;
  title: string;
}
