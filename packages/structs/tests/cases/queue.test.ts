import { Queue } from './../../index';

test("Test the Queue's basic properties", () => {
    const queue = new Queue<number>();
    expect(queue.isEmpty()).toEqual(true);
    expect(queue.size()).toEqual(0);
    expect(queue.toArray()).toEqual(new Array<number>());
    expect(queue.dequeue()).toEqual(null);
});

test("Enqueue and Dequeue a single value", () => {
    const queue = new Queue<number>();
    const arrVals = new Array<number>();
    queue.enqueue(5);
    arrVals.push(5);
    expect(queue.isEmpty()).toEqual(false);
    expect(queue.size()).toEqual(arrVals.length);
    expect(queue.toArray()).toEqual(arrVals);

    expect(queue.peek()).toEqual(5);
    expect(queue.dequeue()).toEqual(5);
    expect(queue.isEmpty()).toEqual(true);
    expect(queue.size()).toEqual(0);
    expect(queue.toArray()).toEqual(new Array<number>());
});

test("Enqueue and Dequeue multiple items", () => {
    const queue = new Queue<number>();
    const arr = new Array<number>();

    queue.enqueue(1);
    arr.push(1);
    queue.enqueue(2);
    arr.push(2);
    queue.enqueue(3);
    arr.push(3);
    queue.enqueue(4);
    arr.push(4);
    queue.enqueue(5);
    arr.push(5);

    expect(queue.isEmpty()).toEqual(false);
    expect(queue.size()).toEqual(arr.length);
    expect(queue.toArray()).toEqual(arr);

    expect(queue.peek()).toEqual(1);
    expect(queue.size()).toEqual(arr.length);
    expect(queue.dequeue()).toEqual(1);
    let newSize = arr.length - 1;
    expect(queue.size()).toEqual(newSize);

    expect(queue.peek()).toEqual(2);
    expect(queue.size()).toEqual(newSize);
    newSize--;
    expect(queue.dequeue()).toEqual(2);
    expect(queue.size()).toEqual(newSize);

    queue.clear();
    expect(queue.isEmpty()).toEqual(true);
    expect(queue.size()).toEqual(0);
});