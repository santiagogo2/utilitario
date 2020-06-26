import { NgModule } from '@angular/core';

// Pipes
import { GlobalPipe } from './global.pipe';

@NgModule({
    declarations:[
        GlobalPipe,
    ],
    imports:[
    ],
    exports:[
        GlobalPipe,
    ],
})
export class PipesModule {}