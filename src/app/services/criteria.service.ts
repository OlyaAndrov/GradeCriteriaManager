import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { CriteriaData, CriteriaSection, CriteriaGroup } from '../models/criteria.interface';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {
  constructor(private http: HttpClient) {}

  getCriteriaData(): Observable<CriteriaData> {
    return this.http.get<CriteriaData>('assets/data/criteria.json');
  }

  getFirstSemesterSections(): Observable<CriteriaSection[]> {
    return this.getCriteriaData().pipe(
      map(data => data.criteriaSections.filter(section => 
        section.criteriaGroups.some(group => group.idFirstSemester !== null)
      ))
    );
  }

  getSecondSemesterSections(): Observable<CriteriaSection[]> {
    return this.getCriteriaData().pipe(
      map(data => data.criteriaSections.filter(section => 
        section.criteriaGroups.some(group => group.idSecondSemester !== null)
      ))
    );
  }

  getFirstSemesterGroups(): Observable<CriteriaGroup[]> {
    return this.getCriteriaData().pipe(
      map(data => {
        const groups: CriteriaGroup[] = [];
        data.criteriaSections.forEach(section => {
          section.criteriaGroups.forEach(group => {
            if (group.idFirstSemester !== null) {
              groups.push({
                ...group,
                name: `${section.name} - ${group.name}`
              });
            }
          });
        });
        return groups;
      })
    );
  }

  getSecondSemesterGroups(): Observable<CriteriaGroup[]> {
    return this.getCriteriaData().pipe(
      map(data => {
        const groups: CriteriaGroup[] = [];
        data.criteriaSections.forEach(section => {
          section.criteriaGroups.forEach(group => {
            if (group.idSecondSemester !== null) {
              groups.push({
                ...group,
                name: `${section.name} - ${group.name}`
              });
            }
          });
        });
        return groups;
      })
    );
  }
  
  // New methods for working with uploaded data
  getFirstSemesterGroupsFromData(data: CriteriaData): Observable<CriteriaGroup[]> {
    return of(this.processFirstSemesterGroups(data));
  }

  getSecondSemesterGroupsFromData(data: CriteriaData): Observable<CriteriaGroup[]> {
    return of(this.processSecondSemesterGroups(data));
  }

  private processFirstSemesterGroups(data: CriteriaData): CriteriaGroup[] {
    const groups: CriteriaGroup[] = [];
    data.criteriaSections.forEach(section => {
      section.criteriaGroups.forEach(group => {
        if (group.idFirstSemester !== null) {
          groups.push({
            ...group,
            name: `${section.name} - ${group.name}`
          });
        }
      });
    });
    return groups;
  }

  private processSecondSemesterGroups(data: CriteriaData): CriteriaGroup[] {
    const groups: CriteriaGroup[] = [];
    data.criteriaSections.forEach(section => {
      section.criteriaGroups.forEach(group => {
        if (group.idSecondSemester !== null) {
          groups.push({
            ...group,
            name: `${section.name} - ${group.name}`
          });
        }
      });
    });
    return groups;
  }
} 