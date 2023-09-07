import {Injectable, signal} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Quote} from "../../core/models/quote";
import {Observable, share} from "rxjs";
import {quoteResponse} from "../../core/models/http-response";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private basePath = environment.serverUrl;
  quotes = signal<Quote[]>([]);
  constructor(private http: HttpClient) { }

  getAllQuotes():Observable<quoteResponse<Quote[]>> {
    const req = this.http.get<quoteResponse<Quote[]>>(`${this.basePath}/quote`,{withCredentials: true}).pipe(share());
    req.subscribe({
      next: (res) => {
        this.quotes.set(res.data)
        console.log(res)
      }
    })

    return req
  }
  getRandomQuote(): Observable<quoteResponse<Quote>>{
    const req = this.http.get<quoteResponse<Quote>>(`${this.basePath}/quote/randomQuote`, {withCredentials: true}).pipe(share())
    return req
  }
}
