import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElmOutlineDirective } from './outline.directive';
import { ElmColorBaseDirective } from './color.directive';
import { ElmButton } from './button.directive';

@NgModule({
    declarations: [],
    imports: [CommonModule, ElmOutlineDirective, ElmColorBaseDirective, ElmButton],
    exports: [ElmOutlineDirective, ElmColorBaseDirective, ElmButton]
})
export class ElmThemeModule {}
