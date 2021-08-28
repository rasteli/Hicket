import React from "react"
import { StyleSheet, ScrollView } from "react-native"
import { ListItem } from "react-native-elements"
import { useConversation } from "../../contexts/ConversationsProvider"

export default function Conversation({ navigation }) {
  const { conversations, selectConversationIndex } = useConversation()

  function handlePress(index, title) {
    selectConversationIndex(index)
    navigation.navigate("OpenConversation", { title })
  }

  return (
    <ScrollView style={{ flexDirection: "column", height: "100%" }}>
      {conversations?.map((conversation, index) => {
        const title = conversation.recipients
          .map(recipient => recipient.name)
          .join(", ")

        const messages = conversation.messages
        const messagesIndex = messages.length - 1
        const message = messages[messagesIndex]

        const sender = message?.fromMe ? "You" : message?.senderName

        return (
          <ListItem
            key={index}
            onPress={() => handlePress(index, title)}
            bottomDivider
            containerStyle={styles.li}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.liTitle}>{title}</ListItem.Title>
              {message && (
                <ListItem.Subtitle style={styles.liSubtitle}>
                  {`${sender}: ${message.text}`}
                </ListItem.Subtitle>
              )}
            </ListItem.Content>
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  li: {
    backgroundColor: "#141414",
    width: 10000
  },

  liTitle: {
    color: "#ddd",
    fontSize: 25
  },

  liSubtitle: {
    color: "#aaaa",
    fontSize: 15,
    marginTop: 5,
    marginBottom: -5
  }
})
