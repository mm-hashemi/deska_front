import { useEffect, useState } from "react"

export default function useDarkMode() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // بررسی localStorage
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
    } else {
      setTheme("dark")
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
    }
  }
  return [theme, toggleTheme]
}
