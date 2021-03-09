export function numericSortByAttribute(array, attribute = "key") {
  return array
    ? array.sort((a, b) =>
        a[attribute].localeCompare(b[attribute], undefined, { numeric: true })
      )
    : [];
}
