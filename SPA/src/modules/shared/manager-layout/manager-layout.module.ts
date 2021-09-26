import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerLayoutComponent } from './manager-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ManagerLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class ManagerLayoutModule {}
