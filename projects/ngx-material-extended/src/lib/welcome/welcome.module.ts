import { NgModule } from '@angular/core';
import {
    MexWelcome,
    MexWelcomeActions,
    MexWelcomeSubtitle,
    MexWelcomeTitle
} from './welcome';

const components = [MexWelcome, MexWelcomeTitle, MexWelcomeSubtitle, MexWelcomeActions];

@NgModule({
    imports: [components],
    exports: components
})
export class MexWelcomeModule {}
