import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';          

interface Player {
  name: string;
  created: string;
  kills: number;
  showDetails: boolean;
}

interface Log {
  created: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-main-playground',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './main-playground.component.html',
  styleUrl: './main-playground.component.scss'
})

export class MainPlaygroundComponent {
  today: Date = new Date();
  todayDate: string = this.today.toISOString().slice(0, 10);
  serverStatus: string = "Offline";
  serverId: number = 10;
  username: string = "";
  playerCreated: boolean = false;
  players: Player[] = [
    { name: 'Player 1', created: this.todayDate, kills: 10, showDetails: false },
    { name: 'Player 2', created: this.todayDate, kills: 15, showDetails: false }
  ];
  logs: Log[] = [
    {created: this.todayDate, type: "Info", description: "First log"}
  ];
  pressed: boolean = false;

  addPlayer() {
    this.players.push({ name: this.username, created: this.todayDate, kills: 0, showDetails: false });
    this.playerCreated = true;
    this.resetName();
  }

  getServerStatus() {
    return this.serverStatus;
  }

  resetName() {
    this.username = "";
  }

  addLog(type: string, description: string){
    this.logs.push({created:this.todayDate, type:type, description:description})
  }

  toggleDetails(player: Player) {
    player.showDetails = !player.showDetails;
  }
}