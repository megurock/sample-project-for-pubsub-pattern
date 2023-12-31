import AuctionObserver from './AuctionObserver'
import AuctionItem from './AuctionItem'
import AuctionEventType from './events/AuctionEventType'
import BidEventType from './events/BidEventType'
import BidList from './BidList'

export default class Buyer extends AuctionObserver {
  private _id
  private _name

  constructor(name: string) {
    super()
    const { v4: uuidv4 } = require('uuid')
    this._name = name
    this._id = uuidv4()
  }

  get name() {
    return this._name
  }
  get id() {
    return this._id
  }

  update(type: Symbol, item: AuctionItem): void {
    switch (type) {
      case BidEventType.UPDATE: {
        const bidList = BidList.get(item)
        const [highestBidder] = bidList?.history.at(-1) ?? []
        const isHighestBidder = highestBidder?.id === this.id
        if (isHighestBidder) {
          console.log(`[${this.name}] the highest bidder.`)
        } else {
          console.log(`[${this.name}] isn't the highest bidder.`)
        }
        break
      }
      case BidEventType.FAIL: {
        console.log(`[${this.name}] failed to bid.`)
        break
      }
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
