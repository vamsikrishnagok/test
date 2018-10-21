import {Component, OnInit} from '@angular/core';
import {AssessmentDetail} from "../shared/assessment-detail.model";
import {CourseService} from "../course/course.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Criterion} from "./criterion.model";
import {MarkingGuideService} from "./marking-guide.service";
import {Location} from "@angular/common";
import {AuthService} from "../auth/auth.service";
import {NgForm} from "@angular/forms";
import {Course} from "../course/course.model";

@Component({
  selector: 'app-marking-guide',
  templateUrl: './marking-guide.component.html',
  styleUrls: ['./marking-guide.component.css']
})
export class MarkingGuideComponent implements OnInit {
  criteria: Criterion[] = [];
  id: number;
  assessment: AssessmentDetail;
  course: Course;
  assessments: AssessmentDetail[] = [];
  courses: Course [] = [];

  constructor(private markingGuideService: MarkingGuideService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private location: Location,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.assessment = this.courseService.selectedAssessment;
          this.course = this.courseService.selectedCourse;
          this.getMarkingGuide(this.assessment.key);
          this.getAssessmentsForThisLecturer();
          console.log('Assessment Key: ' + this.assessment.key);
        }
      );
  }

  getAssessmentsForThisLecturer() {
    this.assessments = [];
    this.markingGuideService.getAssessmentsForMarkingGuide(this.authService.userKey, snap => {
        let assessment = snap.val();
        assessment.key = snap.key;
        this.assessments.push(assessment);
        console.log('Assigned assessments : ' + this.assessments);
    });
  }

  //TODO get marking guide and insert to another assessment
  onSubmit(form: NgForm) {
    // const value = form.value;
    // const newMarkingGuide = new MarkingGuide(this.criteria);
    // this.markingGuideService.insertMarkingGuideToNewAssessment(this.assessmentKey, newMarkingGuide);
  }


  onEditCriterion(index: number, criterion: Criterion) {
    this.markingGuideService.criterionKey = criterion.key;
    this.markingGuideService.selectedCriterion = criterion;
    this.markingGuideService.startedEditing.next(index);
  }

  getMarkingGuide(assessmentKey) {
    this.markingGuideService.getMarkingGuideFromAssessment(assessmentKey).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(criteria => {
      this.criteria = criteria;
      console.log('Criteria:' + this.criteria);
    });
  }

  onMarkingGuideUpdate() {
    this.getMarkingGuide(this.assessment.key);
  }

  onBack() {
    this.location.back();
  }
}
