import { NgModule } from '@angular/core';
import {
    MexPanelHeader,
    MexPanelHeaderActionButton,
    MexPanelHeaderTitle
} from './panel-header';
import { MexPanel } from './panel';
import { MexPanelBody } from './panel-body';
import { MexPanelCollapseButton } from 'ngx-material-extended';

const components = [
    MexPanel,
    MexPanelHeader,
    MexPanelHeaderTitle,
    MexPanelHeaderActionButton,
    MexPanelHeader,
    MexPanelCollapseButton,
    MexPanelBody
];

@NgModule({
    imports: components,
    exports: components
})
export class MexPanelModule {}
