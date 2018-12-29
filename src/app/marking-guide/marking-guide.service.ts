import {Injectable} from "@angular/core";
import * as firebase from "firebase";
import {Subject} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Criterion} from "./criterion.model";


@Injectable()
export class MarkingGuideService {
  criterionKey: string;
  selectedCriterion: Criterion = new Criterion(null, null, null,null, null, null);

  startedEditing = new Subject<number>();

  markingGuideRef: AngularFireList<Criterion> = null;
  lecturerCoursesRef: AngularFireList<any> = null;


  constructor(private db: AngularFireDatabase) {
  }

  getMarkingGuideFromAssessment(assessmentKey): AngularFireList<Criterion> {
    // return this.markingGuideRef;
    return this.db.list('/assessments/' + assessmentKey + '/markingGuide');
  }

  insertCriteriaToAssessmentMarkingGuideTable(assessmentKey, criteria: Criterion) {
    firebase.database().ref('assessments/' + assessmentKey + '/markingGuide/').push(criteria);
  }

  deleteSelectedCriterion(assessmentKey, key: string) {
    this.db.list('/assessments/' + assessmentKey + '/markingGuide').remove(key);
    // this.markingGuideRef.remove(key);
  }

  updateSelectedCriterion(assessmentKey, key: string, value: any): void {
    this.db.list('/assessments/' + assessmentKey + '/markingGuide').update(key, value).catch(error => this.handleError(error));
  }

  // Getting the assessments in different courses, show assessment name
  getAssessmentsForMarkingGuide(lecturerKey, cb) {
    const rootRef = firebase.database().ref();
    const lecturerCourseRef = rootRef.child('lecturerCourse');
    // const coursesRef = rootRef.child('courses');
    const courseAssessmentRef = rootRef.child('courseAssessment');
    const assessmentsRef = rootRef.child('assessments');

    lecturerCourseRef.child(lecturerKey).on('child_added', snap => {
      // let assignedCourseRef = coursesRef.child(snap.key);
      // assignedCourseRef.once('value');
      courseAssessmentRef.child(snap.key).on('child_added', snap => {
        let assessmentRef = assessmentsRef.child(snap.key);
        // let assignedCourseRef = assessmentRef.parent;
        assessmentRef.once('value', cb);
        // assessmentRef.once('value', cb);
      });
    });
  }


  //For import function
  insertMarkingGuideToNewAssessment (assessmentKey, markingGuide) {
    this.db.list('/assessments/' + assessmentKey + '/markingGuide').push(markingGuide);
  }

  private handleError(error) {
    console.log(error);
  }
}
