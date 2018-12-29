import {Injectable} from "@angular/core";
// import {Subject} from "rxjs/Subject";
// import {Student} from "../student/student.model";
import * as firebase from "firebase";
// import {CourseService} from "../course/course.service";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Student} from "../student/student.model";
import {Subject} from "rxjs";
import {Criterion} from "../marking-guide/criterion.model";
// import {Criterion} from "./criterion.model";
// import {Subject} from "rxjs/Subject";

@Injectable()
export class StudentListService {
  selectedStudent: Student = new Student(null, null, null, null);
  selectedStudentId: string;

  startedEditing = new Subject<number>();

  rootRef = firebase.database().ref();
  courseStudentRef = this.rootRef.child('courseStudent');
  studentsRef = this.rootRef.child('students');

  constructor(private db: AngularFireDatabase) {
    // this.markingGuideRef = db.list(this.basePath);
  }

  getStudentsFromCourse(key, cb) {
    this.courseStudentRef.child(key).on('child_added', snap => {
      let studentRef = this.studentsRef.child(snap.key);
      studentRef.once('value', cb);
    });
  }

  getMarkingGuideForThisAssessment(assessmentKey): AngularFireList<Criterion> {
    return this.db.list('assessments/' + assessmentKey + '/markingGuide');
  }

  saveMarksForEachAssessment(studentKey, assessmentKey, criterionkey, givenMarks, givenComment) {
    return this.db.list('studentAssessment/' + studentKey + '/' + assessmentKey+ '/' + criterionkey).push({
      givenName: givenMarks,
      givenComment: givenComment
    });
  }


  private handleError(error) {
    console.log(error);
  }
}
