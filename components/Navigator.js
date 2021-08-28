import React from "react"
import { StyleSheet } from "react-native"
import { Button } from "react-native-elements"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Profile from "./Profile"
import Dashboard from "./Dashboard"
import NewContactModal from "./NewContactModal"
import OpenConversation from "./OpenConversation"
import NewConversationModal from "./NewConversationModal"

const Stack = createNativeStackNavigator()

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: "#141414"
  }
})

const sharedStackOptions = {
  contentStyle: styles.contentStyle,
  headerStyle: styles.contentStyle,
  headerTintColor: "#0d6efd"
}

function stackOptions({ route }) {
  return {
    ...sharedStackOptions,
    title: route.name
  }
}

export default function Navigator({ id }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Hicket"
          component={Dashboard}
          options={{
            ...sharedStackOptions,
            headerTitleStyle: { fontSize: 25 }
          }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="New Contact"
            component={NewContactModal}
            options={({ route }) => stackOptions({ route })}
          />
          <Stack.Screen
            name="New Conversation"
            component={NewConversationModal}
            options={({ route }) => stackOptions({ route })}
          />
          <Stack.Screen
            name="OpenConversation"
            component={OpenConversation}
            options={({ route }) => ({
              ...sharedStackOptions,
              title: route.params.title
            })}
          />
          <Stack.Screen
            name="Profile"
            options={({ route }) => stackOptions({ route })}
          >
            {props => <Profile {...props} id={id} />}
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
