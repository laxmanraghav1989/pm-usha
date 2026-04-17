import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterService } from './master.service';
import { shareReplay } from 'rxjs/operators';
import { GetService } from './get.service';

@Injectable({
  providedIn: 'root'
})
export class ShareReplayService {
  private state$!: Observable<any>;
  private component$!: Observable<any>;

  constructor(public masterService: MasterService, public getService: GetService) { }

  getStateData() {
    if (!this.state$) {
      this.state$ = this.masterService.getStateData().pipe(
        shareReplay(1)
      );
    }
    return this.state$;
  }

    getComponent() {
    if (!this.component$) {
      this.component$ = this.getService.getComponent().pipe(
        shareReplay(1)
      );
    }
    return this.component$;
  }



  
}
