import {Component, Input, OnInit} from '@angular/core';
import {TutorService} from "../../tutor.service";
import {User} from "../../../shared/user.model";
import { trigger, transition, animate, style, query, stagger, useAnimation } from '@angular/animations';
import { bounce,lightSpeedIn,fadeInLeft } from 'ng-animate';

@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.css']
})
export class TutorDetailComponent implements OnInit {
  @Input() tutor: User;
  @Input() index: number;

  constructor(private tutorService: TutorService) { }

  ngOnInit() {
    // console.log('In Detail page: ' + this.tutor);
    // console.log(this.tutor.key);
  }

  onEdit(tutor: User) {
    this.tutorService.selectedTutor = Object.assign({}, tutor);
    this.tutorService.tutorKey = this.tutor.key;
  //   console.log('Click on the person:');
  //   console.log(this.tutorService.selectedTutor);
  //   console.log(this.tutorService.tutorKey);
  }
}
