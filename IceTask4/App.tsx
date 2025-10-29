import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";
import CustomerScreen from "./screens/CustomerScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";

export const AppContext = createContext<any>(null);

const Stack = createStackNavigator();

export default function App() {
  // shared state: cars and booking
  const [cars, setCars] = useState([
    // seed data with images (remote free images)
    {
      id: "1",
      make: "Alfa Romeo",
      model: "4C",
      costPerDay: 450,
      image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
    },
    {
      id: "2",
      make: "Mercedes",
      model: "AMG-GT",
      costPerDay: 400,
      image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg"
    }
  ]);
  const [booking, setBooking] = useState(null); // { car, days, total }

  return (
    <AppContext.Provider value={{ cars, setCars, booking, setBooking }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen as any} />
          <Stack.Screen name="Admin" component={AdminScreen as any} />
          <Stack.Screen name="Customer" component={CustomerScreen as any} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen as any} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
