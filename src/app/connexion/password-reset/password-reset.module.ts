import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from './password-reset.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export const routes = [
  { path: '', component: PasswordResetComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  
})
export class PasswordResetModule { }
