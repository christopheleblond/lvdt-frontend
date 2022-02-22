import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmRoomDeletionDialog, RoomsComponent } from './rooms/rooms.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RoomsComponent,
    ConfirmRoomDeletionDialog,
    RoomFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RoomsComponent
  ]
})
export class RoomsModule { }
