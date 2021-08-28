import React, { useContext } from "react"
import useAsyncStorage from "../hooks/useAsyncStorage"

const ContactsContext = React.createContext()

export function useContact() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useAsyncStorage("contacts", [])

  function createContact(id, name) {
    setContacts(prevContacts => {
      return [...prevContacts, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
