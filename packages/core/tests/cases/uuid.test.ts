
import { UUID } from './../../src/id/uuid/uuid';
import { InvalidArgumentException } from './../../src/common/exceptions/invalid-argument.exception';

test('Generate a UUID,', () => {
    
    // Generate a UUID.
    const generatedId = UUID.V4();
    expect(generatedId).toBeDefined();
});

test("Create a UUID from an existing ID value.", () => {
    const idVal = UUID.V1().id();
    // create a UUID from existing Id value.
    const idFromExisting = new UUID(idVal);
    expect(idFromExisting.id()).toEqual(idVal);
});

test("Creating a UUID with an empty string should throw an InvalidArgumentException", () => {
    // an empty string should throw an InvalidArgumentException
    expect(() => new UUID("")).toThrow(InvalidArgumentException);
});