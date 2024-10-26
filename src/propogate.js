export default class Propogate {
  static omitProperty(property, obj) {
    const properties = Object.getOwnPropertyNames(obj);
    const filtered = properties.filter((prop) => {
      return prop !== property;
    });
    return filtered;
  }

  

}