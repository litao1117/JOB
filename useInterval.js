import { useRef, useCallback, useEffect } from "react"

const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const tick = useCallback(() => {
    savedCallback.current()
  }, [])

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, tick])
}
