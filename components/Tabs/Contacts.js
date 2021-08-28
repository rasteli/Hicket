import React from "react"
import { StyleSheet, ScrollView } from "react-native"
import { ListItem } from "react-native-elements"
import { useContact } from "../../contexts/ContactsProvider"

export default function Contacts({ navigation }) {
  const { contacts } = useContact()

  function navigateToProfile(name, id) {
    navigation.navigate("Profile", { name, id })
  }

  return (
    <ScrollView style={{ flexDirection: "column", height: "100%" }}>
      {contacts.map(contact => (
        <ListItem
          key={contact.id}
          containerStyle={styles.li}
          bottomDivider
          onPress={() => navigateToProfile(contact.name, contact.id)}
        >
          <ListItem.Title style={styles.liTitle}>{contact.name}</ListItem.Title>
        </ListItem>
      ))}
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
  }
})
