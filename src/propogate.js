export default class Propogate {
  static omitProperty(property, obj) {
    const properties = Object.getOwnPropertyNames(obj);
    const filtered = properties.filter((prop) => {
      return prop !== property;
    });
    return filtered;
  }

  static updateProperties(propertiesToUpdate, obj, fn) {
    const update = propertiesToUpdate.map((property) => {
      return obj.property = fn(property);
    });
    return update;
  }
}