import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = "49a1644c1b0b3ea76c42c0c837bc2a97";
  private app_id = "ac7f880c";


  private httpOptions = {
    headers: new HttpHeaders({
      'accept': 'application/json',
      'Accept-Language': 'en'
    })
  }

  constructor(private http:HttpClient) { }

  getRecipes(searchterm: string): Observable<any> {
    let quisineType = "American"; //could be sent as parameter
    let mealType = "Breakfast"; //could be sent as parameter
    let url = this.baseUrl + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key + "&cuisineType=" + quisineType + "&mealType=" + mealType;
    return this.http.get<any>(url, this.httpOptions);
  }

}
