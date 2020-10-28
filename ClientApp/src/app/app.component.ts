import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface Shuttle {
  accumulatedShuttleDistance: number;
  speedLevel: number;
  shuttleNo: number;
  speed: string;
  levelTime: string;
  commulativeTime: string;
  startTime: string;
  approxVo2Max: string;
}

interface Athlete {
  id: number;
  name: string;
  levelReached: string;
  warned: boolean;
  stopped: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  athletes: Array<Athlete> =[{
    id:1,
    name:"Ashton Eaton",
    levelReached:"",
    stopped: false,
    warned: false
  },{
    id:2,
    name:"Bryan Clay",
    levelReached:"",
    stopped: false,
    warned: false
  },{
    id:3,
    name:"Dean Karnazes",
    levelReached:"11-5",
    stopped: true,
    warned: true
  },{
    id:3,
    name:"Usain Bolt",
    levelReached:"9-10",
    stopped: true,
    warned: true
  }]
  shuttles: Array<Shuttle> = [];
  faChevronLeft = faChevronLeft;
  faPlay = faPlay;
  nextShuttle: string = "0:00";
  totalTime: string = "0:00";
  totalDistance: number= 0;
  percentage: number = 0;
  currentShuttle: Shuttle = null;
  http: HttpClient;
  baseUrl: string;
  gameEnded: boolean = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.http.get<Shuttle[]>(this.baseUrl + 'shuttle').subscribe(result => {
      this.shuttles = result;
    }, error => console.error(error));
  }

  play(){
    let index = 0;
    this.setShuttle(index);
    setTimeout(function shuttleFun(){
      index++;
      if(index < this.shuttles.length && !this.gameEnded){
        this.setShuttle(index);
        setTimeout(shuttleFun.bind(this),parseFloat(this.currentShuttle.levelTime)*1000);
      }
    }.bind(this),parseFloat(this.currentShuttle.levelTime)*1000)

  }
  
  setShuttle(index: number){
    this.currentShuttle = this.shuttles[index];
    this.percentage = ((index+1)/this.shuttles.length)*100;
    this.totalTime = this.currentShuttle.commulativeTime;
    this.totalDistance = this.currentShuttle.accumulatedShuttleDistance;
    this.nextShuttle = (index + 1) <  this.shuttles.length ? this.shuttles[index+1].levelTime : "0:00";
  }

  stop(index: number){
    this.athletes[index].stopped = true;
    this.athletes[index].levelReached = this.currentShuttle.speedLevel + ' - ' + this.currentShuttle.shuttleNo;
    if (!this.athletes.filter((item: Athlete) => item.stopped === false).length) {
      this.gameEnded = true;
      this.currentShuttle = null;
      this.percentage = 0;
    }
  }

  warn(index: number){
    this.athletes[index].warned = true;
  }
}
