export const useDevice = () => {
  const isTouch = useMediaQuery('(hover: none) and (pointer: coarse)', {
    ssrWidth: 0,
  })

  return { isTouch }
}
