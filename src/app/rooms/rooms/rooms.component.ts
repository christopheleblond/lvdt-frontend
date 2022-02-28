import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { delay, merge, mergeMap, Observable, of, Subject, timeout } from 'rxjs';
import { Room } from '../model/rooms';
import { RoomsService } from '../rooms.service';
import { RoomFormComponent } from '../room-form/room-form.component';

export interface RoomServiceError {
  message?: string;
  cause?: Error;
}


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];

  refreshRoomList$ = new Subject();

  // Main errors
  failToSearchRoomsError: any;

  constructor(private roomService: RoomsService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.refreshRoomList$.pipe(mergeMap(e => this.roomService.findAllRooms())).subscribe(rooms => {
      this.rooms = rooms;
      this.failToSearchRoomsError = null;

      console.log('refresh');

    }, error => this.failToSearchRoomsError = { message: `Fail to find rooms: ${error.message}`, cause: error } as RoomServiceError);

    this.refreshRoomList$.next(true);
  }

  openForm(room: Room | null): void {
    const dialogRef = this.dialog.open(RoomFormComponent, { data: { room }});

    dialogRef.componentInstance.submit.subscribe(e => this.refreshRoomList$.next(true));
  }

  openConfirmDialog(dialogId: string, room: Room): void {
    const dialogRef = this.dialog.open(ConfirmRoomDeletionDialog, { data: { room }});

    dialogRef.afterClosed().subscribe(deletionAccepted => {
      if(deletionAccepted) {
        this.roomService.removeRoom(room)
        .subscribe(del => {
          this.refreshRoomList$.next(true);
        });
      }
    });
  }

  refresh(): void {
    this.refreshRoomList$.next(true);
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