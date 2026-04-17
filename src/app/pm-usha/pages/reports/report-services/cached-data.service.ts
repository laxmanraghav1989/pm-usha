import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachedDataService {

private subjectsMap = new Map<string, BehaviorSubject<any>>();

  constructor() {}

  /**
   * Get observable for a given key
   */
  getData(key: string): Observable<any> {
    if (!this.subjectsMap.has(key)) {
      const storedValue = localStorage.getItem(key);
      const parsedValue = storedValue ? JSON.parse(storedValue) : null;
      this.subjectsMap.set(key, new BehaviorSubject<any>(parsedValue));
    }
    return this.subjectsMap.get(key)!.asObservable();
  }

  /**
   * Get current value for a given key
   */
  getCurrentValue(key: string): any {
    return this.subjectsMap.get(key)?.value || null;
  }

  /**
   * Set data for a given key
   */
  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    if (!this.subjectsMap.has(key)) {
      this.subjectsMap.set(key, new BehaviorSubject<any>(data));
    } else {
      this.subjectsMap.get(key)!.next(data);
    }
  }

  /**
   * Clear data for a given key
   */
  clearData(key: string): void {
    localStorage.removeItem(key);
    if (this.subjectsMap.has(key)) {
      this.subjectsMap.get(key)!.next(null);
    }
  }
}
