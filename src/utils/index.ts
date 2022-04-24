export function deepMerge(target: any, merged: any) {
  for (const key in merged) {
    if (target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], merged[key])

      continue
    }

    if (typeof merged[key] === 'object') {
      target[key] = deepClone(merged[key], true)

      continue
    }

    target[key] = merged[key]
  }

  return target
}

/**
 * @description Clone an object or array
 * @param {Object|Array} object Cloned object
 * @param {Boolean} recursion   Whether to use recursive cloning
 * @return {Object|Array} Clone object
 */
export function deepClone(object: any, recursion: boolean) {
  if (!object)
    return object
  const { parse, stringify } = JSON
  if (!recursion)
    return parse(stringify(object))
  const clonedObj: Record<string, any> = object instanceof Array ? [] : {}

  if (object && typeof object === 'object') {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (object[key] && typeof object[key] === 'object')
          clonedObj[key] = deepClone(object[key], true)

        else
          clonedObj[key] = object[key]
      }
    }
  }

  return clonedObj
}
