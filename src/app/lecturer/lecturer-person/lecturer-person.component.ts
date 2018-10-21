import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user.model";
import {Course} from "../../course/course.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CourseService} from "../../course/course.service";
import {LecturerService} from "../lecturer.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-lecturer-person',
  templateUrl: './lecturer-person.component.html',
  styleUrls: ['./lecturer-person.component.css']
})
export class LecturerPersonComponent implements OnInit {
  lecturer: User;
  id: number;
  courses: Course[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService,
              private lecturerService: LecturerService,
              private authService: AuthService //for html
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          console.log('Lecturer index: ' + this.id);
          this.getCoursesForLecturer();
          this.lecturer = this.lecturerService.selectedLecturer;
          console.log(this.lecturer);
        }
      );
  }

  getCoursesForLecturer() {
    this.courseService.getCoursesForLecturer(this.lecturerService.lecturerKey).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(courses => {
      this.courses = courses;
    });
  }

  onDeleteAssignedCourseForLecturer(index: number, courseKey) {
    if (confirm('Are you sure to delete this course from this lecturer ?') == true) {
      this.lecturerService.deleteSelectedLecturerCourse(courseKey);
      this.lecturerService.deleteSelectedLecturerFromCoursesTable(courseKey);
      this.courses.splice(index,1);
    }
  }

  onEditLecturer() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteLecturer() {
    if (confirm('Are you sure to delete this lecturer ?') == true) {
      this.lecturerService.deleteSelectedLecturer(this.lecturer.key);
      this.router.navigate(['/lecturer']);
    }
  }



}
