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
redirect user to home page if user not log in and user tried to access manage spots page
redirect user to home page if user not log in and user tried to create new spot


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


### Booking
20230531
there is a difference on between bookings depending on if you own the spot.
For safty reason, there is no id for booking if you don't own the spot, therefore, in the redux state, can't use id as key for each object when we try to normalize the data. Instead, I use start date as the key.

need to block some of the dates because they have bookings already
isDayBlocked ?


## Image on spot detail page
define the layout with grid, the 4 pictures of the right side gave me the most trouble. The picture went outside the grid cells.
The one on the left side was fine when I set the width 100% and max-height 100% and object-fit:cover.
I thought 4 pictures would do the same when I apply those properties.
The solution is that set the grid area, each grid area will also have width 100% and max-height 100% and object-fit:cover

## use fontAwesome icon on google map API
the document says I can put the url of the img on the icon property, but I I just want to use the fontAwesome icon without installing any new dependency.
I saw one example importing an icon from a dependency, that is close to what I want, but not there yet.
At the end, I figure out I just need to replace the path with the one on SVG from fontAwesome website
lat and lng must be number type

## showing block days on update booking
each BookingCard component will have different spotId and different set of bookings related to that spot, so it is not possible to update the redux state for every spot for getting the bookings for individual spot.
Therefore, need to dispatch a thunk action to get all bookings related to that spot when we click on the update buttoon or the update modal, that means we need to useEffect. Since we need to await for the response to come back, we need to use async function call inside useEffect. I use anonymous async function call inside regaular function call to achieve the goal of getting data of booked days.
