import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../settings.service";
import {CourseTerm} from "../course-term.model";

@Component({
  selector: 'app-course-terms',
  templateUrl: './course-terms.component.html',
  styleUrls: ['./course-terms.component.css']
})
export class CourseTermsComponent implements OnInit {
  terms: CourseTerm[] = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.getTermList();
  }

  onTermUpdated() {
    this.getTermList();
  }

  getTermList() {
    // Use snapshotChanges().map() to store the key
    this.settingsService.getAllCourseTerms().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(terms => {
      this.terms = terms;
    });
  }

  onEditTerm(index: number, term: CourseTerm) {
    this.settingsService.termKey = term.key;
    this.settingsService.selectedTerm = term;
    this.settingsService.startedEditingTerm.next(index);

  }

}
