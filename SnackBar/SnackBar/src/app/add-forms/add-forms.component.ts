import { Component, OnInit } from '@angular/core';
import { Avatar } from '../model/avatar';
import { Snack } from '../model/snack';
import {ValidationManager} from "ng2-validation-manager";
import { AvatarService } from '../service/avatar.service';
import { SnackService } from '../service/snack.service';

import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-add-forms',
  templateUrl: './add-forms.component.html',
  styleUrls: ['./add-forms.component.css']
})
export class AddFormsComponent implements OnInit {

  avatarform;
  snackform;

  avatars : Avatar[];


  constructor(
    private avatarService: AvatarService,
    private snackService: SnackService
  ) {
    this.avatarService.getAvatars().then(result => {
      this.avatarService.avatars = result;
      this.avatars = this.avatarService.avatars;
    });
  }

  ngOnInit() {
    this.setForm();
  }

  addAvatar(){
    const params: Avatar = this.avatarform.getData();
    this.avatarService.addAvatar(params.name.toString(), params.email.toString(), params.pictype.toString(),params.pic.toString()).then(result => {
      alert("name " + params.name.toString());
      this.avatarService.getAvatars().then(result => {
        this.avatarService.avatars = result;
        this.avatars = this.avatarService.avatars;
      });
    });
  }

  addSnack(){
    const params: Snack = this.snackform.getData();
    this.snackService.addSnack(params.name.toString(), params.price, params.owner, params.pictype.toString(), params.pic.toString()).then(result => {
      alert("name " + params.name.toString());
      this.snackService.getSnacks().then(result =>{
        this.snackService.snacks = result;
      });
    });
  }

  setForm(){
    this.avatarform = new ValidationManager({
      'name': 'required|alphaNumSpace',
      'email': 'required|email',
      'pictype': 'alpha|maxLength:3',
      'pic': 'pattern:[A-Za-z0-9.+/=]*'
    });
    this.snackform = new ValidationManager({
        'name': 'required|alphaNumSpace',
        'price': 'required|number',
        'owner': 'required|number',
        'pictype': 'alpha|maxLength:3',
        'pic': 'pattern:[A-Za-z0-9.+/=]*'
    });
   }


}
