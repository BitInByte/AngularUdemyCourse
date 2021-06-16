import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // Telling Angular that we will expect an event from the outside
  // as prop.
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string) {
  // this.featureSelected.emit(feature);
  // }
  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
