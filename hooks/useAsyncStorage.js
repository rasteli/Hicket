import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const PREFIX = "ding-"

export default function useAsyncStorage(key, initialValue) {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    AsyncStorage.getItem(prefixedKey).then(jsonValue => {
      if (jsonValue !== null && jsonValue !== "undefined")
        return JSON.parse(jsonValue)
    })

    if (typeof initialValue === "function") return initialValue()
    else return initialValue
  })

  useEffect(() => {
    AsyncStorage.setItem(prefixedKey, JSON.stringify(value)).catch(e =>
      console.log(e)
    )
  }, [value, prefixedKey])

  return [value, setValue]
}
