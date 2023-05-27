export const onWindowMatch = () => {
  if (typeof window !== 'undefined') {
    const element = document.documentElement
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && darkQuery.matches)
    ) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }

    return element
  } else return null
}
