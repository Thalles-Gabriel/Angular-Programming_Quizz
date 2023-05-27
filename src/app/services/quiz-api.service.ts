import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiData } from '../model/apiModel';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private apiUrl:string = 'https://quizapi.io/api/v1/questions'
  private data!: Observable<apiData[]>

  constructor(private http: HttpClient) { }

  getQuizz(queryParameters:HttpParams): Observable<apiData[]> {
    const getHeaders = new HttpHeaders().set('X-Api-Key', environment.apiKey)
    this.data = this.http.get<apiData[]>(
      this.apiUrl,
      {
        headers: getHeaders,
        params: queryParameters
      })

    return this.data
  }

}
