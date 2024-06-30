import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly PRODUCTS_KEY = 'products';

  constructor() {
    this.initializeProducts();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private initializeProducts(): void {
    if (this.isBrowser()) {
      const products = this.getProducts();
      if (products.length === 0) {
        const initialProducts: Product[] = [
          { image: '/products/sneaker01.jpg', rating: 5, title: 'Tênis Jordan Delta 3 Low', price: 693.49, description: 'Casual', isAvailable: true }
        ];
        this.saveProducts(initialProducts);
      }
    }
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