import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardsComponent } from './cards/cards.component';
import { Product } from '../../models/product.model';
import { AddProductComponent } from './add-product/add-product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LocalStorageService } from '../../services/local-storage.service';
import { HARDCODED_PRODUCTS } from '../../data/default-products.data';
import { MatSelectModule } from '@angular/material/select';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = function (page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CardsComponent, MatButtonModule, MatDividerModule, MatIconModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ],
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
  
  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortProducts(target.value as 'asc' | 'desc');
  }
}

