const levels = ["N", "Tr", "T", "V"]

export function formatView(view: number): string {
  if (view < 1000) return view + ""
  const index = levels.findIndex(() => {
    view /= 1000
    return view < 1000
  })
  return `${parseFloat(view.toFixed(2)).toString().replace(/\./g, ",")}${
    levels[index]
  }`
}