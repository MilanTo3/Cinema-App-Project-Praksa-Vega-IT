# Delta Internship - Cinema App - Requirements

Cinema App is a web application for displaying the current cinema repertoire and making ticket reservations.

There are two types of users: Customers and Admins

## Requirements

### User requirements
- As a user, I can log in using my email or username and password.
    - Users have name, date of birth, email, and role (Admin or Customer).
- As a user, I can log out.
- As a user, I can click on a logo to jump to the homepage (Cinema Repertoire).
- As a user, I can see a footer with copyright information on every page.
- As a user, I can change my password.
- As a user, if I forget my password I can request a new one from the login page.
    - Current user's password is invalidated. The user can't log in to the application.
    - User gets an email with a link for setting the new password.

### Customer requirements
- As a customer, I can create an account or use the application as a guest user.
    - After account creation, an email is sent to the new customer with a link for account verification.
    - Customers can't log in and use the application if their account is not verified.
- As a customer, I can see the cinema repertoire on the homepage.
    - I can filter movie screenings by day (date). Today's screenings are always shown by default.
    - Each movie is shown only once for the selected day and it displays all available screenings for that day.
    - I can see and filter movie screenings for the next 7 days only.
    - I can filter movie screenings by genre. This works in union with the day filter.
    - I can sort movie screenings chronologically and alphabetically. This works in union with the day and the genre filters.
    - Movie screenings that have passed are disabled for reservation.
    - After choosing the desired screening, I am redirected to the reservation page.
- As a customer, I can reserve tickets through the reservation page.
    - I can see screening details.
    - I can see a graphic representation of seats. Seats are colored differently if available, occupied, or selected.
    - I can select available seats I want to reserve.
    - Each seat has a unique tag for identification (similar to chessboard squares).
    - I can enter the number of tickets I want to buy and see the total price. The total price gets recalculated on every change in the number of tickets.
    - If I am an unauthenticated customer, I have to enter my email address as well. Otherwise, the email address from my account is used.
    - If I am an authenticated customer, I get a 5% discount on the total price.
    - When choosing to make a reservation, I get prompted to confirm the action.
    - Each reservation gets a unique code for identification.
    - After making a reservation, the customer is informed if the reservation was successful or not.
    - Email with reservation details is sent to the customer if the reservation was successful.
- As an authenticated customer, I can see my current and past reservations.
    - Reservations are divided into current and past based on the date and time of the movie screening.
    - For every reservation, I can see the poster image, movie name, date and time, number of tickets, chosen seats, and total price.
    - I can cancel any of my current reservations.

### Admin requirements
- As an admin, I can do everything that a customer can do.
- As an admin, I can manage Genres, Movies, Movie Screenings, and Customers uniformly.
    - I can view them all in a list.
    - I can view a list of all letters. Selecting a letter from this list filters the entities to only those whose name starts with that letter.
    - I can select multiple letters. The result is a union of all selected letters.
    - I can search for the entities using their names. This works in union with the first letter filter.
    - All result views are paginated on the server.
- As an admin, I can add, edit, and delete Genres.
    - Genres have unique names.
    - When deleting a genre, the admin gets prompted to confirm the deletion.
- As an admin, I can add, edit, and delete Movies.
    - Movies have poster image, name, original name, and duration.
    - Every movie is categorized into one or more genres.
    - When deleting a movie, the admin gets prompted to confirm the deletion.
- As an admin, I can add, edit, and delete Movie Screenings.
    - Every movie can have one or more screenings.
    - Movie Screenings have date, time, and ticket price.
    - When adding a movie screening, the number of available seats has to be defined. Number of seats is set as a number of rows and columns.
    - When deleting a movie screening, the admin gets prompted to confirm the deletion.
- As an admin, I can block customers from accessing the application.
    - Blocked customers can't log in to the application.
- As an admin, I can reset customers' passwords.
    - Current customer's password is invalidated. The customer can't log in to the application.
    - Customer gets an email with a link for setting the new password.

### _Additional requirements_
- As an authenticated customer, I can rate my past reservations
    - I can choose a rating from 1 to 5 stars.
    - Each movie has an average rating that is calculated from all rated reservations of that movie.
    - Movie rating is displayed using stars within movie screenings on the homepage, and past and current reservations.
