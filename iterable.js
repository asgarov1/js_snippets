class Group {

    values = [];

    add(value) {
        this.values.push(value)
    }

    delete(value) {
        if (this.has(value)) {
            let index = this.values.findIndex(v => v === value);
            this.values.splice(index, 1);
        }
    }

    has(value) {
        return this.values.findIndex(v => v === value) !== -1;
    }

    static from(iterable) {
        let group = new Group();
        iterable.forEach(value => group.add(value));
        return group;
    }
}

class GroupIterator {
    constructor(group) {
        this.index = 0;
        this.group = group;
    }
    next() {
        if (this.index === this.group.values.length) return {done: true};
        let value = this.group.values[this.index];
        this.index++;
        return {value, done: false};
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
};

for (let value of Group.from([1, 2, 3, 4, 5])) {
    console.log(value);
}
