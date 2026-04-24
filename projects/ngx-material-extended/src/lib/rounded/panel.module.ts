import { NgModule } from '@angular/core';
import {
    MexPanelHeader,
    MexPanelHeaderActionButton,
    MexPanelHeaderTitle
} from './panel-header';
import { MexPanel } from './panel';
import { MexPanelBody } from './panel-body';

const components = [
    MexPanel,
    MexPanelHeader,
    MexPanelHeaderTitle,
    MexPanelHeaderActionButton,
    MexPanelBody
];

@NgModule({
    imports: components,
    exports: components
})
export class MexPanelModule {}
