import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../course.model';
import {CourseService} from "../../course.service";
import {CourseLocation} from "../../../setting/course-location.model";
import {CourseTerm} from "../../../setting/course-term.model";
import {bounce, fadeInLeft, lightSpeedIn} from 'ng-animate';
import {transition, trigger, useAnimation} from '@angular/animations';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  animations: [
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))])
  ],
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  @Input() index: number;
  locations: CourseLocation [] = [];
  terms: CourseTerm [] = [];
  fadeInLeft: any;

  constructor(private courseService: CourseService) {
  }

  ngOnInit() {
    this.getLocation();
    this.getTerm();
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

  //Get details when the course is selected
  onDetails(course: Course) {
    this.courseService.selectedCourse = Object.assign({}, course);
    this.courseService.courseKey = this.course.key;
  }
}
