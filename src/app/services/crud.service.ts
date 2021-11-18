import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  updateUrl = 'https://retoolapi.dev/dOHcE8/data/31';
  usersUrl = 'https://retoolapi.dev/dOHcE8/data';
  countryStateListUrl = ' https://pod2-dlp.fayastage.com:7004/api/m/country_state_list';
  employeeUrl = 'https://retoolapi.dev/sFlOCx/intern_task';

  constructor(private http: HttpClient) { }

  getData() {//get country and state list from countryStateList Url
    return this.http.get(this.countryStateListUrl).pipe(
      catchError(this.handleError)
    );
  }

  getEmployee() {//get country and state list from countryStateList Url
    return this.http.get(this.employeeUrl).pipe(
      catchError(this.handleError)
    );
  }

  filterEmployee() {
    return this.http.get(`${this.employeeUrl}?$status=true`).pipe(
      catchError(this.handleError)
    );
  }

  postEmployee(data) {// post data to usersUrl
    return this.http.post(this.employeeUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  editEmployee(id, data) {// update data
    return this.http.put(`${this.employeeUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id) {// delete data
    return this.http.delete(`${this.employeeUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  postData(data) {// post data to usersUrl
    return this.http.post(this.usersUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  editData(data) {// edit data
    return this.http.put(this.updateUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeById(id: number) {
    return this.http.get(`${this.employeeUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened. Please try again later.');
  }
}
