import { Component } from '@angular/core';
import { RoomsService } from '../../providers/rooms-service/rooms-service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  floors: number[];
  room: any;
  pageTitle: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public roomsService: RoomsService,
              public imagePicker: ImagePicker) {
    this.pageTitle = 'SALA ';
    this.room = {};
    this.floors = [1,2,3,4];
  }


  showRoom(name) {
    this.roomsService.getRoom(name).then(room => {
      this.pageTitle += this.room.name.toUpperCase();
      this.room = Object.assign(this.room, room);
    });
  }

  selectImage() {
    this.imagePicker.getPictures({maximumImagesCount:1}).then((results) => {
      for(let i =0; i < results.length; i++) {
        this.room.image = results[i];
      }
    }, (err) => {
      console.log(err)
    });
  }

  ionViewDidLoad() {
    this.room.name = this.navParams.data;
    this.showRoom(this.room.name);
  }

}
