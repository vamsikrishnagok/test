import {Component, OnInit} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
  title = 'Assessment Marking Tool';

  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyD6LEXz9Z1A9Ak9P5FWu8eVsT3l_Qrs8yw",
    //   authDomain: "assessment-marking-tool.firebaseapp.com"
    // });
  }

  loadedFeature = 'course';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
