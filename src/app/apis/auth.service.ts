import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  getToken = () => JSON.parse(localStorage.getItem('tokens') ?? '{}')?.access;
  async login(data: any) {
    return await fetch('https://django-rest-production.up.railway.app/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  async refresh() {
    let data = await fetch('https://django-rest-production.up.railway.app/auth/login/refresh/', {
      method: 'POST',

      body: JSON.stringify({
        refresh: JSON.parse(window.localStorage.getItem('tokens') ?? '{}')
          ?.refresh,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    localStorage.setItem('tokens', JSON.stringify(await data.json()));
  }
  async getUser() {
    let data = await fetch('https://django-rest-production.up.railway.app/auth/user/', {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${this.getToken()}`,
      },
    });
    if (data.status < 299) {
      return data;
    } else if (data.status === 401) {
      console.log(data.status);
      await this.refresh();
      return await fetch('https://django-rest-production.up.railway.app/auth/user/', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${this.getToken()}`,
        },
      });
    }
    else{
      throw data;
    }
  }

  async register(data: any) {
    return await fetch('https://django-rest-production.up.railway.app/auth/users/register/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
