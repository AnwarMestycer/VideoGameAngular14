import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models/game.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
   public sort:string = '';
   public games: Array<Game>  | undefined;
   private routeSub: Subscription | undefined;
   private gameSub: Subscription | undefined;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('metacrit')
      } 
    })
  }
  searchGames(sort: string, search?:string):void{
    this.gameSub = this.dataService
    .getGameList(sort, search)
    .subscribe((gameList : APIResponse<Game>) => {
     this.games = gameList.results
    })

  }
  openGameDetails(id: number):void{
    this.router.navigate(['details', id])
  }

  onAddToCart(){}
  ngOnDestroy(): void {
    if(this.gameSub)
    {
      this.gameSub.unsubscribe()
    }
    if(this.routeSub)
    {
      this.routeSub.unsubscribe()
    }
  }

}
