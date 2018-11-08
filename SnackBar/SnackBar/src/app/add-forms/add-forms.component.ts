import { Component, OnInit } from '@angular/core';
import { Avatar } from '../model/avatar';
import { Snack } from '../model/snack';
import {ValidationManager} from "ng2-validation-manager";
import { AvatarService } from '../service/avatar.service';
import { SnackService } from '../service/snack.service';

import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {UploadFile} from "../model/upload-file";

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
    this.avatarService.addAvatar(params.name.toString(), params.email.toString(), this.file.imageType,this.file.base64Image).then(result => {
      this.avatarService.getAvatars().then(result => {
        this.avatarService.avatars = result;
        this.avatars = this.avatarService.avatars;
      });
    });
  }

  addSnack(){
    const params: Snack = this.snackform.getData();
    this.snackService.addSnack(params.name.toString(), params.price, params.count, params.owner, this.file.imageType,this.file.base64Image).then(result => {
      this.snackService.getSnacks().then(result =>{
        this.snackService.snacks = result;
      });
    });
  }

  setForm(){
    this.avatarform = new ValidationManager({
      'name': 'required|alphaNumSpace',
      'email': 'required|email'
    });
    this.snackform = new ValidationManager({
        'name': 'required|alphaNumSpace',
        'price': 'required|number',
        'count': 'required|number',
        'owner': 'required|number'
    });
   }

  private file: UploadFile = new UploadFile();

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    this.file.imageType = file.type;
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.file.base64Image = reader.result;
  }


}
