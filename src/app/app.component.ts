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
  isEditMode = false;

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
    this.isEditMode = false;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onDataChanged() {
    // This method will be called when data is changed in edit mode
    // The criteriaData is automatically updated since we're editing the same objects
    // We just need to reload the semester data to reflect changes
    if (this.criteriaData) {
      this.loadSemesterData();
    }
  }

  saveFile() {
    if (!this.criteriaData) return;
    
    // Create a blob with the JSON data
    const jsonString = JSON.stringify(this.criteriaData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'criteria.json';
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
