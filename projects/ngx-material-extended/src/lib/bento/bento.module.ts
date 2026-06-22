import { NgModule } from '@angular/core';
import { MexBento } from './bento';
import { MexBentoItem } from './bento-item';

const components = [MexBento, MexBentoItem];

@NgModule({
    imports: components,
    exports: components
})
export class MexBentoModule {}
