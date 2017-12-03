import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RoomsService } from '../../providers/rooms-service/rooms-service';
import { RoomPage } from '../room/room';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rooms: any;
  roomsList: any[] = [];

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public roomsService: RoomsService) {
  }

  ionViewWillEnter() {
    this.getRooms();
  }

  showRoom(name) {
    this.navCtrl.push(RoomPage, name);
  }

  newRoom() {
    this.navCtrl.push(RoomPage);
  }

  getRooms() {
    this.roomsList = [];
    let loader = this.loadingCtrl.create({
      content: 'Loading rooms...'
    });

    loader.present().then(() => {
      this.roomsService.getRooms().then(room => {
        this.rooms = room;
        for (const key in this.rooms) {
          this.roomsList.push({
            name: key,
            asientos: this.rooms[key].asientos,
            fechaLimpieza: this.rooms[key].fechaLimpieza,
            imagen: this.rooms[key].imagen,
            ocupada: this.rooms[key].ocupada,
            ubicacion: this.rooms[key].ubicacion
          });
        }
        loader.dismiss();
      });
    });
  }
}
