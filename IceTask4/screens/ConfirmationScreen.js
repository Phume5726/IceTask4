import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../App";

export default function ConfirmationScreen({ navigation }) {
  const { booking } = useContext(AppContext);

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No booking found</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace("Customer")}>
          <Text style={styles.btnText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { car, days, total } = booking;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Confirmed ✅</Text>

      <Image source={{ uri: car.image }} style={styles.image} />
      <Text style={styles.title}>{car.make} {car.model}</Text>
      <Text style={styles.detail}>Days: {days}</Text>
      <Text style={styles.detail}>Amount due on pickup: R{total}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace("Login")}>
        <Text style={styles.btnText}>Done (Back to Login)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071323", paddingTop: 60, alignItems: "center", paddingHorizontal: 16 },
  header: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 18 },
  image: { width: 320, height: 180, borderRadius: 12, marginBottom: 12 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  detail: { color: "#cbd5e1", marginTop: 8, fontSize: 16 },
  btn: { marginTop: 24, backgroundColor: "#06b6d4", padding: 12, borderRadius: 12 },
  btnText: { color: "#fff", fontWeight: "700" }
});
