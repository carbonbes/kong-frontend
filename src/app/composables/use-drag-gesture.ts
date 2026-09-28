import {
  type DragConfig,
  type EventTypes,
  type FullGestureState,
  Gesture,
} from '@use-gesture/vanilla'

export type DragGestureState = Omit<FullGestureState<'drag'>, 'event'> & {
  event: EventTypes['drag']
}

type DragGestureHandler = (state: DragGestureState) => void

type DragGestureTarget = Element | null | undefined

interface DragGestureHandlers {
  onDragStart?: DragGestureHandler
  onDrag?: DragGestureHandler
  onDragEnd?: DragGestureHandler
}

type DragGestureConfig = DragConfig

interface UseDragGestureOptions {
  target: DragGestureTarget
  handlers: DragGestureHandlers
  config?: DragGestureConfig
}

export const useDragGesture = ({
  target,
  handlers,
  config,
}: UseDragGestureOptions) => {
  const gesture = ref<Gesture | null>(null)

  const init = () => {
    if (gesture.value) {
      return
    }

    gesture.value = new Gesture(target as EventTarget, handlers, {
      drag: config,
    })
  }

  const destroy = () => {
    if (!gesture.value) {
      return
    }

    gesture.value.destroy()
    gesture.value = null
  }

  onMounted(init)
  onBeforeUnmount(destroy)
}
