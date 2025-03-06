import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  //  Get posts from API
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //  Add a new post to API
  addPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  //  Update an existing post
  updatePost(post: any, id: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, post);
  }

  //  Delete a post
  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
