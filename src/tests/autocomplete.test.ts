import useAutoComplete from "@/composables/autocomplete"
import { expect, test } from "vitest"

// true = call the API
// false = use sample data
test("useAutoComplete can get suggestions", async () => {
    const { suggestions, getSuggestions } = useAutoComplete()

    expect(suggestions.value).toEqual([])

    await getSuggestions("london")

    expect(suggestions.value).not.toEqual([])
})
