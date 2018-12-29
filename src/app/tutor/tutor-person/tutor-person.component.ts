import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TutorService} from "../tutor.service";
import {Course} from "../../course/course.model";
import {CourseService} from "../../course/course.service";
import {User} from "../../shared/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-tutor-person',
  templateUrl: './tutor-person.component.html',
  styleUrls: ['./tutor-person.component.css']
})
export class TutorPersonComponent implements OnInit {
  tutor: User;
  id: number;
  courses: Course[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tutorService: TutorService,
              private courseService: CourseService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          console.log('Tutor index: ' + this.id);
          this.tutor = this.tutorService.selectedTutor;
          this.getCourseListFromTutorCourse();
          console.log(this.tutor);
        }
      );
  }

  onCourseUpdated() {
    this.getCourseListFromTutorCourse();
  }

  //TODO the terms and locations are showing keys instead of names of those
  getCourseListFromTutorCourse() {
    this.courses = [];
    this.tutorService.getCourseFromTutor(this.tutorService.tutorKey, this.authService.userKey, snap => {
      let course = snap.val();
      course.key = snap.key;
      this.courses.push(course);
      // console.log(this.courses);
    });
  }

  onEditTutor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteAssignedCourse(index: number, courseKey) {
    if (confirm('Are you sure to delete this course from this tutor ?') == true) {
      this.tutorService.deleteSelectedTutorCourse(courseKey);
      this.tutorService.deleteSelectedTutorFromCoursesTable(courseKey);
      this.courses.splice(index, 1);
    }
  }

  onDeleteTutor() {
    if (confirm('Are you sure to delete this tutor ?') == true) {
      this.tutorService.deleteSelectedTutor(this.tutor.key);
      this.tutorService.deleteSelectedTutorCourseWhenTutorIsGone(this.tutor.key);
      this.router.navigate(['/tutor']);
    }
  }

}
