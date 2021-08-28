import React, { useState } from "react"
import { CheckBox } from "react-native-elements"
import { Button, Text } from "react-native-elements"
import { StyleSheet, View, ScrollView } from "react-native"

import { useContact } from "../contexts/ContactsProvider"
import { useConversation } from "../contexts/ConversationsProvider"

export default function NewConversationModal({ navigation }) {
  const { contacts } = useContact()
  const { createConversation } = useConversation()
  const [selectedContactIds, setSelectedContactIds] = useState([])

  function handleSubmit() {
    if (selectedContactIds.length === 0) return

    createConversation(selectedContactIds)
    navigation.goBack()
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds(prevSelectedIds => {
      if (prevSelectedIds.includes(contactId)) {
        return prevSelectedIds.filter(prevId => {
          return prevId !== contactId // remove id if it's already in the list
        })
      } else {
        return [...prevSelectedIds, contactId] // add id to the list
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text h1 h1Style={styles.text}>
          Create new conversation
        </Text>
        <Text h3 style={styles.contacts}>
          Your contacts
        </Text>
      </View>
      <View style={styles.scrollView}>
        <ScrollView>
          {contacts.map(contact => (
            <CheckBox
              key={contact.id}
              title={contact.name}
              checked={selectedContactIds.includes(contact.id)}
              onPress={() => handleCheckboxChange(contact.id)}
            />
          ))}
        </ScrollView>
      </View>
      <Button
        title="Start a chat"
        type="outline"
        containerStyle={styles.button}
        disabled={selectedContactIds.length === 0}
        onPress={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },

  contacts: {
    color: "#bbbb",
    marginTop: 10
  },

  textView: {
    marginLeft: 5,
    top: 10,
    position: "absolute"
  },

  scrollView: {
    height: 400,
    justifyContent: "flex-end"
  },

  text: {
    color: "#fff"
  },

  button: {
    position: "absolute",
    bottom: "5%",
    width: "100%"
  }
})
