import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card } from "react-native-elements"

export default function Profile({ id, route }) {
  const name = route.params?.name
  const contactId = route.params?.id

  return (
    <View style={styles.container}>
      <Text h2 style={styles.text}>
        {`This is ${name ? `${name}'s` : "your"} ID`}
      </Text>
      <Card.Divider />
      <Text style={styles.id} selectable={true}>
        {contactId ? contactId : id}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  text: {
    color: "#ddd",
    alignSelf: "center",
    marginBottom: 10,
    marginLeft: 5
  },

  id: {
    color: "#bbbb",
    alignSelf: "center",
    fontSize: 20,
    borderBottomColor: "#bbbb",
    borderBottomWidth: 1
  }
})
