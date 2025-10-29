import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";

export default function LoginScreen({ navigation }) {
  // simple animated logo
  const fade = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: "https://images.pexels.com/photos/24353/pexels-photo.jpg" }}
        style={[styles.logo, { opacity: fade, transform: [{ scale: fade.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] }]}
        resizeMode="cover"
      />
      <Text style={styles.title}>Car Booking Service</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace("Admin")}>
        <Text style={styles.btnText}>Login as Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.btnAlt]} onPress={() => navigation.replace("Customer")}>
        <Text style={[styles.btnText, styles.btnAltText]}>Login as Customer</Text>
      </TouchableOpacity>

      <Text style={styles.small}>MAST — ICE Task 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", alignItems: "center", justifyContent: "center", padding: 20 },
  logo: { width: 160, height: 120, borderRadius: 12, marginBottom: 20, borderWidth: 2, borderColor: "#fff" },
  title: { color: "#fff", fontSize: 26, fontWeight: "700", marginBottom: 20 },
  btn: { backgroundColor: "#fff", padding: 14, width: "80%", borderRadius: 12, alignItems: "center", marginVertical: 8 },
  btnText: { color: "#0f172a", fontWeight: "700" },
  btnAlt: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#fff" },
  btnAltText: { color: "#fff" },
  small: { color: "#94a3b8", marginTop: 20 }
});
