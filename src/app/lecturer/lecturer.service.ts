import {Injectable} from "@angular/core";
import {User} from "../shared/user.model";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

@Injectable()
export class LecturerService {
  selectedLecturer: User = new User(null, null, null, null, null, null);
  lecturerKey: string;

  private basePath: string = '/users';
  lecturerRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.lecturerRef = db.list(this.basePath, ref =>
      ref.orderByChild('role').equalTo('lecturer'));
  }

  getLecturers(): AngularFireList<User> {
    return this.lecturerRef;
  }

  //Creating a new lecturer and send to Firebase
  createLecturer(lecturer: User): void {
    this.lecturerRef.push(lecturer);
  }

  //Update Selected lecturer
  updateSelectedLecturer(key: string, value: any): void {
    this.lecturerRef.update(key, value).catch(error => this.handleError(error));
  }

  //Delete Selected lecturer
  deleteSelectedLecturer(key : string){
    this.lecturerRef.remove(key);
  }

  deleteSelectedLecturerCourse(key: string) {
    this.db.list('lecturerCourse/' + this.lecturerKey).remove(key);
  }

  deleteSelectedLecturerFromCoursesTable(courseKey) {
    this.db.list('courses/' + courseKey ).remove('lecturer');
  }

  private handleError(error) {
    console.log(error);
  }
}
