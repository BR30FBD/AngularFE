import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  //  Import the fixed routes array

@NgModule({
  imports: [RouterModule.forRoot(routes)], //  Load routes
  exports: [RouterModule] //  Export RouterModule for use in AppModule
})
export class AppRoutingModule {}
