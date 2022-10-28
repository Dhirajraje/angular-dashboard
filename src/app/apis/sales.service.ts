import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private authService:AuthService) {}
  async getUserDetails(){
    let data = await this.authService.getUser();
    return data;
  }
  async getDailySalesDetails(noOfDays: number) {
    try {
      let data = await fetch(`https://django-rest-production.up.railway.app/sales/getAggrSale/?no_of_days=${2000}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${
            JSON.parse(localStorage.getItem('tokens') ?? '{}')?.access
          }`,
        },
      });
      return data;
    } catch {
      await this.authService.refresh();
      return await fetch(`https://django-rest-production.up.railway.app/sales/getAggrSale/?no_of_days=${2000}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${
            JSON.parse(localStorage.getItem('tokens') ?? '{}')?.access
          }`,
        },
      });
    }
  }
  async getSales(noOfDays: number) {
    try {
      let data = await fetch(`https://django-rest-production.up.railway.app/sales/getSales/?page_size=${2000}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${
            JSON.parse(localStorage.getItem('tokens') ?? '{}')?.access
          }`,
        },
      });
      return data;
    } catch {
      await this.authService.refresh();
      return await fetch(`https://django-rest-production.up.railway.app/sales/getSales/?page_size=${2000}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${
            JSON.parse(localStorage.getItem('tokens') ?? '{}')?.access
          }`,
        },
      });
    }
  }
  async uploadExcel(fromData:any) {
    try {
      let data = await fetch(`https://django-rest-production.up.railway.app/sales/uploadSales/`, {
        method: 'PUT',
        body:fromData,
        headers: {
          'authorization': `Bearer ${
            JSON.parse(localStorage.getItem('tokens') ?? '{}')?.access
          }`,
        },
      });
      return data;
    } catch {
      await this.authService.refresh();
      return await fetch(`https://django-rest-production.up.railway.app/sales/uploadSales/`, {
        method: 'PUT',
        body:fromData,
        headers: {
          'authorization': `Bearer ${
            JSON.parse(localStorage.getItem('tokens') ?? '{}')?.access
          }`,
        },
      });
    }
  }
}
