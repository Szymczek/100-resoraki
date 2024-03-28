import { Component, OnInit, PLATFORM_ID, Inject, Renderer2, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main-playground',
  standalone: true,
  imports: [],
  templateUrl: './main-playground.component.html',
  styleUrl: './main-playground.component.scss'
})
export class MainPlaygroundComponent {
 playerName: string = "New Player";
 serverStatus: string = "Offline";
 serverId: number = 10;

 getServerStatus() {
  return this.serverStatus;
 }
}
