import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, mergeMap, Subject } from 'rxjs';
import { Room } from 'src/app/rooms/model/rooms';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Play } from '../play';
import { PlayFormComponent } from '../play-form/play-form.component';
import { PlaysService } from '../plays.service';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.css']
})
export class PlaysComponent implements OnInit {

  refreshPlayList$ = new Subject();

  plays: Play[] = [];

  constructor(private readonly playService: PlaysService, private readonly dialog: MatDialog) { }

  ngOnInit(): void {    

    this.refreshPlayList$
    .pipe(mergeMap(e => this.playService.findAllPlays()))
    .subscribe(plays => {
      this.plays = plays;
    });

    this.refreshPlayList$.next(true);
  }

  openForm(play: Play | null): void {
    const dialogRef = this.dialog.open(PlayFormComponent, { data: play }); 
    dialogRef.componentInstance.onSubmit.subscribe(e => this.refreshPlayList$.next(true));
  }

  openConfirmDeletionDialog(play: Play): void {
    const dialogRef = this.dialog.open(ConfirmPlayDeletionDialog, { data: play });

    dialogRef.afterClosed().pipe(
      filter(deletionConfirmed => !!deletionConfirmed),
      mergeMap(deletionConfirmed => this.playService.deletePlay(play))
    ).subscribe(result => this.refreshPlayList$.next(true));
  }

  registerNewPlayer(play: Play): void {

  }
}


@Component({
  selector: 'app-play-confirm-deletion-dialog',
  templateUrl: './confirm-play-deletion-dialog.html'
})
export class ConfirmPlayDeletionDialog {

  playToDelete: Play;

  constructor(private dialogRef: MatDialogRef<ConfirmPlayDeletionDialog>, @Inject(MAT_DIALOG_DATA) data: Play) {
      this.playToDelete = data;
  }
  
}