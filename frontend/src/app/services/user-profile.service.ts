import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'https://buddy-board-infosys-internship-oct2024.onrender.com/api/user'; // Replace with the actual user API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the auth token from localStorage.
   */
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Helper method to construct authorization headers.
   */
  private createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  /**
   * Get user profile by username.
   * @param username The username to retrieve the profile for.
   */
  getUserData(username: string): Observable<UserProfile> {
    const headers = this.createAuthHeaders();
    return this.http.get<UserProfile>(`${this.apiUrl}/${username}`, { headers });
  }
}

// Interface defined inside the service file
export interface UserProfile {
  email: string;
  joined: string;
  decks: string[];
}
