export const getEditorNodeByCoords = (x: number, y: number) =>
  document
    .elementsFromPoint(x, y)
    .find((el: Element) => el.parentElement?.matches?.('.ProseMirror')) || null
