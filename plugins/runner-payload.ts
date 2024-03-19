import { Runner } from "~/models/runner"

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('Runner', (value) => {
    return value instanceof Runner && JSON.stringify(value)
  })
  definePayloadReviver('Runner', (value) => {
    const parsed = JSON.parse(value);
    return new Runner(parsed.name, parsed.speed)
  })
})
