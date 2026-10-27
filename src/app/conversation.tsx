 import { Image } from "expo-image";
import { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = { id: string; text: string; mine: boolean };

const START_MESSAGES: Message[] = [
  { id: "1", text: "Hi!", mine: false },
  { id: "2", text: "Hello 👋", mine: true },
  { id: "3", text: "How are you?", mine: false },
];

function Bubble({ text, mine }: { text: string; mine: boolean }) {
  return (
    <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
      <Text style={mine ? styles.mineText : styles.theirsText}>{text}</Text>
    </View>
  );
}

export default function Conversation() {
  const [messages, setMessages] = useState<Message[]>(START_MESSAGES);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), text, mine: true }]);
    setDraft("");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topBar}>
          <Image source="https://i.pravatar.cc/100?u=c1" style={styles.topAvatar} />
          <Text style={styles.topName}>Awa Diop</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => <Bubble text={item.text} mine={item.mine} />}
          style={styles.messages}
          contentContainerStyle={{ paddingVertical: 8 }}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.empty}>No messages yet. Say hello.</Text>
          }
          ListHeaderComponent={
            messages.length > 0 ? (
              <Text style={styles.dateLabel}>Today</Text>
            ) : undefined
          }
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Message…"
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
          />
          <Pressable style={styles.sendBtn} onPress={send}>
            <Text style={styles.sendText}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  topAvatar: { width: 36, height: 36, borderRadius: 18 },
  topName: { fontSize: 17, fontWeight: "600" },

  messages: { flex: 1, paddingHorizontal: 12 },
  bubble: {
    maxWidth: "75%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  mine: { alignSelf: "flex-end", backgroundColor: "#1a5276" },
  theirs: { alignSelf: "flex-start", backgroundColor: "#eee" },
  mineText: { color: "#fff" },
  theirsText: { color: "#000" },

  empty: { textAlign: "center", color: "#888", paddingVertical: 32 },
  dateLabel: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    paddingBottom: 8,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a5276",
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: { color: "#fff", fontSize: 16 },
});