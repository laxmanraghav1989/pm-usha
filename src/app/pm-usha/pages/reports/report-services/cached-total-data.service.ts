import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachedTotalDataService {
  private readonly storageKey = 'proposalOutcomes';
  private dataSubject: BehaviorSubject<any[]>;

  constructor() {
    // Load from localStorage if available, otherwise empty array
    const storedData = localStorage.getItem(this.storageKey);
    this.dataSubject = new BehaviorSubject<any[]>(storedData ? JSON.parse(storedData) : []);
  }

  // Observable for components to subscribe
  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  // Get the current value (non-observable)
  getCurrentValue(): any[] {
    return this.dataSubject.value;
  }

  // Set new data
  setData(data: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.dataSubject.next(data);
  }

  // Clear cache
  clearData(): void {
    localStorage.removeItem(this.storageKey);
    this.dataSubject.next([]);
  }
}
