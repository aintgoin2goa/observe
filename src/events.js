
const eventInMap = (map, event) =>
    (event in map);

const subscribe = (map, event, func) => {
    if (!eventInMap(map, event)) {
        map[event] = [];
    }

    map[event].push(func);
}

const publish = (map, event, ...args) => {
    if (!eventInMap(map, event)) {
        return;
    }

    map[event].forEach(func => func(...args));
}

const create = () => {
    const map = {};
    return {
        subscribe: subscribe.bind(null, map),
        publish: publish.bind(null, map)
    }
}

export default create;