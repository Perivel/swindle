import { CountryInterface } from './country.interface';
import * as CountryData from 'i18n-iso-countries'
import { CountryException } from '../exceptions/country.exception';
import { Equatable } from '../../common/common.module';

/**
 * Country
 *
 * Country represents a Country in the world.
 */

export class Country implements CountryInterface, Equatable {
    private readonly _code: string;
    public readonly _name: string;

    /**
     * Creates a Country instance
     * @param code The country code.
     * @throws CountryException when the country information is invalid.
     */

    constructor(code: string) {
        const countryCode = code.toUpperCase();
        const name = CountryData.getName(countryCode, 'en');
        if (name) {
            this._code = countryCode;
            this._name = name;
        }
        else {
            // invalid country
            throw new CountryException();
        }
    }

    /**
     * code()
     *
     * code() gets the country code.
     */

    public code(): string {
        return this._code;
    }

    /**
     * name()
     *
     * name() gets the country's common name.
     */

    public name(): string {
        return this._name;
    }

    /**
     * equals()
     *
     * equals() compares the Country to the suspect to determine if they are equal.
     * @param suspect The suspect to be compared.
     */

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Country) {
            const otherCountry = suspect as Country;
            isEqual = this.code() === otherCountry.code();
        }

        return isEqual;
    }

    public toString(): string {
        return this.name();
    }
}