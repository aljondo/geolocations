This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run with `npm start`

I chose to use React for this project. The `App` component on `componentDidMount` makes the API call, gathers all the geo_location objects,  arranges the 5 most frequent ones in order, and saves them in state.

Then, for each geolocation, a `GeoLocationCard` is rendered, displaying the amount of occurences, type of geolocation, and other info that is present. There is also a `Remove` button which removes that card from the display.
