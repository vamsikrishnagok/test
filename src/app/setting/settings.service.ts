import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {CourseLocation} from "./course-location.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {CourseTerm} from "./course-term.model";
import * as firebase from "firebase";

@Injectable()
export class SettingsService {
  private locationPath: string = '/locations';
  private termPath: string = '/terms';

  locationRef: AngularFireList<CourseLocation> = null;
  termRef: AngularFireList<CourseTerm> = null;

  selectedLocation: CourseLocation = new CourseLocation(null, null, null);
  selectedTerm: CourseTerm = new CourseTerm(null, null, null);

  locationKey: string;
  termKey: string;

  startedEditingLocation = new Subject<number>();
  startedEditingTerm = new Subject<number>();

  constructor(private db: AngularFireDatabase) {
    this.locationRef = db.list(this.locationPath);
    this.termRef = db.list(this.termPath);
  }

  getActiveCourseLocation(): AngularFireList<CourseLocation> {
    return this.db.list('locations', ref => ref.orderByChild('isActive').equalTo(true));
  }

  getActiveCourseTerm(): AngularFireList<CourseTerm> {
    return this.db.list('terms', ref => ref.orderByChild('isActive').equalTo(true));
  }

  getAllLocations(): AngularFireList<CourseLocation> {
    return this.locationRef;
  }

  getAllCourseTerms(): AngularFireList<CourseTerm> {
    return this.termRef;
  }

  createCourseLocation(courseLocation: CourseLocation): void {
    this.locationRef.push(courseLocation);
  }

  createCourseTerm(courseTerm: CourseTerm): void {
    this.termRef.push(courseTerm);
  }

  updateSelectedLocation(key: string, value: any): void {
    this.locationRef.update(key, value).catch(error => this.handleError(error));
  }

  updateSelectedTerm(key: string, value: any): void {
    this.termRef.update(key, value).catch(error => this.handleError(error));
  }

  changeLocationStatus(locationKey, isActive) {
    firebase.database().ref('locations/' + locationKey).update({isActive})
  }

  changeTermStatus(termKey, isActive) {
    firebase.database().ref('terms/' + termKey).update({isActive})
  }

  private handleError(error) {
    console.log(error);
  }

}
