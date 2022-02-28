import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPlayDeletionDialog, PlaysComponent } from './plays/plays.component';
import { SharedModule } from '../shared/shared.module';
import { PlayFormComponent } from './play-form/play-form.component';



@NgModule({
  declarations: [
    PlaysComponent,
    ConfirmPlayDeletionDialog,
    PlayFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PlaysComponent
  ]
})
export class PlaysModule { }
