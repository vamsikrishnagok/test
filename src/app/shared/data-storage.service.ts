import {Injectable} from "@angular/core";
import {CourseService} from "../course/course.service";
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StudentListService} from "../student-list/student-list.service";

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private courseService: CourseService,
              private authService: AuthService,
              private studentService: StudentListService) {
  }

  // storeCourses() {
  //   const token = this.authService.getToken();
  //   return this.httpClient.put('https://assessment-marking-tool.firebaseio.com/courses.json',
  //     this.courseService.getCourses(), {
  //       observe: 'events',
  //       params: new HttpParams().set('auth', token)
  //     });
  // }

  // storeStudents() {
  //   const token = this.authService.getToken();
  //   return this.httpClient.put('https://assessment-marking-tool.firebaseio.com/students.json',
  //     this.studentService.getStudents(), {
  //       observe: 'events',
  //       params: new HttpParams().set('auth', token)
  //     });
  // }
}
