import React, { useState, useRef } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { Input, Button, Text } from "react-native-elements"
import { useConversation } from "../contexts/ConversationsProvider"

const styles = StyleSheet.create({
  messageInput: {
    height: 50,
    borderRadius: 0,
    backgroundColor: "#141414",
    borderColor: "#0d6efd",
    color: "#ddd"
  },

  firstView: {
    flexDirection: "column",
    flexGrow: 1
  },

  secondView: {
    flexGrow: 1,
    height: 100,
    marginEnd: 5
  },

  thirdView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 3
  },

  fourthView: {
    marginVertical: 2,
    flexDirection: "column"
  },

  fifthView: {
    borderRadius: 3,
    padding: 5
  }
})

export default function OpenConversation() {
  const scrollViewRef = useRef()
  const [text, setText] = useState("")
  const { sendMessage, selectedConversation } = useConversation()

  function scrollToBottom() {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }

  function handleSubmit() {
    if (!text) return

    const recipients = selectedConversation.recipients.map(
      recipient => recipient.id
    )

    sendMessage(recipients, text)
    setText("")
  }

  return (
    <View style={styles.firstView}>
      <ScrollView
        style={styles.secondView}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
      >
        <View style={styles.thirdView}>
          {selectedConversation.messages.map((message, index) => {
            return (
              <View
                key={index}
                style={{
                  ...styles.fourthView,
                  alignItems: message.fromMe ? "flex-end" : "flex-start"
                }}
              >
                <View
                  style={{
                    ...styles.fifthView,
                    backgroundColor: message.fromMe ? "#0d6efd" : "#141414",
                    borderColor: message.fromMe ? null : "#fff",
                    borderWidth: message.fromMe ? null : 1,
                    borderRadius: 3
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 20 }}
                    selectable={true}
                  >
                    {message.text}
                  </Text>
                </View>
                {!message.fromMe && (
                  <View>
                    <Text style={{ color: "#bbbb" }} selectable={true}>
                      {message.senderName}
                    </Text>
                  </View>
                )}
              </View>
            )
          })}
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", width: "85%" }}>
        <Input
          multiline
          numberOfLines={2}
          placeholder="Type a message..."
          value={text}
          inputStyle={{ color: "#eee" }}
          inputContainerStyle={{ borderBottomColor: "#0d6efd" }}
          onChangeText={value => setText(value)}
        />
        <Button
          type="outline"
          containerStyle={{ alignSelf: "flex-end", marginBottom: 25 }}
          icon={{ type: "font-awesome", name: "paper-plane", color: "#0d6efd" }}
          onPress={handleSubmit}
        />
      </View>
    </View>
  )
}
