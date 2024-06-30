import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly PRODUCTS_KEY = 'products';

  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  getProducts(): Product[] {
    if (this.isBrowser()) {
      const productsJson = localStorage.getItem(this.PRODUCTS_KEY);
      return productsJson ? JSON.parse(productsJson) : [];
    }
    return [];
  }

  saveProducts(products: Product[]): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
    }
  }
}
