import {Course} from './course.model';
import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AssessmentDetail} from "../shared/assessment-detail.model";
import {Subject} from "rxjs/Subject";
import * as firebase from "firebase";
import {User} from "../shared/user.model";
import {CourseLocation} from "../setting/course-location.model";
import {CourseTerm} from "../setting/course-term.model";

@Injectable()
export class CourseService {
  selectedCourse: Course = new Course(null, null, null, null, null, null, null, null,);
  selectedAssessment: AssessmentDetail = new AssessmentDetail(null, null, null);

  courseKey: string;
  assessmentKey: string;

  courseRef: AngularFireList<Course> = null;
  assessmentRef: AngularFireList<AssessmentDetail> = null;
  lecturerCoursesRef: AngularFireList<any> = null;
  tutorCoursesRef: AngularFireList<any> = null;
  courseLecturerRef: any;
  tutorCourseRef: any;
  lecturerRef: AngularFireList<any> = null;
  locationRef: AngularFireList<CourseLocation> = null;
  termRef: AngularFireList<CourseTerm> = null;

  private coursePath: string = '/courses';
  private assessmentPath: string = '/assessments';
  private courseLecturerPath: string = '/courseLecturer';
  private tutorCoursePath: string = '/tutorCourse';

  startedEditing = new Subject<number>();


  constructor(private db: AngularFireDatabase) {
    this.courseRef = db.list(this.coursePath);
    this.assessmentRef = db.list(this.assessmentPath);
    this.courseLecturerRef = db.list(this.courseLecturerPath);
    this.tutorCourseRef = db.list(this.tutorCoursePath);
  }

  //Getting the assessments in different courses
  getAssessmentsFromCourse(key, cb) {
    const rootRef = firebase.database().ref();
    const courseAssessmentRef = rootRef.child('courseAssessment');
    const assessmentsRef = rootRef.child('assessments');

    courseAssessmentRef.child(key).on('child_added', snap => {
      let assessmentRef = assessmentsRef.child(snap.key);
      assessmentRef.once('value', cb);
    });
  }

  getLocationName(locationKey): AngularFireList<CourseLocation>{
    this.locationRef = this.db.list('locations', ref=>
    ref.orderByKey().equalTo(locationKey));
    return this.locationRef;
  }

  //Get lecturer name when it is assigned
  getLecturerName(lecturerKey): AngularFireList<User> {
    this.lecturerRef = this.db.list('/users', ref =>
      ref.orderByKey().equalTo(lecturerKey));
    return this.lecturerRef;
  }

  getTermName(termKey): AngularFireList<CourseTerm> {
    this.termRef = this.db.list('terms', ref=>
      ref.orderByKey().equalTo(termKey));
    return this.termRef;
  }

  // Insert the lecturer in the courseLecturer table
  insertCourseToLecturerCourseTable(lecturerKey, courseKey) {
    firebase.database().ref('lecturerCourse/' + lecturerKey).update({
      [courseKey]: true
    })
  }

  //Insert the assessment in the courseAssessment table
  insertAssessmentToCourseAssessmentTable(courseKey, assessmentKey) {
    firebase.database().ref('courseAssessment/' + courseKey).update({
      [assessmentKey]: true
    })
  }

  insertTutorToCoursesTable(courseKey, tutorKey) {
    firebase.database().ref('courses/' + courseKey + '/tutor').update({
      [tutorKey]: true
    })  }

  //Getting all the courses for admin
  getCoursesForAdmin(): AngularFireList<Course> {
    return this.courseRef;
  }

  getCoursesForLecturer(lecturerKey): AngularFireList<Course> {
    this.lecturerCoursesRef = this.db.list('/courses', ref =>
      ref.orderByChild('lecturer').equalTo(lecturerKey));
    return this.lecturerCoursesRef;
  }

  getCoursesForTutor(tutorKey): AngularFireList<Course> {
     this.tutorCoursesRef = this.db.list('/courses', ref =>
      ref.orderByChild('tutor/' + tutorKey).equalTo(true));
    return this.tutorCoursesRef;
  }

  //Creating a new course and send to Firebase
  createCourse(course: Course): void {
    this.courseRef.push(course);
  }

  //Update Selected Course
  updateSelectedCourse(key: string, value: any): void {
    this.courseRef.update(key, value).catch(error => this.handleError(error));
  }

  //Delete Selected Course
  deleteSelectedCourse(key: string) {
    this.courseRef.remove(key);
  }

  deleteSelectedCourseLecturer(key: string) {
    this.db.list('courseLecturer').remove(key);
  }

  deleteSelectedCourseAssessment(key: string) {
    this.db.list('courseAssessment').remove(key);
  }

  //Getting all the assessments
  //Redundant as there's no need to show all the assessments
  // getAssessments(): AngularFireList<AssessmentDetail> {
  //   return this.assessmentRef;
  // }

  //Creating a new assessment and send to Firebase
  createAssessment(assessment: AssessmentDetail): void {
    // this.assessmentRef.push(assessment);
    this.assessmentKey = this.assessmentRef.push(assessment).key;
  }

  //Update Selected Assessment
  updateSelectedAssessment(key: string, value: any): void {
    this.assessmentRef.update(key, value).catch(error => this.handleError(error));
  }

  //Delete Selected Assessment
  deleteSelectedAssessment(key: string) {
    this.assessmentRef.remove(key);
    this.db.list('courseAssessment/' + this.courseKey).remove(key);
  }

  //insert student to general student list
  insertStudentToStudentTable(studentId, firstName, lastName, email) {
    firebase.database().ref('students/').child(studentId).set({
      firstName: firstName,
      lastName: lastName,
      email : email
    });
  }

  //insert student into the specific course
  insertStudentToCourseStudentTable(courseId, studentId) {
    firebase.database().ref('courseStudent/').child(courseId).update({
      [studentId]: true
      }
    );
  }

  private handleError(error) {
    console.log(error);
  }
}
