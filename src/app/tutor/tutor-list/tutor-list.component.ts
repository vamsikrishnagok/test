import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TutorService} from "../tutor.service";
import 'rxjs/Rx';
import {User} from "../../shared/user.model";
import { trigger, transition, animate, style, query, stagger, useAnimation } from '@angular/animations';
import { bounce,lightSpeedIn,fadeInLeft } from 'ng-animate';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css'],
  animations: [
    trigger('lightSpeedIn', [transition('* => *', useAnimation(lightSpeedIn))]),
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))])
  ],
})
export class TutorListComponent implements OnInit {
  tutors: any;
  lightSpeedIn: any;
  fadeInLeft: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tutorService: TutorService) { }

  ngOnInit() {
    this.getTutorList();
  }


  getTutorList() {
    // Use snapshotChanges().map() to store the key
    this.tutorService.getTutors().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(tutors => {
      this.tutors = tutors;
    });
  }

  onAddTutor() {
    this.tutorService.selectedTutor = new User(null, null, null, null, null, null);
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
