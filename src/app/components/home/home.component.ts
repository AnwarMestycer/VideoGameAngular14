import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from 'src/app/models/game.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   public sort:string | undefined;
   public games: Array<Game>  | undefined;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('metacrit')
      }
    })
  }
  searchGames(sort: string, search?:string):void{
    this.dataService.getGameList(sort, search).subscribe((gameList : APIResponse<Game>) => {
      this.games = gameList.results
      console.log(gameList)
    })

  }
}
