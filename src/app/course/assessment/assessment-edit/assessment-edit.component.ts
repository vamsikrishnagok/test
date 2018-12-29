import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CourseService} from "../../course.service";
import {AssessmentDetail} from "../../../shared/assessment-detail.model";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {bounce, fadeInLeft, lightSpeedIn} from 'ng-animate';
import {transition, trigger, useAnimation} from '@angular/animations';

@Component({
  selector: 'app-assessment-edit',
  templateUrl: './assessment-edit.component.html',
  styleUrls: ['./assessment-edit.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))])
  ],
})
export class AssessmentEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') assessmentForm: NgForm;
  editMode = false;
  editedAssessmentIndex: number;
  subscription: Subscription;
  bounce: any;
  @Output() assessmentUpdated = new EventEmitter<string>();

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService //for HTML
  ) {
  }

  ngOnInit() {
    this.subscription = this.courseService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedAssessmentIndex = index;
          this.editMode = true;
          this.assessmentForm.setValue({
            name: this.courseService.selectedAssessment.name,
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAssessment = new AssessmentDetail(null, value.name, null);
    if (this.editMode) {
      this.courseService.updateSelectedAssessment(this.courseService.assessmentKey, newAssessment);
      this.assessmentUpdated.emit();
    } else {
      this.courseService.createAssessment(newAssessment);
      //Insert assessment into specific course
      this.courseService.insertAssessmentToCourseAssessmentTable(this.courseService.courseKey,this.courseService.assessmentKey);
      // this.router.navigate(['../'], {relativeTo: this.route});
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.assessmentForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    if (confirm('Are you sure to delete this assessment?') == true) {
      this.courseService.deleteSelectedAssessment(this.courseService.assessmentKey);
      this.assessmentUpdated.emit();
      this.onClear();
    }
  }

  onStudentList() {
    this.router.navigate(['student-list']);
  }

  onMarkingGuide() {
    this.router.navigate(['marking-guide']);
  }
}
