const model = {

  // searchRestaurants
  searchRestaurants(keyword) {

    let rawRestaurants = []

    restaurantList.results.forEach((restaurant) => {

      const restaurantData = Object.values(restaurant)

      if (restaurantData.toString().trim().toLocaleLowerCase().includes(keyword)) {
        rawRestaurants.push(restaurant)
      }

    })

    return rawRestaurants

  },
}


module.exports = ('Model', model)