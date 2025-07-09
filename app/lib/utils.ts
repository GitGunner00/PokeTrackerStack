export function formatText(text: string): string {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
