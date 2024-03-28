import useAutoComplete from "@/composables/autocomplete"
import { expect, test } from "vitest"

// true = call the API
// false = use sample data
test.each([true, false])("useAutoComplete can get suggestions", async (useApi: boolean) => {
    const { suggestions, getSuggestions } = useAutoComplete(useApi)

    expect(suggestions.value).toEqual([])

    await getSuggestions("london")

    expect(suggestions.value).not.toEqual([])
})
