import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CriteriaTableComponent } from './components/criteria-table/criteria-table.component';
import { CriteriaService } from './services/criteria.service';
import { CriteriaGroup, CriteriaData } from './models/criteria.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    CriteriaTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Kryteria oceny projektu dyplomowego';
  
  firstSemesterGroups: CriteriaGroup[] = [];
  secondSemesterGroups: CriteriaGroup[] = [];
  criteriaData: CriteriaData | null = null;
  loading = true;
  error: string | null = null;

  constructor(private criteriaService: CriteriaService) {}

  ngOnInit() {
    this.loadCriteriaData();
  }

  private loadCriteriaData() {
    this.criteriaService.getCriteriaData().subscribe({
      next: (data) => {
        this.criteriaData = data;
        this.loadSemesterData();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Błąd podczas ładowania danych: ' + err.message;
        this.loading = false;
      }
    });
  }

  private loadSemesterData() {
    this.criteriaService.getFirstSemesterGroups().subscribe({
      next: (groups) => {
        this.firstSemesterGroups = groups;
      },
      error: (err) => {
        console.error('Error loading first semester data:', err);
      }
    });

    this.criteriaService.getSecondSemesterGroups().subscribe({
      next: (groups) => {
        this.secondSemesterGroups = groups;
      },
      error: (err) => {
        console.error('Error loading second semester data:', err);
      }
    });
  }
}
