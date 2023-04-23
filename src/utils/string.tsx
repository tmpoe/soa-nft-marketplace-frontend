export function cleanString(str: string) {
    let cleanedTraitType = str.charAt(0).toUpperCase() + str.slice(1)
    cleanedTraitType = cleanedTraitType.replace(/_/g, " ")
    return cleanedTraitType
}
