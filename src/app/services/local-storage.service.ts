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
          { image: '/products/sneaker01.jpg', rating: 5, title: 'Tênis Jordan Delta 3 Low', price: 693.49, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker02.jpg', rating: 5, title: 'Tênis Nike Pegasus Turbo', price: 1044.99, description: 'Corrida', isAvailable: true },
          { image: '/products/sneaker03.jpg', rating: 5, title: 'Tênis Nike MC Trainer 2', price: 569.99, description: 'Treino & Academia', isAvailable: true },
          { image: '/products/sneaker04.jpg', rating: 5, title: 'Terminator High', price: 949.99, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker05.jpg', rating: 5, title: 'Tênis Nike E-Series AD', price: 427.49, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker06.jpg', rating: 5, title: 'Tênis Nike Tech Hera', price: 569.99, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker07.jpg', rating: 5, title: 'Air Jordan 1 Retro High OG', price: 1519.99, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker08.jpg', rating: 5, title: 'Tênis Nike Vaporfly 3', price: 1947.49, description: 'Corrida', isAvailable: true },
          { image: '/products/sneaker09.jpg', rating: 5, title: 'Tênis Nike Air Max Excee', price: 560.4, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker10.jpg', rating: 5, title: 'Tênis Nike Air Max Solo', price: 484.49, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker11.jpg', rating: 5, title: 'Tênis Nike Precision 7', price: 474.99, description: 'Basquete', isAvailable: true },
          { image: '/products/sneaker12.jpg', rating: 5, title: 'Tênis Nike Renew Ride 3', price: 569.99, description: 'Corrida', isAvailable: true },
          { image: '/products/sneaker13.jpg', rating: 5, title: 'Tênis Nike Precision 6', price: 569.99, description: 'Basquete', isAvailable: true },
          { image: '/products/sneaker14.jpg', rating: 5, title: 'Tênis Nike Pegasus 40', price: 664.99, description: 'Corrida', isAvailable: true },
          { image: '/products/sneaker15.jpg', rating: 5, title: 'Tênis Nike Air Max Alpha Trainer 5', price: 721.99, description: 'Treino & Academia', isAvailable: true },
          { image: '/products/sneaker16.jpg', rating: 5, title: 'Tênis Jordan Stay Loyal 3', price: 664.99, description: 'Basquete', isAvailable: true },
          { image: '/products/sneaker17.jpg', rating: 5, title: 'Dunk Low', price: 854.99, description: 'Casual', isAvailable: true },
          { image: '/products/sneaker18.jpg', rating: 5, title: 'Tênis Nike Air Max Solo', price: 750.49, description: 'Casual', isAvailable: true }
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