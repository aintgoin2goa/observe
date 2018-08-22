import createPubSub from './events';

const observable = (
    root,
    parent,
    name,
    path,
) => {
    let state = null;
    Object.defineProperty(parent, name, {
        enumerable: true,
        get: () => state,
        set: value => {
            const oldValue = state;
            state = value;
            root.publish(path, value, oldValue, root)
        }
    })
}

const readonly = (
    parent,
    name,
    value
) => {
    Object.defineProperty(parent, name, { writable: false, value });
}

const drilldown = (rootObj, path) => {
    const pathArr = path.split('.')
    const lastIndex = pathArr.length-2;
    return pathArr.reduce((obj, prop, index) => {
        if (index > lastIndex) {
            return obj;
        }

        if(!(prop in obj)) {
            obj[prop] = {};
        }

        return obj[prop];
    }, rootObj);
}

const nameFromPath = path => {
    return path.split('.').slice(-1)[0];
}

const create = () => {
    const prototype = Object.assign(
        Object.create(null),
        createPubSub(),
        {
            observable: function (path) {
                const root = this;
                const parent = drilldown(root, path);
                const name = nameFromPath(path)
                observable(root, parent, name, path);
                return root;
            },
            readonly: function (path, value) {
                const root = this;
                const parent = drilldown(root, path);
                const name = nameFromPath(path)
                readonly(parent, name, value);
                return root;
            }
        }
    )
    return Object.create(prototype);
}



export default create;
