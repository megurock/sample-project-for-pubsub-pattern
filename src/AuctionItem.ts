interface AuctionItemParams {
  name: string
  price: number
  descriptions: string
}

export default class AuctionItem {
  private _id
  private _name
  private _price
  private _descriptions
  private _onAuction = true

  constructor({ name, price, descriptions }: AuctionItemParams) {
    const { v4: uuidv4 } = require('uuid')
    this._id = uuidv4()
    this._name = name
    this._price = price
    this._descriptions = descriptions
  }

  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get price() {
    return this._price
  }
  get descriptions() {
    return this._descriptions
  }
  get onAuction() {
    return this._onAuction
  }
  set onAuction(value: boolean) {
    this._onAuction = value
  }
}
