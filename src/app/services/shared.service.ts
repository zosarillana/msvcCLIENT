import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedContentSource = new BehaviorSubject<string>('content1'); // Default value
  private selectedIdSource = new BehaviorSubject<string | null>(null); // Default value

  selectedContent$ = this.selectedContentSource.asObservable();
  selectedId$ = this.selectedIdSource.asObservable();

  setSelectedContent(content: string) {
    this.selectedContentSource.next(content);
  }

  setSelectedId(id: string | null) {
    this.selectedIdSource.next(id);
  }
}
