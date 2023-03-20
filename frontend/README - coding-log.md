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
Taking account for if user logged in, if spot belong to user, if user has posted review yet, that is a long conditionalal render


### other feature
redirect user to home page if user tried to access manage spots page

### To do list
comment out csrf/restore in backend
Spot Detail page, image can't display if url is wrong
Sign up, validation len for username
create spot only for user logged in
manage spot in dropdown menu after login
clean up state after leaving the component, use return function of useEffect

create spot, need to add error handler for fetch request
create spot, send request to preview image

After clicking manage Spot, profile dropdown should be hidden
