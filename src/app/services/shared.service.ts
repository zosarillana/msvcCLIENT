import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedContentSource = new BehaviorSubject<string>('content1'); // Default value
  selectedContent$ = this.selectedContentSource.asObservable();

  setSelectedContent(content: string) {
    this.selectedContentSource.next(content);
  }
}
