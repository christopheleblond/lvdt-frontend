import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from '../model/rooms';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit, AfterViewInit {

  roomForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    tableCount: new FormControl('', Validators.min(1))
  });

  @Output()
  submit = new EventEmitter();

  room: Room;

  constructor(private dialogRef: MatDialogRef<RoomFormComponent>, @Inject(MAT_DIALOG_DATA) data: { room: Room }, private roomService: RoomsService) { 
      this.room = data.room;
      this.roomForm.patchValue(this.room);
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {    
  }

  onSubmit(): void {    
    const room = {
      id: this.room?.id,
      ...this.roomForm.value
    }

    this.roomService.saveRoom(room).subscribe(resp => {
      this.submit.emit(room);
      console.log('Room added', room);
    });    
  }
}
