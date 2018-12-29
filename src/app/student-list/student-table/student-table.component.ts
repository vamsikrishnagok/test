import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../course/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentListService} from "../student-list.service";
import {AssessmentDetail} from "../../shared/assessment-detail.model";
import {Student} from "../../student/student.model";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  students = [];
  assessments: AssessmentDetail[] = [];
  assessmentName: string;
  courseId: string;
  courseName: string;

  constructor(private studentListService: StudentListService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getStudents();
    this.assessmentName = this.courseService.selectedAssessment.name;
    this.courseId = this.courseService.selectedCourse.id;
    this.courseName = this.courseService.selectedCourse.name;
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

    onMarkingAssessment(index: number, student: Student) {
    this.studentListService.selectedStudentId = student.key;
    this.studentListService.selectedStudent = student;
    this.studentListService.startedEditing.next(index);
    this.router.navigate(['mark-student'], {relativeTo: this.route});
  }
}
