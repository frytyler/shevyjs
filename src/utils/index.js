// @flow

export const getFontValue = (size: string): number => {
  return parseFloat(size)
}

export const getFontUnit = (size: string): string => {
  const match = size.match(/px|r?em$/)

  if (!match) {
    throw new Error('Unsupported font unit: Shevy only supports px, em, or rem.')
  }

  return match[0]
}

export const trimArrayToMaxOf6 = (array: Array<any>): Array<any> => {
  return array.length <= 6 ? array : array.slice(0, 6)
}

export function calcHeadingFontSize (thisArg: Object, factor: number): string {
  const { baseFontSize } = thisArg
  const value = getFontValue(baseFontSize)
  const unit = getFontUnit(baseFontSize)

  return `${value * factor}${unit}`
}

export function calcHeadingLineHeight (thisArg: Object, factor: number): number {
  const { lineHeightSpacing } = thisArg
  const fontSize = calcHeadingFontSize(thisArg, factor)
  const fontValue = getFontValue(fontSize)
  const spacing = lineHeightSpacing()
  const spacingValue = getFontValue(spacing)
  let lineHeight = 0
  let multiplier = 1

  if (fontValue <= spacingValue) {
    lineHeight = spacingValue / fontValue
  } else {
    while (getFontValue(lineHeightSpacing(multiplier)) < fontValue) {
      multiplier += 0.5
    }

    lineHeight = getFontValue(lineHeightSpacing(multiplier)) / fontValue
  }

  return lineHeight
}

export function calcHeadingMarginBottom (
  thisArg: Object,
  factor: number,
  addMarginBottom: boolean
): ?string {
  if (!addMarginBottom) {
    return undefined
  }

  const { baseSpacing } = thisArg
  const spacing = baseSpacing()
  const spacingUnit = getFontUnit(spacing)

  if (spacingUnit === 'em') {
    const fontSize = calcHeadingFontSize(thisArg, factor)
    const fontValue = getFontValue(fontSize)
    const spacingValue = getFontValue(spacing)

    return `${spacingValue / fontValue}${spacingUnit}`
  } else {
    return spacing
  }
}
