module.exports = {
  Query: {
    calculatePrice: (parent, args, context) => {
      console.log({ parent, args, context })
      return 2.3
    }
  }
}