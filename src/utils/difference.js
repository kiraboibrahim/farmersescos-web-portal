const transform = require("lodash.transform");
const isEqual = require("lodash.isequal");
const isObject = require("lodash.isobject");

const { isArray } = Array;
/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
export default function difference(origObj, newObj) {
  function changes(newObj, origObj) {
    let arrayIndexCounter = 0;
    return transform(newObj, function (result, value, key) {
      if (!isEqual(value, origObj[key])) {
        let resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] =
          isObject(value) && isObject(origObj[key])
            ? changes(value, origObj[key])
            : value;
      }
    });
  }
  return changes(newObj, origObj);
}
