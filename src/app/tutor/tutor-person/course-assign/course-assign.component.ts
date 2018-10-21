import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Course} from "../../../course/course.model";
import {CourseService} from "../../../course/course.service";
import {TutorService} from "../../tutor.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-course-assign',
  templateUrl: './course-assign.component.html',
  styleUrls: ['./course-assign.component.css']
})
export class CourseAssignComponent implements OnInit {
  courses: Course[] = [];
  @ViewChild('f') courseAssignForm: NgForm;
  @Output() courseUpdated = new EventEmitter<string>();
  course: Course;

  constructor(private courseService: CourseService,
              private tutorService: TutorService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getCourseList();
  }

  //Get all courses for lecturer only for drop down list
  getCourseList() {
    this.courseService.getCoursesForLecturer(this.authService.userKey).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(courses => {
      this.courses = courses;
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const assignedCourseKey = value.course;
    this.courseAssignForm.reset();
    // Add the course to tutor
    this.tutorService.insertCourseToTutorCourseTable(this.tutorService.tutorKey, assignedCourseKey);
    this.courseService.insertTutorToCoursesTable(assignedCourseKey, this.tutorService.tutorKey);
    this.courseUpdated.emit();
  }

}
