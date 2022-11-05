import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { APIResponse, Game } from "../models/game.model";
const BASE_API = environment.url;
@Injectable({
    providedIn:'root'
})
export class DataService{

    constructor(private http: HttpClient){}

    getGameList(
        ordering:string,
        search?:string
        ):Observable<APIResponse<Game>>{
        let params = new HttpParams().set('ordering', ordering);
        if(search){
            params = new HttpParams().set('ordering', ordering).set('search', search)
        }
        return this.http.get<APIResponse<Game>>(`${BASE_API}`, {
            params:params,   
        }
        )
    }
}