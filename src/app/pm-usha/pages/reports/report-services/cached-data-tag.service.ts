import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachedDataTagService {

private readonly storageKey = 'stateList';
  private dataSubject: BehaviorSubject<any[]>;

  constructor() {
    const storedData = localStorage.getItem(this.storageKey);
    this.dataSubject = new BehaviorSubject<any[]>(storedData ? JSON.parse(storedData) : []);
  }

  // Observable getter
  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  // Current value getter
  getCurrentValue(): any[] {
    return this.dataSubject.value;
  }

  // Save & emit new data
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
