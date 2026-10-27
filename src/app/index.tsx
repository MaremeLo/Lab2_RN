 import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.screen}>
      <Link href="/conversation" style={styles.link}>
        Conversation
      </Link>
      <Link href="/contacts" style={styles.link}>
        Contacts
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#fff",
  },
  link: { fontSize: 18, color: "#1a5276", padding: 8 },
});