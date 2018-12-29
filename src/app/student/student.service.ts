import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Student} from "./student.model";

@Injectable()
export class StudentService {


  private basePath: string = '/students';
  studentRef: AngularFireList<Student> = null;

  constructor(private db: AngularFireDatabase) {
    this.studentRef = db.list(this.basePath);
  }

  getStudents(): AngularFireList<Student> {
    return this.studentRef;
  }

  //Creating a new student and send to Firebase
  createStudent(student: Student): void {
    this.studentRef.push(student);
  }
}
