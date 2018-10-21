import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {SettingsService} from "../../settings.service";
import {NgForm} from "@angular/forms";
import {CourseTerm} from "../../course-term.model";

@Component({
  selector: 'app-course-terms-edit',
  templateUrl: './course-terms-edit.component.html',
  styleUrls: ['./course-terms-edit.component.css']
})
export class CourseTermsEditComponent implements OnInit, OnDestroy {
  editMode = false;
  @Output() termUpdated = new EventEmitter<string>();
  @ViewChild('f') courseTermsForm: NgForm;
  subscription: Subscription;
  editedTermIndex: number;
  term: CourseTerm;
  isActive: boolean;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.subscription = this.settingsService.startedEditingTerm
      .subscribe(
        (index: number) => {
          this.editedTermIndex = index;
          this.editMode = true;
          this.term = this.settingsService.selectedTerm;
          this.isActive = this.settingsService.selectedTerm.isActive;
          this.courseTermsForm.setValue({
            term: this.settingsService.selectedTerm.term,
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCourseTerm = new CourseTerm(null, value.term, true);
    if (this.editMode) {
      this.settingsService.updateSelectedTerm(this.settingsService.termKey, value.term);
      this.termUpdated.emit();
    } else {
      this.settingsService.createCourseTerm(newCourseTerm);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.courseTermsForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // onDelete() {
  //   if (confirm('Are you sure to delete this term?') == true) {
  //     this.settingsService.deleteSelectedLTerm(this.settingsService.termKey);
  //     this.termUpdated.emit();
  //     this.onClear();
  //   }
  // }

  onChangeStatus() {
    this.settingsService.changeTermStatus(this.settingsService.termKey, !this.term.isActive);
    this.isActive = !this.isActive;
    this.onClear();
  }

}
