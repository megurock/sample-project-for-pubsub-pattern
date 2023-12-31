import BidEventType from './events/BidEventType'
import AuctionItem from './AuctionItem'
import Buyer from './Buyer'
import Seller from './Seller'

export default class BidList {
  private static map = new Map<AuctionItem, BidList>()
  private _seller: Seller
  private item: AuctionItem
  private _history: [Buyer, number][]

  constructor(item: AuctionItem, seller: Seller) {
    this.item = item
    this._seller = seller
    this._history = []
  }

  static add(item: AuctionItem, seller: Seller) {
    BidList.map.set(item, new BidList(item, seller))
  }

  static get(item: AuctionItem) {
    return BidList.map.get(item)
  }

  get currentPrice() {
    return this._history.at(-1)?.[1] ?? this.item.price
  }

  get history() {
    return this._history.concat()
  }

  get seller() {
    return this._seller
  }

  get uniqueBuyers() {
    return this._history.reduce((buyers: Buyer[], [buyer]) => {
      const isUniqueBuyer = buyers.every((buyerInList) => buyerInList !== buyer)
      if (isUniqueBuyer) buyers.push(buyer)
      return buyers
    }, [])
  }

  get successfulBidder() {
    return this._history.at(-1)?.[0]
  }

  addBid(buyer: Buyer, price: number) {
    if (this.item.onAuction && price > this.currentPrice) {
      this._history.push([buyer, price])
      this.uniqueBuyers.forEach((buyer) => buyer.update(BidEventType.UPDATE, this.item))
    } else {
      buyer.update(BidEventType.FAIL, this.item)
    }
  }
}
