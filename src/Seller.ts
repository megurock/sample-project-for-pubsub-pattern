import AuctionEventType from './events/AuctionEventType'
import AuctionObserver from './AuctionObserver'
import AuctionItem from './AuctionItem'
import BidEventType from './events/BidEventType'
import BidList from './BidList'

export default class Seller extends AuctionObserver {
  private _id
  private _name
  private _items: AuctionItem[]

  constructor(name: string) {
    super()
    const { v4: uuidv4 } = require('uuid')
    this._name = name
    this._id = uuidv4()
    this._items = []
  }

  get name() {
    return this._name
  }
  get id() {
    return this._id
  }
  get items() {
    return this._items
  }

  addItem(item: AuctionItem) {
    BidList.add(item, this)
    this._items.push(item)
    return this._items
  }

  update(type: Symbol, item: AuctionItem): void {
    switch (type) {
      case BidEventType.UPDATE:
        console.log(`Bid for ${item} has been updated.`)
        break
      case AuctionEventType.CLOSED: {
        console.log(`[${this.name}] closed.`)
        break
      }
      case AuctionEventType.PAYMENT_SUCCESS: {
        console.log(`[${this.name}] paid.`)
        break
      }
    }
  }
}
