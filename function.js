const model = {

  // searchRestaurants
  searchRestaurants(keyword, restaurantList) {

    let rawRestaurants = []

    restaurantList.forEach((restaurant) => {

      const restaurantData = Object.values(restaurant)

      if (restaurantData.toString().trim().toLocaleLowerCase().includes(keyword)) {
        rawRestaurants.push(restaurant)
      }

    })

    return rawRestaurants

  },
}


module.exports = ('Model', model)