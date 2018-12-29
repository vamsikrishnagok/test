import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LecturerService} from "../lecturer.service";
import {User} from "../../shared/user.model";
import { trigger, transition, animate, style, query, stagger, useAnimation } from '@angular/animations';
import { bounce,lightSpeedIn,fadeInLeft } from 'ng-animate';

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css'],
  animations: [
    trigger('lightSpeedIn', [transition('* => *', useAnimation(lightSpeedIn))]),
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))])
  ],

})
export class LecturerListComponent implements OnInit {
  lecturers: any;
  lightSpeedIn: any;
  fadeInLeft: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private lecturerService: LecturerService) { }

  ngOnInit() {
    this.getLecturerList();
  }

  getLecturerList() {
    // Use snapshotChanges().map() to store the key
    this.lecturerService.getLecturers().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(lecturers => {
      this.lecturers = lecturers;
    });
  }

  onAddLecturer() {
    this.lecturerService.selectedLecturer = new User(null, null, null, null, null, null);
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
