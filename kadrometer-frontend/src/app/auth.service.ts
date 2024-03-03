// auth.service.ts

import { Injectable } from '@angular/core';

// auth.service.ts

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor() {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      this.token = localToken;
    }
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    this.token = null;
    localStorage.removeItem('token'); 
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }
}

