import React, { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { Tab, TabView, Text, FAB, Button } from "react-native-elements"
import Contacts from "./Tabs/Contacts"
import Conversations from "./Tabs/Conversations"

const CustomTabItem = props => (
  <Tab.Item
    {...props}
    titleStyle={styles.tabItem}
    containerStyle={styles.tabItemContainer}
  />
)

export default function Dashboard({ navigation }) {
  const [index, setIndex] = useState(0)
  const isInConversationsTab = index === 0

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          buttonStyle={styles.tabItemContainer}
          onPress={() => navigation.navigate("Profile")}
          icon={{
            type: "font-awesome",
            name: "ellipsis-v",
            color: "#0d6efd"
          }}
        />
      )
    })
  }, [])

  function navigateToModal() {
    const modal = isInConversationsTab ? "New Conversation" : "New Contact"

    navigation.navigate(modal)
  }

  return (
    <>
      <Tab
        value={index}
        onChange={setIndex}
        variant="primary"
        indicatorStyle={styles.tabIndicator}
      >
        <CustomTabItem title="Conversations" />
        <CustomTabItem title="Contacts" />
      </Tab>

      <TabView value={index}>
        <TabView.Item>
          <>
            <Text h1 style={styles.tabContent}>
              Conversations
            </Text>
            <Conversations navigation={navigation} />
          </>
        </TabView.Item>
        <TabView.Item>
          <>
            <Text h1 style={styles.tabContent}>
              Contacts
            </Text>
            <Contacts navigation={navigation} />
          </>
        </TabView.Item>
      </TabView>

      <FAB
        icon={{
          type: "font-awesome",
          name: isInConversationsTab ? "comment" : "user"
        }}
        placement="right"
        buttonStyle={styles.tabIndicator}
        onPress={navigateToModal}
      />
    </>
  )
}

const styles = StyleSheet.create({
  tabItem: {
    color: "#0d6efd"
  },

  tabItemContainer: {
    backgroundColor: "#141414"
  },

  tabIndicator: {
    backgroundColor: "#0d6efd"
  },

  tabContent: {
    marginLeft: 5,
    marginBottom: 10
  }
})
