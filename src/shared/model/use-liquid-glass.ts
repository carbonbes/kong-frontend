import { LiquidGlass, type LiquidGlassOptions } from '@ybouane/liquidglass'

type UseLiquidGlassOptions = LiquidGlassOptions

export const useLiquidGlass = (options: UseLiquidGlassOptions) => {
  const instance = useState<LiquidGlass | null>(() => null)

  const init = async () => {
    if (instance.value) {
      return
    }

    instance.value = await LiquidGlass.init(options)
  }

  const destroy = () => {
    if (!instance.value) {
      return
    }

    instance.value.destroy()
    instance.value = null
  }

  onMounted(async () => {
    await nextTick()
    await init()
  })

  onBeforeUnmount(destroy)

  const { y } = useWindowScroll()

  watch(y, () => {
    if (!instance.value) {
      return
    }

    instance.value.markChanged()
  })
}
