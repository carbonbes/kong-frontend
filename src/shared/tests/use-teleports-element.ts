export const useTeleportsElement = () => {
  const create = () => {
    const el = document.createElement('div')
    el.id = 'teleports'

    document.body.appendChild(el)
  }

  const destroy = () => {
    const el = document.getElementById('teleports')
    if (!el) return

    el.remove()
  }

  return { create, destroy }
}
