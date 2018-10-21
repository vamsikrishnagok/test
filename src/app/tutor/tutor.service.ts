import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {User} from "../shared/user.model";
import * as firebase from "firebase";

@Injectable()
export class TutorService {
  selectedTutor: User = new User(null, null, null, null, null, null);
  tutorKey: string;

  private basePath: string = '/users';
  tutorRef: AngularFireList<User> = null;


  constructor(private db: AngularFireDatabase) {
    this.tutorRef = db.list(this.basePath, ref =>
      ref.orderByChild('role').equalTo('tutor'));
  }


  //Getting the courses for different tutors
  //TODO the assessments should be only for this lecturer accessible
  getCourseFromTutor(tutorKey, lecturerKey, cb) {
    const rootRef = firebase.database().ref();
    const tutorCourseRef = rootRef.child('/tutorCourse');
    const coursesRef = rootRef.child('/courses');
    const lecturerCourseRef = rootRef.child('/lecturerCourse');

    tutorCourseRef.child(tutorKey).on('child_added', course => {
      let tutorCoursesRef = coursesRef.child(course.key);
      // let tutorCoursesRef = coursesRef.orderByChild(course.key + '/lecturer').equalTo(lecturerKey);
      // let courseRef = tutorCoursesRef.orderByChild('lecturer').equalTo(lecturerKey);
      tutorCoursesRef.once('value', cb);

    });


    // lecturerCourseRef.child(lecturerKey).on('child_added', course => {
    //   let courseRef = coursesRef.orderByChild(course.key + '/tutor/' + tutorKey).equalTo(true);
    //   courseRef.once('value', cb);
    // })
  }

  //Getting all tutors
  getTutors(): AngularFireList<User> {
    return this.tutorRef;
  }

  //Creating a new tutor and send to Firebase
  createTutor(tutor: User): void {
    this.tutorRef.push(tutor);
  }

  //Update Selected Tutor
  updateSelectedTutor(key: string, value: any): void {
    this.tutorRef.update(key, value).catch(error => this.handleError(error));
  }

  //Delete Selected Tutor
  deleteSelectedTutor(key: string) {
    this.tutorRef.remove(key);
  }

  //Insert the course in the tutorCourse table
  insertCourseToTutorCourseTable(tutorKey, courseKey) {
    firebase.database().ref('tutorCourse/' + tutorKey).update({
      [courseKey]: true
    })
  }

  deleteSelectedTutorCourseWhenTutorIsGone(key: string) {
    this.db.list('tutorCourse').remove(key);
  }

  deleteSelectedTutorCourse(key: string) {
    this.db.list('tutorCourse/' + this.tutorKey).remove(key);
  }

  deleteSelectedTutorFromCoursesTable(courseKey) {
    this.db.list('courses/' + courseKey + '/tutor').remove(this.tutorKey);
  }

  private handleError(error) {
    console.log(error);
  }
}

