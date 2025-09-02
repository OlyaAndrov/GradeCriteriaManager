import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CriteriaGroup } from '../../models/criteria.interface';

@Component({
  selector: 'app-criteria-table',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatTableModule, 
    MatCardModule, 
    MatChipsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './criteria-table.component.html',
  styleUrls: ['./criteria-table.component.css']
})
export class CriteriaTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() criteriaGroups: CriteriaGroup[] = [];
  @Input() isEditMode = false;
  @Output() dataChanged = new EventEmitter<void>();
  


  ngOnInit() {
    // Component initialized
  }

  ngOnChanges(changes: SimpleChanges) {
    // Handle input changes if needed
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
  
  displayedColumns: string[] = ['category', 'points', 'description', 'isDisqualifying'];

  getCategoryClass(category: string): string {
    switch (category) {
      case 'CRITERION_NOT_MET':
        return 'criterion-not-met';
      case 'UNSUCCESSFUL_ATTEMPT_TO_MEET_THE_CRITERION':
        return 'unsuccessful-attempt';
      case 'CRITERION_MET_WITH_RESERVATIONS':
        return 'criterion-met-reservations';
      case 'CRITERION_MET':
        return 'criterion-met';
      default:
        return '';
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'CRITERION_NOT_MET':
        return 'Nie spełniono';
      case 'UNSUCCESSFUL_ATTEMPT_TO_MEET_THE_CRITERION':
        return 'Nieudana próba';
      case 'CRITERION_MET_WITH_RESERVATIONS':
        return 'Spełniono z zastrzeżeniami';
      case 'CRITERION_MET':
        return 'Spełniono';
      default:
        return category;
    }
  }

  onDescriptionChange(group: CriteriaGroup, event: any) {
    if (this.isEditMode) {
      const newValue = event.target.value;
      group.criteria[0].description = newValue;
      // Don't emit dataChanged during typing to prevent focus loss
    }
  }

  onDescriptionBlur(group: CriteriaGroup, event: any) {
    if (this.isEditMode) {
      // Only emit when user finishes editing (loses focus)
      this.dataChanged.emit();
    }
  }

  onDisqualifyingChange(group: CriteriaGroup, event: any) {
    if (this.isEditMode) {
      group.criteria[0].isDisqualifying = event.checked;
      // Don't emit dataChanged during change to prevent focus loss
    }
  }

  onDisqualifyingBlur(group: CriteriaGroup, event: any) {
    if (this.isEditMode) {
      // Only emit when user finishes editing
      this.dataChanged.emit();
    }
  }
} 