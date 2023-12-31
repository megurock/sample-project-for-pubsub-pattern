import AuctionItem from './AuctionItem'
import AuctionController from './AuctionController'
import Buyer from './Buyer'
import Seller from './Seller'
import Creditor from './Creditor'

export default class App {
  constructor() {
    // Create some seller and buyers.
    const jobs = new Seller('Steve Jobs')
    const turing = new Buyer('Alan Turing')
    const church = new Buyer('Alonzo Church')

    // Create a controller and add major actors.
    const controller = new AuctionController()
    controller.addCreditor(Creditor.getInstance())
    controller.addSeller(jobs)
    controller.addBuyer(turing)
    controller.addBuyer(church)

    // The seller adds 2 auction items.
    jobs.addItem(
      new AuctionItem({
        name: 'iPhone 14',
        price: 14000,
        descriptions: 'The innovative product that will make our world a better place.'
      })
    )
    jobs.addItem(
      new AuctionItem({
        name: 'iPhone 15',
        price: 15000,
        descriptions: 'Another innovative product that will make our world an even better place.'
      })
    )

    // List all auction items
    const items = controller.listItems()
    console.log('[Auction Items]')
    console.table(items)

    // Find auction items by name
    const iPhones = controller.findItems('iPhone')
    console.log('[Matched Items]')
    console.table(iPhones)

    // Now, 2 buyers complete for the iPhone
    const cheapestIPhone = (iPhones ?? []).sort((itemA, itemB) => (itemA.price < itemB.price ? -1 : 1))?.[0]
    if (!cheapestIPhone) return
    // Turing (buyer) bids item
    controller.bidForItem(turing, cheapestIPhone, 14500)
    controller.bidForItem(church, cheapestIPhone, 14500)
    controller.bidForItem(church, cheapestIPhone, 14600)

    // View bids
    const bidHistory = controller.viewBids(cheapestIPhone)
    console.table(bidHistory)

    // Close auction
    controller.closeAuction(cheapestIPhone)

    // Payment
    controller.buyItem(church, cheapestIPhone)
  }
}

new App()
