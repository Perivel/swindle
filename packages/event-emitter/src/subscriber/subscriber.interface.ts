import { SubscriberIdInterface } from "./subscriber-id.interface";
import { Serializable } from "@swindle/core";
import { EventInterface } from "../event/event.interface";

/**
 * SubscriberInterface
 */

export interface SubscriberInterface extends Serializable {

    /**
     * eventName()
     * 
     * eventName() gets the name of the event being subscribed to.
     */

    eventName(): string


    /**
     * id()
     * 
     * id() gets the subscription id.
     */

    id(): SubscriberIdInterface;

    /**
     * label()
     * 
     * label() gets the subscription label.
     */

    label(): string;

    /**
     * Executes the subscriber's designated event action.
     * @param event The event object
     */

    handleEvent(event: EventInterface): Promise<void>;

    /**
     * priority()
     * 
     * the priority of the subscriber.
     */

    priority(): number;

    /**
     * shouldStopPropogationOnError()
     * 
     * shouldStopPropogationOnError() determines if the event propogation
     * should stop if the handler encounters an error.
     */

    shouldStopPropogationOnError(): boolean;
}