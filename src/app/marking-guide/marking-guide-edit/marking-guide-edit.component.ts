import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {NgForm} from "@angular/forms";
import {Criterion} from "../criterion.model";
import {MarkingGuideService} from "../marking-guide.service";
import {CourseService} from "../../course/course.service";

@Component({
  selector: 'app-marking-guide-edit',
  templateUrl: './marking-guide-edit.component.html',
  styleUrls: ['./marking-guide-edit.component.css']
})

export class MarkingGuideEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') markingGuideForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editMarkingGuideIndex: number;
  @Output() markingGuideUpdated = new EventEmitter<string>();

  constructor(private markingGuideService: MarkingGuideService,
              private courseService: CourseService) {
  }

  ngOnInit() {
    this.subscription = this.markingGuideService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMarkingGuideIndex = index;
          this.editMode = true;
          this.markingGuideForm.setValue({
            requirement: this.markingGuideService.selectedCriterion.requirement,
            description: this.markingGuideService.selectedCriterion.description,
            marks: this.markingGuideService.selectedCriterion.marks,
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCriterion = new Criterion(null, value.requirement, value.description, value.marks, null, null);
    if (this.editMode) {
      this.markingGuideService.updateSelectedCriterion(this.courseService.assessmentKey, this.markingGuideService.criterionKey, newCriterion);
      this.markingGuideUpdated.emit();
    } else {
      this.markingGuideService.insertCriteriaToAssessmentMarkingGuideTable(this.courseService.assessmentKey, newCriterion);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.markingGuideForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    if (confirm('Are you sure to delete this criterion?') == true) {
      this.markingGuideService.deleteSelectedCriterion(this.courseService.assessmentKey, this.markingGuideService.criterionKey);
      this.markingGuideUpdated.emit();
      this.onClear();
    }
  }
}
