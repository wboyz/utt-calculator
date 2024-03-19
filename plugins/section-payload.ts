import { Section } from "~/models/section"

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('Section', (value) => {

    return value instanceof Section && JSON.stringify(value)
  })
  definePayloadReviver('Section', (value) => {
    const parsed = JSON.parse(value);

    return new Section(parsed.id, parsed.distance, parsed.from, parsed.to, parsed.defaultStartTime, parsed.previousSection, parsed.runner)
  })
})
