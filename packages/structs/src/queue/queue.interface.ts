
/**
 * QueueInterface
 * 
 * QueueInterface specifies the functions of a queue.
 */

export interface QueueInterface<T> {

    /**
     * clear()
     * 
     * clear() clears the queue.
     */

    clear(): void;

    /**
     * dequeue()
     * 
     * dequeue() removes the next item in the queue.
     */

    dequeue(): T|null;

    /**
     * enqueue()
     * 
     * enqueue() inserts an item into the queue.
     * @param value the value to insert.
     */

    enqueue(value: T): void;

    /**
     * isEmpty()
     * 
     * isEmpty() determines if the queue is empty.
     */

    isEmpty(): boolean;

    /**
     * peek()
     * 
     * peek() gets the next item in the queue, but does not remove it.
     */
    peek(): T|null;

    /**
     * size()
     * 
     * size() gets the number of elements in the queue.
     */
    size(): number;

    /**
     * toArray()
     * 
     * toArray() converts the queue to an array.
     */
    toArray(): Array<T>;
}