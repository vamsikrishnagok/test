import {Component, OnInit} from '@angular/core';
import {Student} from "./student.model";

import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {StudentService} from "./student.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[];

  private basePath: string = '/students';
  studentRef: AngularFireList<Student> = null;

  constructor(private db: AngularFireDatabase,
              private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) {
    this.studentRef = db.list(this.basePath);
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    // Use snapshotChanges().map() to store the key
    this.studentService.getStudents().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(students => {
      this.students = students;
    });
  }

  onCreateStudent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
