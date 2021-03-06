import {Injectable} from '@angular/core';
import {Observable, of, observable} from 'rxjs';
import {Auction} from '../../_interfaces/auction.interface';
import {AUCTION_MOCK_LIST} from '../../_helpers/mocks/auction-list.mock';
import * as R from 'ramda';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuctionService {


  constructor(private readonly httpClient: HttpClient) {
  }
  private mockAuctionList: Auction[] = AUCTION_MOCK_LIST;
  private auctions: Auction[] = [];

  createAuction(text: string): Observable<Auction> {
    const auction: Auction = {
      id: (new Date()).getDate(),
      text,
      completed: false
    };
    this.mockAuctionList = this.mockAuctionList.concat(auction);
    return of(auction);
  }

  getAuctions(): Observable<Auction[]> {
    return this.httpClient.get<Auction[]>(`${environment.apiUrl}/auction/getAll`);
  }

  toggleAuction(id: number): Observable<Auction> {
    const auctionIndex = this.mockAuctionList.findIndex((auction: Auction) => auction.id === id);
    const updatedAuction: Auction = {
      ...this.mockAuctionList[auctionIndex],
      completed: !this.mockAuctionList[auctionIndex].completed
    };
    const newAuctionList = R.clone(this.mockAuctionList);
    newAuctionList[auctionIndex] = updatedAuction;
    return of(updatedAuction);
  }
}
