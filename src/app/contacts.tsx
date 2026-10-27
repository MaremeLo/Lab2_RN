 import { Image } from "expo-image";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTACTS, Contact } from "../data/contacts";

type RowProps = {
  contact: Contact;
  selected: boolean;
  onPress: () => void;
};

function ContactRow({ contact, selected, onPress }: RowProps) {
  // Step 10 experiment: uncomment to count renders
  // console.log("render row", contact.name);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, selected && styles.rowSelected]}
    >
      <Image
        source={`https://i.pravatar.cc/100?u=${contact.id}`}
        style={styles.avatar}
      />
      <View style={styles.rowText}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.program}>{contact.program}</Text>
      </View>
      {selected && <Text style={styles.check}>✓</Text>}
    </Pressable>
  );
}

export default function Contacts() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      CONTACTS.filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id} // Step 10 experiment: (c, index) => String(index)
        renderItem={({ item }) => (
          <ContactRow
            contact={item}
            selected={item.id === selectedId}
            onPress={() => setSelectedId(item.id)}
          />
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.h1}>Contacts</Text>
              <Text style={styles.count}>({filtered.length})</Text>
            </View>
            <TextInput
              style={styles.search}
              placeholder="Search…"
              value={query}
              onChangeText={setQuery}
            />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.empty}>{`No contact matches "${query}".`}</Text>
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  rowSelected: {
    backgroundColor: "#dbeafe",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  rowText: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  program: { fontSize: 13, color: "#666" },
  check: { fontSize: 18, color: "#1a5276" },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  h1: { fontSize: 22, fontWeight: "bold", color: "#1a5276" },
  count: { color: "#888" },
  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  separator: { height: 1, backgroundColor: "#e5e5e5" },
  empty: { textAlign: "center", color: "#888", paddingVertical: 32 },
});