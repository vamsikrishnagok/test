import * as firebase from "firebase";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {CourseService} from "../course/course.service";

@Injectable()
export class AuthService {
  token: string;
  email = '';
  userRole: string;
  userKey: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.getRole();
          this.getToken();
          // this.router.navigate(['/course']);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  //Grab the user role with login email with nosql query
  getRole() {
    console.log("Email = " + this.email);
    const rootRef = firebase.database().ref();
    rootRef.child('users').orderByChild('email').equalTo(this.email).once(
      'child_added').then(
      snap => {
        this.userRole = snap.val().role;
        this.userKey = snap.key;
        console.log("User role is " + this.userRole);
        console.log("User key is " + this.userKey);
        this.router.navigate(['/course']);
      });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  isTutor() {
    return this.userRole == 'tutor';
  }

  isLecturer() {
    return this.userRole == 'lecturer';
  }

  isAdmin() {
    return this.userRole == 'admin';
  }

  logout() {
    firebase.auth().signOut();
    //Clear user role and token once log out, then redirect to login page
    this.userRole = null;
    this.token = null;
    this.router.navigate(['/'], {relativeTo: this.route});
  }
}
