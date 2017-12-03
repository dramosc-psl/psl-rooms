import { Component } from '@angular/core';
import { RoomsService } from '../../providers/rooms-service/rooms-service';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  isCreatingRoom: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public roomsService: RoomsService,
              public imagePicker: ImagePicker,
              public alert: AlertController) {
    this.pageTitle = 'SALA ';
    this.room = {};
    this.floors = [1,2,3,4];
    this.isCreatingRoom = false;
  }

  newRoom() {
    this.room = {};
      this.pageTitle += 'NUEVA';
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

  createRoom() {
    const roomName = this.room.name;
    delete this.room['name'];
    this.roomsService.createRoom(roomName, this.room).then(data => {
      let alert = this.alert.create({
        title: `Sala ${this.room.name}`,
        message: 'Sala creada!',
        buttons: [{
          text: 'Aceptar',
          role: 'cancel'
        }]
      });
      alert.present();
    })
  }

  updateRoom() {
    this.roomsService.updateRoom(this.room.name, this.room).then(data => {
      let alert = this.alert.create({
        title: `Sala ${this.room.name}`,
        message: 'Sala actualizada!',
        buttons: [{
          text: 'Aceptar',
          role: 'cancel'
        }]
      });
      alert.present();
    })
  }

  ionViewDidLoad() {
    this.room.name = this.navParams.data;

    if(this.isNewRoom()) {
      this.newRoom();
      this.isCreatingRoom = true;
    } else {
      this.showRoom(this.room.name);
      this.isCreatingRoom = false;
    }
  }

  isNewRoom() {
    return Object.keys(this.room.name).length === 0;
  }

}
