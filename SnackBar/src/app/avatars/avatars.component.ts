import { Component, OnInit } from '@angular/core';
import { Avatar } from '../model/avatar';
import { AvatarService } from '../service/avatar.service';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.css']
})
export class AvatarsComponent implements OnInit {

  // avatars =  this.avatarService.avatars;
  avatars: Avatar[];

  constructor(
    private avatarService: AvatarService
  ) {
    this.getAvatars()
  }

  ngOnInit() {

  }

  getAvatars(){
    this.avatarService.getAvatars().then(result => {
      this.avatarService.avatars = result;
      this.avatars = this.avatarService.avatars;
    });
  }


}
