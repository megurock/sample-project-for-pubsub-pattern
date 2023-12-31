import AuctionItem from './AuctionItem'

export default abstract class AuctionObserver {
  abstract update(type: Symbol, item: AuctionItem): void
}
