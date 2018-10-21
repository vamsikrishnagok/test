import {Component, OnInit} from '@angular/core';
import {Course} from '../course.model';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CourseService} from "../course.service";
import {AssessmentDetail} from "../../shared/assessment-detail.model";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../shared/user.model";
import {CourseLocation} from "../../setting/course-location.model";
import {CourseTerm} from "../../setting/course-term.model";
import {isUndefined} from "util";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  course: Course;
  id: number;
  assessments: AssessmentDetail[] = [];
  lecturers: User[] = [];
  locations: CourseLocation [] = [];
  terms: CourseTerm [] = [];

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService //for html
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.course = this.courseService.selectedCourse;
          this.getLecturer();
          this.getLocation();
          this.getTerm();
          this.getAssessmentList();
        }
      );

  }

  getLocation() {
    this.courseService.getLocationName(this.course.location).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(locations => {
      this.locations = locations;
    });
  }

  getTerm() {
    this.courseService.getTermName(this.course.term).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(terms => {
      this.terms = terms;
    });
  }

  getLecturer() {
    if (this.course.lecturer) {
      this.courseService.getLecturerName(this.course.lecturer).snapshotChanges().map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }).subscribe(lecturers => {
        this.lecturers = lecturers;
      });
    }
    return false;
  }

  getAssessmentList() {
    this.assessments = [];
    this.courseService.getAssessmentsFromCourse(this.courseService.courseKey, snap => {
      let assessment = snap.val();
      assessment.key = snap.key;
      this.assessments.push(assessment);
      console.log(this.assessments);
    });
  }

  onAssessmentUpdated() {
    this.getAssessmentList();
  }

  onEditAssessment(index: number, assessment: AssessmentDetail) {
    this.courseService.assessmentKey = assessment.key;
    this.courseService.selectedAssessment = assessment;
    this.courseService.startedEditing.next(index);
  }

  onEditCourse() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCourse() {
    if (confirm('Are you sure to delete this course ?') == true) {
      this.courseService.deleteSelectedCourse(this.course.key);
      this.courseService.deleteSelectedCourseLecturer(this.course.key);
      this.courseService.deleteSelectedCourseAssessment(this.course.key);
      this.router.navigate(['/course']);
    }
  }

  public changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result;
        console.log(csv);
        let rows = csv.split('\r\n');
        // let rows = csv.split('/\r?\n|\r/');
        console.log('this is my array: ' + rows);

        rows.forEach(details => {
          //cut into pieces
          let student = details.split(',');
          let studentId = student[0];
          let firstName = student[1];
          let lastName = student[2];
          let email = student[3];

          if (!isUndefined(lastName)) {
            //todo Create person here because it will only take rows with last names and ignore the title
            if (!(lastName.toLowerCase() === 'last name'.toLowerCase())) {
              console.log(student);
              console.log(`id = ${studentId}, firstName = ${firstName}, lastName = ${lastName}, email = ${email}`);
              //insert students into student table, use student id as uid
              this.courseService.insertStudentToStudentTable(studentId, firstName, lastName, email);
              this.courseService.insertStudentToCourseStudentTable(this.course.key, studentId);
            }
          }
        });
      };
    }
  }
}
