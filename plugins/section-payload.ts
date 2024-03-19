import { Section } from "~/models/section"

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('Section', (value) => {

    return value instanceof Section && JSON.stringify(value)
  })
  definePayloadReviver('Section', (value) => {
    const parsed = JSON.parse(value);
    const previousSection = parsed.previousSection ? new Section(parsed.previousSection.id, parsed.previousSection.distance, parsed.previousSection.from, parsed.previousSection.to, parsed.previousSection.defaultStartTime, parsed.previousSection.previousSection, parsed.previousSection.runner) : undefined;

    return new Section(parsed.id, parsed.distance, parsed.from, parsed.to, parsed.defaultStartTime, previousSection, parsed.runner)
  })
})
