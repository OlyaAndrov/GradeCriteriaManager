import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatButtonModule,
    MatIconModule,
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
  loading = false;
  error: string | null = null;
  fileLoaded = false;

  constructor(private criteriaService: CriteriaService) {}

  ngOnInit() {
        // Don't load data automatically - wait for file upload
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loading = true;
      this.error = null;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          this.criteriaData = jsonData;
          this.loadSemesterData();
          this.fileLoaded = true;
          this.loading = false;
        } catch (error) {
          this.error = 'Błąd podczas parsowania pliku JSON: ' + error;
          this.loading = false;
        }
      };
      
      reader.onerror = () => {
        this.error = 'Błąd podczas odczytu pliku';
        this.loading = false;
      };
      
      reader.readAsText(file);
    }
  }

  private loadSemesterData() {
    if (!this.criteriaData) return;
    
    this.criteriaService.getFirstSemesterGroupsFromData(this.criteriaData).subscribe({
      next: (groups) => {
        this.firstSemesterGroups = groups;
      },
      error: (err) => {
        console.error('Error loading first semester data:', err);
      }
    });

    this.criteriaService.getSecondSemesterGroupsFromData(this.criteriaData).subscribe({
      next: (groups) => {
        this.secondSemesterGroups = groups;
      },
      error: (err) => {
        console.error('Error loading second semester data:', err);
      }
    });
  }
  
  resetFile() {
    this.fileLoaded = false;
    this.criteriaData = null;
    this.firstSemesterGroups = [];
    this.secondSemesterGroups = [];
    this.error = null;
  }
}
