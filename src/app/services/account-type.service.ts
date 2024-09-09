import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountType } from '../models/accountType';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {
  private url = 'AccountType';

  constructor(private http: HttpClient) {}

  public getAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(`${environment.apiUrl}/${this.url}`);
  }
}