export const formatDateForInput = (dateStr: string): string => {
  if (!dateStr) return ''
  if (dateStr.includes('-') && dateStr.length === 7) {
    return dateStr + '-01'
  }
  return dateStr
}

export const formatDateForState = (dateStr: string): string => {
  if (!dateStr) return ''
  return dateStr.substring(0, 7)
}

