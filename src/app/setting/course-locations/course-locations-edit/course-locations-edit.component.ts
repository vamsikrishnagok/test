import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SettingsService} from "../../settings.service";
import {CourseLocation} from "../../course-location.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-course-locations-edit',
  templateUrl: './course-locations-edit.component.html',
  styleUrls: ['./course-locations-edit.component.css']
})
export class CourseLocationsEditComponent implements OnInit, OnDestroy {
  editMode = false;
  @Output() locationUpdated = new EventEmitter<string>();
  @ViewChild('f') courseLocationsForm: NgForm;
  subscription: Subscription;
  editedLocationIndex: number;
  location: CourseLocation;
  isActive: boolean;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.subscription = this.settingsService.startedEditingLocation
      .subscribe(
        (index: number) => {
          this.editedLocationIndex = index;
          this.location = this.settingsService.selectedLocation;
          this.isActive = this.settingsService.selectedLocation.isActive;
          this.editMode = true;
          this.courseLocationsForm.setValue({
            location: this.settingsService.selectedLocation.location,
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCourseLocation = new CourseLocation(null, value.location, true);
    if (this.editMode) {
      this.settingsService.updateSelectedLocation(this.settingsService.locationKey, value.location);
      this.locationUpdated.emit();
    } else {
      this.settingsService.createCourseLocation(newCourseLocation);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.courseLocationsForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChangeStatus() {
    this.settingsService.changeLocationStatus(this.settingsService.locationKey, !this.location.isActive);
    this.isActive = !this.isActive;
    this.onClear();
  }

}
