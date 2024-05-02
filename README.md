# Application Name

## Description

This is a location booking application. The application has a single page that lists the available locations for booking. When a location is selected, a form opens to make a booking. Once created, the booking is listed on the page. You also have the option to remove and update bookings.

## Features

1. **Location Listing**: Displays a list of all available locations for booking.
2. **Booking Form**: Allows the user to make a booking by selecting a location.
3. **Booking Listing**: Displays all bookings made by the user.
4. **Booking Removal**: Allows the user to remove an existing booking.
5. **Booking Update**: Allows the user to update the details of an existing booking.

## Global State Management

This application uses React's `createContext` for global state management. 

`createContext` is a method in React that allows for passing data through the component tree without having to pass props down manually at every level. In other words, it provides a way to share values between components without having to explicitly pass a prop through every level of the tree.

In our application, we have used `createContext` to create a `BookingContext` that holds the state and functions related to bookings. This context is then provided to the components of our application using the `BookingContext.Provider` component. Any component that needs to access the booking data or functions can then use the `useContext` hook to consume our `BookingContext`.

Here are a few reasons why using `createContext` for global state management is a great choice:

1. **Prop Drilling**: Context provides a way to pass data through the component tree without having to pass props down manually at every level, solving the problem known as "prop drilling".

2. **Shared State**: It's a great way to share state between components that are not directly related in the component tree.

3. **Ease of Use**: It's built into React, so there's no need to add extra libraries for state management.

4. **Performance**: React is optimized to prevent unnecessary renders when the context data changes, making it efficient for high-level state management.

Remember, while `createContext` is a powerful feature, it's not always the best solution for every scenario. It's best used for data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language.

## How to Run the Application

To run this application, follow the steps below:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install all project dependencies with the command `npm install`.
4. Start the application with the command `npm run dev`.

The application should now be running on your `localhost` on the port specified in the console.

## Contributions

Contributions to the project are always welcome. If you have any suggestions or want to contribute, feel free to open an issue or a pull request.

## License

This project is licensed under the MIT license.

## Original Mock

Below, you have the first drafts of the application and what I originally envisioned. Note that it may differ from the delivered application.