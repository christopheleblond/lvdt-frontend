import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from '../model/rooms';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit, AfterViewInit {

  roomForm = new FormGroup({
    roomName: new FormControl('', Validators.required),
    roomAddress: new FormControl('', Validators.required),
    roomTableCount: new FormControl('', Validators.min(1))
  });

  @ViewChild('roomNameElement') roomNameElement?: ElementRef;

  @Output()
  submit = new EventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    this.roomNameElement?.nativeElement.focus();
  }

  ngOnInit(): void {    
  }

  onSubmit(): void {    
    const room = Object.assign({}, this.roomForm.value);

    console.log('Add room', room);

    this.submit.emit(room);
  }
}
