import { NodeInterface } from './../node/node.interface';
/**
 * PriorityQueueNodeInterface
 *
 * PriorityQueueNodeInterface specifies the interface for a priority queue.
 */
export interface PriorityQueueNodeInterface<T> extends NodeInterface<T> {
    /**
     * next()
     *
     * next() gets the next node.
     */
    next(): PriorityQueueNodeInterface<T> | null;
    /**
     * priority()
     *
     * priority() gets the priority of the node.
     */
    priority(): number;
    /**
     * setPriority()
     *
     * sets the priority of the node.
     * @param newPriority
     */
    setPriority(newPriority: number): void;
}
//# sourceMappingURL=priority-queue-node.interface.d.ts.map