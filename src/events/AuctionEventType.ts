export default class AuctionEventType {
  public static readonly CLOSED: Symbol = Symbol()
  public static readonly PAYMENT_SUCCESS: Symbol = Symbol()
  public static readonly PAYMENT_FAIL = Symbol()

  private constructor() {}
}
