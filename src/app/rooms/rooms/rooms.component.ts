import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Room } from '../model/rooms';
import { RoomsService } from '../rooms.service';
import { RoomFormComponent } from '../room-form/room-form.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms$: Observable<Room[]> = of([]);

  constructor(private roomService: RoomsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.rooms$ = this.roomService.findAllRooms();
  }

  openForm(room: Room | null): void {
    this.dialog.open(RoomFormComponent, { data: { room }});
  }

  openConfirmDialog(dialogId: string, room: Room): void {
    this.dialog.open(ConfirmRoomDeletionDialog, { data: { room }});
  }

}

@Component({
  selector: 'app-room-confirm-deletion-dialog',
  templateUrl: './confirm-room-deletion-dialog.html'
})
export class ConfirmRoomDeletionDialog {

  roomSelected: Room;

  constructor(private dialogRef: MatDialogRef<ConfirmRoomDeletionDialog>, @Inject(MAT_DIALOG_DATA) data: { room: Room }) {
      this.roomSelected = data['room'];
  }
  
}