import { useState } from 'react'

const useLocalStorage = (key: string, initialValue: string | number): [string | number, Function] => {
  const [storedValue, setStoredValue] = useState((): string | number => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: Function | string): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage