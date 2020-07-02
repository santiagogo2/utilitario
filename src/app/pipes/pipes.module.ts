import { NgModule } from '@angular/core';

// Pipes
import { GlobalPipe } from './global.pipe';
import { IsNullPipe } from './is-null.pipe';

@NgModule({
    declarations:[
        GlobalPipe,
        IsNullPipe,
    ],
    imports:[
    ],
    exports:[
        GlobalPipe,
        IsNullPipe,
    ],
})
export class PipesModule {}