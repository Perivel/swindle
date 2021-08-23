import { PriorityQueue } from './../../index';

test("Test the basic properties of a Priority Queue", () => {
    const pqueue = new PriorityQueue<string>();
    expect(pqueue.isEmpty()).toEqual(true);
    expect(pqueue.size()).toEqual(0);
    expect(pqueue.dequeue()).toEqual(null);
    expect(pqueue.toArray()).toEqual(new Array<string>());
});

test("Test the priority queue with a single item", () => {
    const pqueue = new PriorityQueue<string>();
    pqueue.enqueue("Shelly", 1);
    expect(pqueue.isEmpty()).toEqual(false);
    expect(pqueue.size()).toEqual(1);
    expect(pqueue.toArray()).toEqual(["Shelly"]);
    expect(pqueue.peek()).toEqual("Shelly");
    expect(pqueue.isEmpty()).toEqual(false);
    expect(pqueue.size()).toEqual(1);
    expect(pqueue.dequeue()).toEqual("Shelly");
    expect(pqueue.isEmpty()).toEqual(true);
    expect(pqueue.size()).toEqual(0);
    expect(pqueue.peek()).toEqual(null);
    expect(pqueue.dequeue()).toEqual(null);
    expect(pqueue.toArray()).toEqual(new Array<string>());
});

test("Test the priority queue with multiple items.", () => {
    const pqueue = new PriorityQueue<string>();
    pqueue.enqueue("Shelly", 3);
    pqueue.enqueue("Tommy", 2);
    pqueue.enqueue("Andy", 5);
    pqueue.enqueue("Joe", 2);
    pqueue.enqueue("Jane", 6);
    expect(pqueue.isEmpty()).toEqual(false);
    expect(pqueue.size()).toEqual(5);
    expect(pqueue.toArray()).toEqual(["Tommy", "Joe", "Shelly", "Andy", "Jane"]);
    expect(pqueue.peek()).toEqual("Tommy");
    expect(pqueue.size()).toEqual(5);
    expect(pqueue.dequeue()).toEqual("Tommy");
    expect(pqueue.size()).toEqual(4);
    expect(pqueue.peek()).toEqual("Joe");
    expect(pqueue.size()).toEqual(4);
    expect(pqueue.dequeue()).toEqual("Joe");
    expect(pqueue.size()).toEqual(3);
    pqueue.clear();
    expect(pqueue.isEmpty()).toEqual(true);
    expect(pqueue.size()).toEqual(0);
    expect(pqueue.toArray()).toEqual(new Array<string>());
});