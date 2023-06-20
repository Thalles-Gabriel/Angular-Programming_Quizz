import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiData } from '../model/apiModel';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private apiUrl: string = 'https://quizapi.io/api/v1/questions'

  constructor(private http: HttpClient, private router: Router) { }

  getQuizz(queryParameters:HttpParams): Observable<apiData[]> {
    const header = new HttpHeaders().set('X-Api-Key', environment.apiKey)
    return this.http.get<apiData[]>(
      this.apiUrl,
      {
        headers: header,
        params: queryParameters
      }).pipe(catchError((err: HttpErrorResponse) => {
        alert('Erro: ' + err.statusText)
        this.router.navigate(['/'])
        return throwError('Error ao acessar a API')
      }))
  }

}
