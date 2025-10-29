import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  Animated
} from "react-native";
import { AppContext } from "../App";

export default function CustomerScreen({ navigation }) {
  const { cars, setBooking, booking } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const [days, setDays] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);

  // small bounce animation for list items
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const selectCar = (car) => {
    setSelected(car);
    // animate briefly
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 90, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 90, useNativeDriver: true })
    ]).start();
  };

  const openBooking = () => {
    if (!selected) {
      alert("Please select a car first.");
      return;
    }
    const nDays = Math.max(1, Math.floor(Number(days) || 1));
    const total = selected.costPerDay * nDays;
    setBooking({ car: selected, days: nDays, total });
    setModalVisible(true);
  };

  const confirm = () => {
    setModalVisible(false);
    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer — Rent a Car</Text>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <Animated.View style={{ transform: [{ scale: selected && selected.id === item.id ? scaleAnim : 1 }] }}>
            <TouchableOpacity onPress={() => selectCar(item)} activeOpacity={0.8} style={[styles.item, selected && selected.id === item.id ? styles.itemSelected : {}]}>
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.title}>{item.make} {item.model}</Text>
                <Text style={styles.subtitle}>R{item.costPerDay} / day</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      <View style={styles.controls}>
        <TextInput keyboardType="numeric" value={days} onChangeText={setDays} style={styles.input} />
        <TouchableOpacity style={styles.bookBtn} onPress={openBooking}>
          <Text style={styles.bookText}>Book Car</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Booking Summary</Text>
            {booking && (
              <>
                <Text style={styles.modalLine}>{booking.car.make} {booking.car.model}</Text>
                <Text style={styles.modalLine}>Days: {booking.days}</Text>
                <Text style={[styles.modalLine, { fontWeight: "900", fontSize: 18 }]}>Total: R{booking.total}</Text>

                <View style={{ flexDirection: "row", marginTop: 18 }}>
                  <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#10b981" }]} onPress={confirm}>
                    <Text style={styles.modalBtnText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#ef4444" }]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalBtnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={{ width: "100%", marginTop: 10 }}>
        <TouchableOpacity style={[styles.switchBtn, { backgroundColor: "#0ea5e9" }]} onPress={() => navigation.replace("Admin")}>
          <Text style={styles.switchText}>Switch to Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.switchBtn, { backgroundColor: "#ef4444", marginTop: 8 }]} onPress={() => navigation.replace("Login")}>
          <Text style={styles.switchText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#021523", paddingTop: 50, paddingHorizontal: 16 },
  header: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 12, alignSelf: "center" },
  item: { flexDirection: "row", backgroundColor: "#032a3a", padding: 10, borderRadius: 12, marginBottom: 10, alignItems: "center" },
  itemSelected: { borderWidth: 2, borderColor: "#06b6d4" },
  thumb: { width: 110, height: 64, borderRadius: 8 },
  title: { color: "#fff", fontWeight: "700" },
  subtitle: { color: "#94a3b8", marginTop: 6 },
  controls: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  input: { backgroundColor: "#071826", color: "#fff", padding: 12, borderRadius: 10, flex: 1, marginRight: 8 },
  bookBtn: { backgroundColor: "#10b981", padding: 12, borderRadius: 10 },
  bookText: { color: "#fff", fontWeight: "700" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "86%", backgroundColor: "#fff", padding: 18, borderRadius: 12, alignItems: "center" },
  modalTitle: { fontWeight: "800", fontSize: 18, marginBottom: 8 },
  modalLine: { fontSize: 16, marginTop: 6 },
  modalBtn: { padding: 12, borderRadius: 10, flex: 1, marginHorizontal: 6, alignItems: "center" },
  modalBtnText: { color: "#fff", fontWeight: "800" },
  switchBtn: { padding: 12, borderRadius: 10, alignItems: "center" },
  switchText: { color: "#fff", fontWeight: "700" }
});
