import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardsComponent } from './cards/cards.component';
import { Product } from '../../models/product.model';
import { AddProductComponent } from './add-product/add-product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LocalStorageService } from '../../services/local-storage.service';
import { HARDCODED_PRODUCTS } from '../../data/default-products.data';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CardsComponent, MatButtonModule, MatDividerModule, MatIconModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  defaultProducts: Product[] = HARDCODED_PRODUCTS;
  products: Product[] = [];
  pageIndex = 0;
  pageSize = 6;
  totalLength = 0;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleProductAdded(result);
      }
    });
  }

  handleProductAdded(product: Product): void {
    this.products.push(product);
    this.localStorageService.saveProducts(this.products);
    this.loadProducts();
  }

  private loadProducts(): void {
    this.products = this.localStorageService.getProducts();
    this.totalLength = this.calculateTotalLength();
    this.sortProducts(this.sortOrder);
  }

  private calculateTotalLength(): number {
    return this.defaultProducts.length + this.products.length;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
  }

  get concatenatedProducts(): Product[] {
    let mergedProducts: Product[] = [...this.products, ...this.defaultProducts];

    mergedProducts.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      if (this.sortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    const start = this.pageIndex * this.pageSize;
    const end = (this.pageIndex + 1) * this.pageSize;

    return mergedProducts.slice(start, end);
  }

  sortProducts(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
  }
}
