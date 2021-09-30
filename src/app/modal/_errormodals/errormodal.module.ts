import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrormodalComponent } from './errormodal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ErrormodalComponent],
    exports: [ErrormodalComponent]
})
export class ErrormodalModule { }