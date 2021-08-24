import { CoordinatesInterface } from "./coordinates.interface";
import { Equatable } from "../../common/common.module";

/**
 * Coordinates
 *
 * Coordinates represents a geographic longitude/latitude pair.
 */

export class Coordinates implements CoordinatesInterface, Equatable {

    private readonly _long: number;
    private readonly _lat: number;

    constructor(longitude: number, latitude: number) {
        this._long = longitude;
        this._lat = latitude;
    }

    /**
     * equals()
     *
     * equals() compares the suspect to the instance, to determine if they are equals.
     * @param suspect The suspect to compare.
     */

    public equals(suspect: any): boolean {

        let isEqual = false;

        if (suspect instanceof Coordinates) {
            const other = suspect as Coordinates;
            isEqual = (this.longitude() === other.longitude()) && (this.latitude() === other.latitude());
        }

        return isEqual;
    }

    /**
     * latitude()
     *
     * latitude() gets the latitude.
     */

    public latitude(): number {
        return this._lat;
    }

    /**
     * longitude()
     *
     * longitude() gets teh longitude.
     */

    public longitude(): number {
        return this._long;
    }

    public toString(): string {
        return `${this.latitude()}, ${this.longitude()}`;
    }
}