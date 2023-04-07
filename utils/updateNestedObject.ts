/** Updates a nested object structure with the given keys and value.
 * If the nested structure does not exist, it creates the structure.
 * When the keys array has only one element left, it updates the value
 * at that key by adding the given value to the existing value.
 */
export function updateNestedObject(
  obj: Record<string, any>,
  keys: string[],
  value: number
): void {
  if (keys.length === 1) {
    obj[keys[0]] = (obj[keys[0]] || 0) + value;
    return;
  }

  const key = keys.shift();
  if (!obj[key]) {
    obj[key] = {};
  }
  updateNestedObject(obj[key], keys, value);
}
