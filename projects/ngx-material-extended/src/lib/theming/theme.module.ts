import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MexOutlineDirective } from './outline.directive';
import { MexColorBaseDirective } from './color.directive';
import { MexButton } from './button.directive';

@NgModule({
    imports: [CommonModule, MexOutlineDirective, MexColorBaseDirective, MexButton],
    exports: [MexOutlineDirective, MexColorBaseDirective, MexButton]
})
export class MexThemeModule {}
