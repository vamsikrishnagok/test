import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CourseService} from "../course.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../setting/settings.service";
import {CourseLocation} from "../../setting/course-location.model";
import {CourseTerm} from "../../setting/course-term.model";
import {Course} from "../course.model";
import {User} from "../../shared/user.model";
import {LecturerService} from "../../lecturer/lecturer.service";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  id: number;
  editMode = false;
  courseForm: FormGroup;
  courseKey: string;
  locations: CourseLocation[] = [];
  terms: CourseTerm[] = [];
  locationFormArray: Array<any> = [];
  courseBeingCreated: Course;
  lecturers: User[] = [];

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private router: Router,
              private settingsService: SettingsService,
              private lecturerService: LecturerService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.courseKey = this.courseService.selectedCourse.key;
          this.getTermList();
          this.getLocationList();
          this.getLecturerList();
          console.log('Course Key in Edit page: ' + this.courseKey);
          this.editMode = this.courseKey != null;
          this.initForm();
        }
      );
  }

  getLocationList() {
    // Use snapshotChanges().map() to store the key
    this.settingsService.getActiveCourseLocation().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(locations => {
      this.locations = locations;
    });
  }

  getTermList() {
    // Use snapshotChanges().map() to store the key
    this.settingsService.getActiveCourseTerm().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(terms => {
      this.terms = terms;
    });
  }

  //For assigning the course to one lecturer
  getLecturerList() {
    this.lecturerService.getLecturers().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(lecturer => {
      this.lecturers = lecturer;
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.courseService.updateSelectedCourse(this.courseKey, this.courseForm.value);
      //Putting the assigned lecturer key into a join table
      this.courseService.insertCourseToLecturerCourseTable(this.courseForm.get('lecturer').value, this.courseKey);
      //TODO better to jump back to current page with new data
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      //Loop through all the locations selected by admin and create one by one
      for (let location of this.locationFormArray) {
        this.courseBeingCreated = new Course(
          null,
          this.courseForm.get('id').value,
          this.courseForm.get('name').value,
          this.courseForm.get('term').value,
          location,
          null,
          null,
          null);
        this.courseService.createCourse(this.courseBeingCreated);
      }
      this.onCancel();
    }
  }

  private initForm() {
    let courseId = '';
    let courseName = '';
    let term = '';
    let location = '';
    let lecturer = '';
    // let courseAssessment = new FormArray([]);

    if (this.editMode) {
      const course = this.courseService.selectedCourse;
      courseId = course.id;
      courseName = course.name;
      location = course.location;
      lecturer = course.lecturer;
      term = course.term;

      // In case assessment array is empty
      // if (course['assessments']) {
      //   for (let assessment of course.assessments) {
      //     this.courseAssessment.push(
      //       new FormGroup({
      //         'name': new FormControl(assessment.name, Validators.required)
      //       })
      //     );
      //   }
      // }
    }

    //Course Form validation
    this.courseForm = new FormGroup({
      'id': new FormControl(courseId, Validators.required),
      'name': new FormControl(courseName, Validators.required),
      'location': new FormControl(location, Validators.required),
      'term': new FormControl(term, Validators.required),
      'lecturer': new FormControl(lecturer),
      // 'assessments': courseAssessment
    });
  }

  //To check if the checkbox has been check.
  //Put the checked locations in the array
  onChange(location: string, isChecked: boolean) {
    if (isChecked) {
      this.locationFormArray.push(location);
    } else {
      let index = this.locationFormArray.indexOf(location);
      this.locationFormArray.splice(index, 1);
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
