import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { ChatI, MessageI } from "../../models/task.interface";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

public chat: any;
public message: ChatI;
public room: any;
public msg: string

  constructor(
      private navParams: NavParams, 
      private modal: ModalController,
      private chatService: ChatService
      ) { }

  ngOnInit() {
    
    this.chat = this.navParams.get('chat');
    //console.log("chat local",this.chat[0]);
    this.chatService.getChat(this.chat[0].id).subscribe(room => {
      console.log("room",room)
      this.room = room;
    })
  }

  sendMessage(){
    
    const message: MessageI = {
      content: this.msg,
      date: new Date,
      type: 'text'
    }

    this.chatService.SendMessageToDB(message,this.chat[0].id)
    this.msg ="";

    //this.messages.push(this.message);
  }

  closeChat(){
    this.modal.dismiss();
  }

}
