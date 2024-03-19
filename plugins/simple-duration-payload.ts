import { SimpleDuration } from "~/models/simple-duration"

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('SimpleDuration', (value) => {
    return value instanceof SimpleDuration && JSON.stringify(value)
  })
  definePayloadReviver('SimpleDuration', (value) => {
    const parsed = JSON.parse(value);
    return new SimpleDuration(parsed.hours, parsed.minutes, parsed.seconds)
  })
})
