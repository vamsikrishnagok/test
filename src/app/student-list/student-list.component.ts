import { Component, OnInit } from '@angular/core';
// import {Student} from "../student/student.model";
// import {Subscription} from "rxjs/Subscription";
import {StudentListService} from "./student-list.service";
import {CourseService} from "../course/course.service";
import {AssessmentDetail} from "../shared/assessment-detail.model";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  // students: Student[];
  // private subscription: Subscription;
  students = [];
  assessments: AssessmentDetail[] = [];
  assessmentName: string;
  courseId: string;
  courseName: string;
  createMarkingGuide = false;

  constructor(private studentListService: StudentListService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.getStudents();
    this.assessmentName = this.courseService.selectedAssessment.name;
    this.courseId = this.courseService.selectedCourse.id;
    this.courseName = this.courseService.selectedCourse.name;
    // this.students = this.studentService.getStudents();
    // this.subscription = this.studentService.studentsChanged
    //   .subscribe(
    //     (students: Student[]) => {
    //       this.students = students;
    //     }
    //   );
  }

  getStudents() {
    this.students = [];
    this.studentListService.getStudentsFromCourse(this.courseService.courseKey, snap => {
      let student = snap.val();
      student.key = snap.key;
      this.students.push(student);
      console.log(this.students);
    });
  }

  // onCreateMarkingGuide() {
  //   this.createMarkingGuide = true;
  //   this.router.navigate(['marking-guide'], {relativeTo: this.route});
  // }

  onBack() {
    this.createMarkingGuide = false;
    this.location.back();
  }
}
