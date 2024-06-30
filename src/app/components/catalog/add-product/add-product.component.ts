import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Product } from '../../../models/product.model';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CurrencyMaskModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm: FormGroup;
  imageSrc: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private localStorageService: LocalStorageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      isAvailable: [true],
      image: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.productForm.patchValue({
          image: this.imageSrc
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        image: this.imageSrc || '/products/default.png',
        rating: 5,
        title: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        isAvailable: this.productForm.value.isAvailable
      };

      this.localStorageService.saveProducts([...this.localStorageService.getProducts(), newProduct]);

      this.productForm.reset({
        name: '',
        description: '',
        price: 0,
        isAvailable: true,
        image: null
      });
      this.imageSrc = '';

      this.dialogRef.close(newProduct);
    }
  }
}
