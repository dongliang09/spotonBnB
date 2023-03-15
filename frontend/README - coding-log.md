### Log in / Sign up
css display:none will toggle the state, which will determine the dropdown is shown or not


### Landing Page
thinking it would be good to have default image when the url is not working or the url is not actually an url

### Spot Detail Page
first attempt to use ```if(oneSpot !== undefined) ``` to get value for each property, later decide to use have a variable to check for condition, then use ternary to conditionally set value for each item's value
still feel not quite working, not sure if I should use ```useState``` to update info
final decision, just key into the object that subscribe the state

### Review on Spot Detail Page
spent 1-2 hours figuring out why .map is giving me an error.
because I didn't follow the structure of the redux store state.
Once that is figured out, everything went smoothly
