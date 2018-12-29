import { Component, OnInit } from '@angular/core';
import {CourseLocation} from "../course-location.model";
import {SettingsService} from "../settings.service";

@Component({
  selector: 'app-course-locations',
  templateUrl: './course-locations.component.html',
  styleUrls: ['./course-locations.component.css']
})
export class CourseLocationsComponent implements OnInit {
  locations: CourseLocation[] = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
   this.getLocationList();
  }

  onLocationUpdated() {
    this.getLocationList();
  }

  getLocationList() {
    // Use snapshotChanges().map() to store the key
    this.settingsService.getAllLocations().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(locations => {
      this.locations = locations;
    });
  }

  onEditLocation(index: number, location: CourseLocation) {
    this.settingsService.locationKey = location.key;
    this.settingsService.selectedLocation = location;
    this.settingsService.startedEditingLocation.next(index);
  }
}
