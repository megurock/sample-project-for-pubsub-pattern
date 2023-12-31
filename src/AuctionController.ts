import AuctionEventType from './events/AuctionEventType'
import AuctionItem from './AuctionItem'
import BidList from './BidList'
import Buyer from './Buyer'
import Creditor from './Creditor'
import Seller from './Seller'

export default class AuctionController {
  private sellers: Seller[]
  private buyers: Buyer[]
  private creditor: Creditor | undefined

  constructor() {
    this.sellers = []
    this.buyers = []
  }

  addSeller(seller: Seller) {
    this.sellers.push(seller)
  }

  addBuyer(buyer: Buyer) {
    this.buyers.push(buyer)
  }

  addCreditor(creditor: Creditor) {
    this.creditor = creditor
  }

  listItems() {
    return this.sellers.reduce((items: AuctionItem[], seller) => {
      return items.concat(seller.items)
    }, [])
  }

  findItems(name: string) {
    return this.listItems().filter((item) => item.name.indexOf(name) !== -1)
  }

  bidForItem(buyer: Buyer, item: AuctionItem, price: number) {
    BidList.get(item)?.addBid(buyer, price)
  }

  viewBids(item: AuctionItem) {
    return BidList.get(item)?.history
  }

  closeAuction(item: AuctionItem) {
    const eventType = AuctionEventType.CLOSED
    const bidList = BidList.get(item)
    item.onAuction = false
    this.creditor?.update(eventType, item)
    bidList?.seller.update(eventType, item)
    bidList?.uniqueBuyers.forEach((buyers) => buyers.update(eventType, item))
  }

  buyItem(buyer: Buyer, item: AuctionItem) {
    const bidList = BidList.get(item)
    const isValidBuyer = bidList?.successfulBidder === buyer
    const isAuctionOver = !item.onAuction
    const canBuy = isValidBuyer && isAuctionOver
    const eventType = canBuy ? AuctionEventType.PAYMENT_SUCCESS : AuctionEventType.PAYMENT_FAIL
    this.creditor?.update(eventType, item)
    buyer.update(eventType, item)
    BidList.get(item)?.seller.update(eventType, item)
  }
}
