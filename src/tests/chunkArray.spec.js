/* eslint-disable no-undef */
const {
	chunkArrayLoop,
	chunkArraySplice,
	chunkArraySlice,
	chunkArrayRecursive
} = require("../utils/ArrayUtils");

let testArray;
let CHUNK_SIZE;
let responseArray;

beforeAll(() => {
	testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	CHUNK_SIZE = 5;
	responseArray = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13]];
});

describe("Chunking array using diferent approaches", () => {

	test("Chunk Array using loop", () => {
		expect(
			chunkArrayLoop(testArray, CHUNK_SIZE)
		).toEqual(responseArray);
	});

	test("Chunk Array using Splice", () => {
		expect(
			chunkArraySplice(testArray, CHUNK_SIZE)
		).toEqual(responseArray);
	});

	test("Chunk Array using Slice", () => {
		expect(
			chunkArraySlice(testArray, CHUNK_SIZE)
		).toEqual(responseArray);
	});

	test("Chunk Array recursively", () => {
		expect(
			chunkArrayRecursive(testArray, CHUNK_SIZE)
		).toEqual(responseArray);
	});

});

describe("Using chunks to call a function in parallel", () => {
	const bigArray = Array(25000).fill(5000);
	const newChunkSize = 1000;

	const mockCallback = jest.fn(x => 42 + x);

	test("Testing parallel execuction", () => {

		const chunkedArray = chunkArrayRecursive(bigArray, newChunkSize);

		chunkedArray.map(mockCallback);

		// The mock function is called (array/chunkSize) times
		expect(mockCallback.mock.calls.length).toBe(bigArray.length / newChunkSize);
	});

});