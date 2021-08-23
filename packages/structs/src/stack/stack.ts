import { StackInterface } from "./stack.interface.js";
import { StackNode } from './stack-node';

/**
 * Stack
 * 
 * Stack is a Data structure, following the FIFO principle.
 * 
 */

export class Stack<T> implements StackInterface<T> {

    private _count: number;
    private _top: StackNode<T>|null;

    constructor() {
        this._top = null;
        this._count = 0;
    }

    /**
     * clear()
     * 
     * clear() clears the stack.
     */

    public clear(): void {
        this._top = null;
        this._count = 0;
    }

    /**
     * isEmpty()
     * 
     * isEmpty() determines if the stack is empty.
     */

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * peek()
     * 
     * peek() gets the next value in the stack.
     */

    public peek(): T | null {
        let value: T|null = null;

        if (!this.isEmpty()) {
            // get the value of the top node.
            const top = this._top as StackNode<T>;
            value = top.value();
        }

        return value;
    }

    /**
     * pop()
     * 
     * pop() removes the next value in the stack.
     */

    public pop(): T | null {

        let value: T|null = null;

        if (!this.isEmpty()) {
            // remove the element at the top of the stack.
            const nodeToRemove = this._top as StackNode<T>;
            this._top = nodeToRemove.next();
            this._count--;
            value = nodeToRemove.value();
        }

        return value;
    }

    /**
     * push()
     * 
     * push() push pushes an item to the stack.
     * @param value The value to push.
     */

    public push(value: T): void {

        if (this.isEmpty()) {
            // set the new node as the top.
            const newNode = new StackNode<T>(value);
            this._top = newNode;
        }
        else {
            // add the new node to the top of the stack.
            const newTop = new StackNode<T>(value, this._top);
            this._top = newTop;
        }

        // increment count.
        this._count++;
    }

    /**
     * size()
     * 
     * size() gets the number of items in the stack.
     */

    public size(): number {
        return this._count;
    }

    /**
     * toArray()
     * 
     * toArray() converts the stack to an array.
     */

    public toArray(): Array<T> {
        const arr = new Array<T>();

        let currentNode = this._top;

        while(currentNode != null) {
            arr.push(currentNode.value());
            currentNode = currentNode.next();
        }

        return arr;
    }
}