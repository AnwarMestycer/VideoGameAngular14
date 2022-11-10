import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: number;
  game: Game;
  routeSub: Subscription;
  gameSub: Subscription;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: number) {
    this.gameSub = this.dataService
      .getGameDetails(id)
      .subscribe((gameResponse: Game) => {
        this.game = gameResponse;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }
  getColor(rate: Number): string {
    if (rate > 75) {
      return '#5ee432';
    } else if (rate > 50) {
      return '#fffa50';
    } else if (rate > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }
}
