export class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value < 0) {
            throw new Error("Radius cannot be negative");
        }
        this._radius = value;
    }

    get diameter() {
        return this.radius * 2;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }

    circumference() {
        return 2 * Math.PI * this.radius;
    }
}