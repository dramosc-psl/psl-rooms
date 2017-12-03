import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoomsService {
  baseUrl = 'https://psl-rooms-dramosc.firebaseio.com';

  constructor(public http: Http) {
  }

  getRooms() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/rooms.json`)
      .subscribe(res => resolve(res.json()));
    });
  }

  getRoom(name) {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/rooms/${name}.json`)
      .subscribe(res => resolve(res.json()));
    });
  }

  deleteRoom(name) {
    return new Promise(resolve => {
      this.http.delete(`${this.baseUrl}/rooms/${name}.json`)
      .subscribe(res => resolve(res.json()));
    });
  }

  updateRoom(name, newProps) {
    console.log(name, newProps);
    return new Promise(resolve => {
      this.http.patch(`${this.baseUrl}/rooms/${name}.json`, JSON.stringify(newProps))
      .subscribe(res => resolve(res.json()));
    });
  }

  createRoom(name, newProps) {
    console.log(name, newProps);
    return new Promise(resolve => {
      this.http.patch(`${this.baseUrl}/rooms/${name}.json`, JSON.stringify(newProps))
      .subscribe(res => resolve(res.json()));
    });
  }

  // createRoom(props) {
  //   const name = props.name;
  //   const room = Object.assign(props);
  //   delete room[name];
  //   return new Promise (resolve => {
  //     this.http.post(`${this.baseUrl}/rooms/${name}.json`, JSON.stringify(room))
  //     .subscribe(res => resolve(res.json()));
  //   });
  // }

}
