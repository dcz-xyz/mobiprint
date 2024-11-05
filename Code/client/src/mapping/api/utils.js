export const isAttribute = clazz => {
    return attribute => {
      return attribute.__class === clazz;
    };
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  export const floorObject = obj => {
    if (Array.isArray(obj)) {
      return obj.map(floorObject);
    }
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => {
      if (typeof v === "number") {
        return [k, Math.floor(v)];
      }
      if (typeof v === "object" && v !== null) {
        if (Array.isArray(v)) {
          return [k, v.map(floorObject)];
        }
        return [k, floorObject(v)];
      }
      return [k, v];
    }));
  };
  export const getIn = (obj, path) => {
    if (path.length === 1) {
      return obj[path[0]];
    } else {
      return getIn(obj[path[0]], path.slice(1));
    }
  };
  export const setIn = (obj, value, path) => {
    if (path.length === 1) {
      obj[path[0]] = value;
    } else {
      setIn(obj[path[0]], value, path.slice(1));
    }
  };