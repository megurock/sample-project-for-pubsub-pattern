import AuctionObserver from './AuctionObserver'
import AuctionItem from './AuctionItem'
import AuctionEventType from './events/AuctionEventType'

export default class Creditor extends AuctionObserver {
  private static instance: AuctionObserver

  private constructor() {
    super()
  }

  static getInstance() {
    return Creditor.instance ?? new Creditor()
  }

  update(type: Symbol, item: AuctionItem): void {
    switch (type) {
      case AuctionEventType.PAYMENT_SUCCESS: {
        console.log(`[Creditor] Auction for ${item.name} is paid.`)
        break
      }
      case AuctionEventType.PAYMENT_FAIL: {
        console.log(`[Creditor] Auction for ${item.name} is paid.`)
        break
      }
    }
  }
}
