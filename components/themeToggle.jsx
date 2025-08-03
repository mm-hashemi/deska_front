'use client'
import { useTheme } from 'next-themes'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="ml-4 focus:outline-none"
      title={isDark ? "حالت روشن" : "حالت تیره"}
    >
      {isDark
        ? <HiOutlineSun size={21} className="text-white" />
        : <HiOutlineMoon size={21} className="text-black dark:text-white" />}
    </button>
  )
}
