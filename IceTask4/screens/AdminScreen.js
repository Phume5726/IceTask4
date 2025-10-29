import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Animated } from "react-native";
import { AppContext } from "../App";
import { v4 as uuidv4 } from "uuid"; // small helper - we'll provide fallback if not installed

// If you don't want to install uuid, we'll create a simple id generator below
const makeId = () => Math.random().toString(36).slice(2, 9);

export default function AdminScreen({ navigation }) {
  const { cars, setCars } = useContext(AppContext);
  const [makeText, setMakeText] = useState("");
  const [modelText, setModelText] = useState("");
  const [costText, setCostText] = useState("");

  // simple slide animation for add panel
  const slide = React.useRef(new Animated.Value(-50)).current;
  React.useEffect(() => {
    Animated.timing(slide, { toValue: 0, duration: 500, useNativeDriver: true }).start();
  }, []);

  const addCar = () => {
    const cost = Number(costText);
    if (!makeText.trim() || !modelText.trim() || isNaN(cost) || cost <= 0) {
      alert("Please enter valid make, model and cost per day.");
      return;
    }
    const newCar = {
      id: makeId ? makeId() : makeId(),
      make: makeText.trim(),
      model: modelText.trim(),
      costPerDay: cost,
      // simple default image for added cars
      image:
        "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
    };
    setCars((prev) => [newCar, ...prev]);
    // clear inputs
    setMakeText("");
    setModelText("");
    setCostText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin — Add a Car</Text>

      <Animated.View style={[styles.card, { transform: [{ translateY: slide }] }]}>
        <TextInput placeholder="Make (e.g. Toyota)" placeholderTextColor="#94a3b8" value={makeText} onChangeText={setMakeText} style={styles.input} />
        <TextInput placeholder="Model (e.g. Corolla)" placeholderTextColor="#94a3b8" value={modelText} onChangeText={setModelText} style={styles.input} />
        <TextInput placeholder="Cost per day (R)" placeholderTextColor="#94a3b8" value={costText} onChangeText={setCostText} style={styles.input} keyboardType="numeric" />
        <TouchableOpacity style={styles.addBtn} onPress={addCar}>
          <Text style={styles.addBtnText}>Add Car</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.sub}>Available Cars</Text>

      <FlatList
        style={{ width: "100%" }}
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.carTitle}>{item.make} {item.model}</Text>
              <Text style={styles.carSub}>R{item.costPerDay} / day</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerBtn, { backgroundColor: "#e11d48" }]} onPress={() => navigation.replace("Login")}>
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerBtn, { backgroundColor: "#06b6d4" }]} onPress={() => navigation.replace("Customer")}>
          <Text style={styles.footerText}>Switch to Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071126", paddingTop: 50, paddingHorizontal: 16, alignItems: "center" },
  header: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { width: "100%", backgroundColor: "#0b2436", padding: 14, borderRadius: 12, marginBottom: 12 },
  input: { backgroundColor: "#071826", color: "#fff", padding: 12, marginVertical: 6, borderRadius: 8 },
  addBtn: { backgroundColor: "#10b981", padding: 12, alignItems: "center", borderRadius: 10, marginTop: 6 },
  addBtnText: { color: "#fff", fontWeight: "700" },
  sub: { color: "#94a3b8", alignSelf: "flex-start", marginTop: 10, marginBottom: 6 },
  listItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#071826", padding: 10, borderRadius: 10 },
  thumb: { width: 84, height: 56, borderRadius: 8 },
  carTitle: { color: "#fff", fontWeight: "700" },
  carSub: { color: "#94a3b8", marginTop: 4 },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, width: "100%" },
  footerBtn: { flex: 1, padding: 12, alignItems: "center", borderRadius: 10, marginHorizontal: 6 },
  footerText: { color: "#fff", fontWeight: "700" }
});
