import { Runner } from "~/models/runner"

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('Runner', (value) => {
    return value instanceof Runner && JSON.stringify(value)
  })
  definePayloadReviver('Runner', (value) => {
    return new Runner(value.name, value.speed)
  })
})
