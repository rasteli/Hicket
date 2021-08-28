import React, { useState } from "react"
import { Button, Text, Input } from "react-native-elements"
import { StyleSheet, View } from "react-native"
import uuid from "react-native-uuid"

export default function Join({ onIdSubmit }) {
  const [id, setId] = useState()

  function handleSubmit() {
    if (id) {
      onIdSubmit(id)
    }
  }

  function createId() {
    const id = uuid.v4()
    onIdSubmit(id)
  }

  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.text}>
        Join
      </Text>
      <Input
        inputStyle={{ color: "#eeee" }}
        placeholder="Enter your ID"
        onChangeText={value => setId(value)}
      />
      <Button title="Sign In" type="outline" onPress={handleSubmit} />
      <Button
        title="Create new ID"
        buttonStyle={styles.createIdButton}
        onPress={createId}
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

  text: {
    color: "#fff",
    marginBottom: 15,
    marginLeft: 5
  },

  createIdButton: {
    marginTop: 5
  }
})
