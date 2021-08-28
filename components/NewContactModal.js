import React, { useState } from "react"
import { Button, Text, Input } from "react-native-elements"
import { StyleSheet, View } from "react-native"
import { useContact } from "../contexts/ContactsProvider"

export default function NewContactModal({ navigation }) {
  const { createContact } = useContact()
  const [id, setId] = useState()
  const [name, setName] = useState()

  function handleSubmit() {
    if (!id || !name) return

    createContact(id, name)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.text}>
        Create new contact
      </Text>
      <Input
        inputStyle={styles.input}
        placeholder="Enter the ID of the contact"
        onChangeText={value => setId(value)}
      />
      <Input
        inputStyle={styles.input}
        placeholder="Enter a name for the contact"
        onChangeText={value => setName(value)}
      />
      <Button title="Add contact" type="outline" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },

  text: {
    color: "#fff",
    marginBottom: 15,
    marginLeft: 5
  },

  input: {
    color: "#eeee"
  }
})
