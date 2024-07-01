import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CurrencyMaskModule
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent {
  @Input() products: Product[] = [];
  @Output() deleteProduct = new EventEmitter<Product>();
  stars: boolean[] = Array(5).fill(false);

constructor(private decimalPipe: DecimalPipe) {}

  rate(rating: number) {
  }

  formatPrice(price: number): string {
    const formattedPrice = this.decimalPipe.transform(price, '1.2-2');
    return formattedPrice ? `R$ ${formattedPrice.replace('.', ',')}` : 'R$ 0,00';
  }
}
