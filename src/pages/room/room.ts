import { Component } from '@angular/core';
import { RoomsService } from '../../providers/rooms-service/rooms-service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  room: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public roomsService: RoomsService) {
    this.room = {};
  }


  showRoom(name) {
    this.roomsService.getRoom(name).then(room => {
      this.room = room;
    });
  }

  ionViewDidLoad() {
    this.showRoom(this.navParams.data);
  }

}
