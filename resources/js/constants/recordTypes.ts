export enum RecordType {
  ASSET_PURCHASE = 'Asset Purchase',
  CREDIT_PURCHASE = 'Credit Purchase',
  AUCTION_BID = 'Auction Bid',
  AUCTION_ASSIGNMENT = 'Auction Assignment'
}

export const recordTypeLabels: Record<RecordType, string> = {
    [RecordType.ASSET_PURCHASE]: 'Compraventa de inmueble',
    [RecordType.CREDIT_PURCHASE]: 'Compraventa de crédito',
    [RecordType.AUCTION_BID]: 'Postura en subasta',
    [RecordType.AUCTION_ASSIGNMENT]: 'Cesión de remate',
}
