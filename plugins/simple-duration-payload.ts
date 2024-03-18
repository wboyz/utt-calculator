import { SimpleDuration } from "~/models/simple-duration"

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('SimpleDuration', (value) => {
    return value instanceof SimpleDuration && JSON.stringify(value)
  })
  definePayloadReviver('SimpleDuration', (value) => {
    return new SimpleDuration(value.hours, value.minutes, value.seconds)
  })
})
