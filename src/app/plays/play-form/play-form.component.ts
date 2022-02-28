import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from 'src/app/rooms/model/rooms';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Play } from '../play';
import { PlaysService } from '../plays.service';

@Component({
  selector: 'app-play-form',
  templateUrl: './play-form.component.html',
  styleUrls: ['./play-form.component.css']
})
export class PlayFormComponent implements OnInit {

  frmPlay: FormGroup;

  playEdited: Play | null = null;

  @Output()
  onSubmit = new EventEmitter();

  rooms: Room[] = [];

  constructor(private dialogRef: MatDialogRef<PlayFormComponent>, @Inject(MAT_DIALOG_DATA) data: Play, private readonly fb: FormBuilder, private readonly playService: PlaysService,  private readonly roomService: RoomsService) { 
    this.frmPlay = this.fb.group({
      'date': this.fb.control('', Validators.required),
      'gameId': this.fb.control('', Validators.required),
      'roomId': this.fb.control('', Validators.required),
      'playType': this.fb.control('', Validators.required),
      'playerCount': this.fb.control('', Validators.min(1)),
      'description': this.fb.control(''),
      'players': this.fb.array([])
    });

    this.playEdited = data;

    if(this.playEdited !== null) {
      this.frmPlay.patchValue({
        date: this.playEdited.date,
        gameId: this.playEdited.game,
        roomId: this.playEdited.room,
        playType: this.playEdited.type,
        playerCount: this.playEdited.playerCount,
        description: this.playEdited.description,
        players: []
      });
    }   
  }

  ngOnInit(): void {
    this.roomService.findAllRooms().subscribe(rooms => this.rooms = rooms);
  }

  submit(): void {

    const playToSave: Play = {
      id: this.playEdited?.id,
      date: this.frmPlay.controls['date'].value,
      game: this.frmPlay.controls['gameId'].value,
      room: this.frmPlay.controls['roomId'].value,
      type: this.frmPlay.controls['playType'].value,
      playerCount: this.frmPlay.controls['playerCount'].value,
      description: this.frmPlay.controls['description'].value,
    }

    this.playService.savePlay(playToSave)
    .subscribe({
      next: (r) => {
        console.log('Play saved!', r);
        this.onSubmit.emit(r);
      }
    });
  }
}
