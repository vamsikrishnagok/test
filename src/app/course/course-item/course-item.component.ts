import {Component, OnInit} from '@angular/core';
import {Course} from '../course.model';
import {CourseService} from '../course.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import { trigger, transition, animate, style, query, stagger, useAnimation } from '@angular/animations';
import { bounce,lightSpeedIn,fadeInLeft } from 'ng-animate';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  animations: [
    trigger('lightSpeedIn', [transition('* => *', useAnimation(lightSpeedIn))]),
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))])
  ],
})
export class CourseItemComponent implements OnInit {
  courses: Course[];
  lightSpeedIn: any;
  fadeInLeft: any;
  // userRole: string;

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.userRole === 'admin') {
      console.log('It is admin');
      this.getCourseListForAdmin();
    } else if (this.authService.userRole === 'lecturer') {
      console.log('It is lecturer');
      this.getCourseListForLecturer();
    } else if (this.authService.userRole === 'tutor'){
      console.log('It is tutor');
      this.getCourseListForTutor();
    }
  }

  getCourseListForAdmin() {
    //Working for admin
    this.courseService.getCoursesForAdmin().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(courses => {
      this.courses = courses;
    });
  }

  getCourseListForLecturer() {
    this.courseService.getCoursesForLecturer(this.authService.userKey).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(courses => {
      this.courses = courses;
    });
  }

  getCourseListForTutor() {
    this.courseService.getCoursesForTutor(this.authService.userKey).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(courses => {
      this.courses = courses;
    });
  }

  onNewCourse() {
    this.courseService.selectedCourse = new Course(null, null, null, null, null, null, null, null,);
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
