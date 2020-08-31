module.exports = `
  enum EntityType {
    buy
    sell
  }

  type Query {
    calculatePrice(type: EntityType, margin: Float, exchangeRate: Float): Float!
  }
`;