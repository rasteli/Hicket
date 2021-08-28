import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

import Join from "./components/Join"
import Navigator from "./components/Navigator"
import useAsyncStorage from "./hooks/useAsyncStorage"
import { SocketProvider } from "./contexts/SocketProvider"
import { ContactsProvider } from "./contexts/ContactsProvider"
import { ConversationsProvider } from "./contexts/ConversationsProvider"

export default function App() {
  const [id, setId] = useAsyncStorage("id")

  const navigator = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Navigator id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    <SafeAreaProvider style={{ backgroundColor: "#141414" }}>
      <StatusBar style="inverted" />
      {id ? navigator : <Join onIdSubmit={setId} />}
    </SafeAreaProvider>
  )
}
