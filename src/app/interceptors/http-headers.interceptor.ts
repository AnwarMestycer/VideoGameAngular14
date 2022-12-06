import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpHeadersInterceptor implements HttpInterceptor{
     constructor(){}
     
intercept(
    req: HttpRequest<any>, 
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {
    req = req.clone({
        setHeaders: {
            'X-RapidAPI-Key': 'ad5a245e54msha3b95acf0265954p131eb6jsn99f03b339074',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        },
        setParams:{
            key:'e40e743af2c94b0c916a8aa618fb4473'
        }
    })
    return next.handle(req)
}
}