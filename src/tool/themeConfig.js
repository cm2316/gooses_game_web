export const themes = [
  { label: '清新', value: 'light' },
  { label: '暗黑', value: 'dark' },
]

export const themeIsValid = (value) => {
  return themes.findIndex((theme) => theme.value === value) > -1
}
