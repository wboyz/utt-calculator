import { Section } from "~/models/section"

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('Section', (value) => {
    console.log(JSON.stringify(value));

    return value instanceof Section && JSON.stringify(value)
  })
  definePayloadReviver('Section', (value) => {
    return new Section(value.id, value.distance, value.from, value.to, value.defaultStartTime, value.previousSection, value.runner)
  })
})
