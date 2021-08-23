import { Stack } from './../../index';

test("Test empty stack properties.", () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toEqual(true);
    expect(stack.size()).toEqual(0);
    expect(stack.pop()).toEqual(null);
    expect(stack.toArray()).toEqual(new Array<number>());
});

test("Push and pop a single item to the stack.", () => {
    const stack = new Stack<number>();
    stack.push(5);
    expect(stack.isEmpty()).toEqual(false);
    expect(stack.size()).toEqual(1);
    expect(stack.peek()).toEqual(5);
    expect(stack.pop()).toEqual(5);
    expect(stack.size()).toEqual(0);
    expect(stack.isEmpty()).toEqual(true);
    expect(stack.peek()).toEqual(null);
    expect(stack.toArray()).toEqual(new Array<number>());
});

test("Push and pop multiple items to the stack.", () => {
    const stack = new Stack<number>();
    const arrOfInts = [11, 44, 0, 8, 23]
    stack.push(23);
    stack.push(8);
    stack.push(0);
    stack.push(44);
    stack.push(11);

    expect(stack.isEmpty()).toEqual(false);
    expect(stack.size()).toEqual(arrOfInts.length);
    expect(stack.toArray()).toEqual(arrOfInts);
    
    expect(stack.peek()).toEqual(11);
    expect(stack.size()).toEqual(arrOfInts.length);
    expect(stack.pop()).toEqual(11);
    let newSize = arrOfInts.length - 1;
    expect(stack.size()).toEqual(newSize);

    expect(stack.pop()).toEqual(44);
    newSize--;
    expect(stack.size()).toEqual(newSize);

    stack.clear();
    expect(stack.isEmpty()).toEqual(true);
    expect(stack.size()).toEqual(0);
    expect(stack.peek()).toEqual(null);
    expect(stack.pop()).toEqual(null);

});