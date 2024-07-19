export function getInitials(name) {
  const parts = name.trim().split(' ')
  let initials = ''

  for (let i = 0; i < Math.min(parts.length, 2); i++) {
    if (parts[i].length > 0) {
      initials += parts[i][0].toUpperCase()
    }
  }

  return initials
}
