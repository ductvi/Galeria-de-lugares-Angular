import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaRoutingModule } from './galeria-routing-module';
import { Galeria } from './galeria/galeria';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Galeria],
  imports: [CommonModule, GaleriaRoutingModule, FormsModule],
})
export class GaleriaModule {}
