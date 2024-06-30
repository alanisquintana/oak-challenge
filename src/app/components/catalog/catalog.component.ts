import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardsComponent } from './cards/cards.component';
import { Product } from '../../models/product.model';
import { AddProductComponent } from './add-product/add-product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CardsComponent, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  products: Product[] = [];

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.products = this.localStorageService.getProducts();
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
    const updatedProducts = [...this.products, product];
    this.localStorageService.saveProducts(updatedProducts);
    this.products = updatedProducts;
  }
}