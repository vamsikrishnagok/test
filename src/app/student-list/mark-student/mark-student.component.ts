import {Component, OnInit} from '@angular/core';
import {StudentListService} from "../student-list.service";
import {CourseService} from "../../course/course.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Criterion} from "../../marking-guide/criterion.model";
import {AssessmentDetail} from "../../shared/assessment-detail.model";
import {Student} from "../../student/student.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-mark-student',
  templateUrl: './mark-student.component.html',
  styleUrls: ['./mark-student.component.css']
})
export class MarkStudentComponent implements OnInit {
  id: number;
  criteria: Criterion [] = [];
  criterion: Criterion;
  assessments: AssessmentDetail [] = [];
  assessment: AssessmentDetail;
  student: Student;
  editMode = false;

  constructor(private studentListService: StudentListService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.getMarkingGuideForAssessment();
          this.student = this.studentListService.selectedStudent;
        }
      );
  }

  getMarkingGuideForAssessment() {
    this.studentListService.getMarkingGuideForThisAssessment(this.courseService.assessmentKey).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(criteria => {
      this.criteria = criteria;
    });
  }

  //todo get the correct value and save for each criterion
  onSubmit(form: NgForm) {
    // const value = form.value;
    // const newMarkedCriteria = new Criterion(null, null,null,null, value.givenMarks, value.givenComment);
    if (this.editMode) {
      // this.markingGuideService.updateSelectedCriterion(this.courseService.assessmentKey, this.markingGuideService.criterionKey, newCriterion);
      // this.markingGuideUpdated.emit();
    } else {
      this.criteria.forEach(value => {
        this.studentListService.saveMarksForEachAssessment(this.student.key, this.assessment.key, value.key, value.givenMarks, value.givenComment);
      })
    }
    this.editMode = false;
    form.reset();
  }

}
