import { IddentifierInterface } from "../id/id.interface";

/**
 * UUIDInterface
 *
 * UUIDInterface specifies the requirements for a UUID.
 */

export interface UUIDInterface extends IddentifierInterface {

    /**
     * version()
     *
     * gets teh version of the UUID.
     */

    version(): number;
}