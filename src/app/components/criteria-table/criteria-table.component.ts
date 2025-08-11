import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CriteriaGroup } from '../../models/criteria.interface';

@Component({
  selector: 'app-criteria-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatChipsModule],
  templateUrl: './criteria-table.component.html',
  styleUrls: ['./criteria-table.component.css']
})
export class CriteriaTableComponent {
  @Input() criteriaGroups: CriteriaGroup[] = [];
  
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
} 