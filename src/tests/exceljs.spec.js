/* eslint-disable no-undef */
const Excel = require("exceljs");
const FileUtils = require("../utils/File");
const filePath = "./test-data";

let workbook;
const worksheetName = "Test Worksheet";

const sheetData = [
	{ header: "ColumnA", key: "column_a", values: [1, 2] },
	{ header: "ColumnB", key: "column_b", values: [3, 4] },
];

beforeAll(async () => {
	await FileUtils.removeDir(filePath);
	await FileUtils.createDir(filePath);
});

beforeEach(() => {
	workbook = new Excel.Workbook();
	workbook.created = new Date();
});

describe("ExcelJS", () => {

	test("Generate worksheet", () => {
		const sheet = workbook.addWorksheet(worksheetName);
		expect(sheet.name).toEqual(worksheetName);
	});

	test("Add columns and rows to worksheet", () => {
		const worksheet = workbook.addWorksheet(worksheetName);

		worksheet.columns = sheetData;

		// sheetData.map(d => worksheet.addRow(d.values));
		worksheet.addRows(sheetData.map(row => row.values));

		expect(worksheet.rowCount).toEqual(3);
		expect(worksheet.getRow(1).getCell(1).value).toEqual("ColumnA");
		expect(worksheet.getRow(1).getCell(2).value).toEqual("ColumnB");
		expect(worksheet.getRow(2).getCell(1).value).toEqual(1);
		expect(worksheet.getRow(2).getCell(2).value).toEqual(2);
		expect(worksheet.getRow(3).getCell(1).value).toEqual(3);
		expect(worksheet.getRow(3).getCell(2).value).toEqual(4);
	});

	test("Generate xlsx file", async () => {
		const worksheet = workbook.addWorksheet(worksheetName);

		worksheet.columns = sheetData;
		sheetData.map(d => worksheet.addRow(d.values));

		const buffer = await workbook.xlsx.writeBuffer();

		expect(worksheet.rowCount).toEqual(3);
		expect(buffer).not.toBeNull();
		expect(buffer).toBeInstanceOf(Buffer);
	});

	test("Generate xlsx file and save", async () => {
		const worksheet = workbook.addWorksheet(worksheetName);
		const fileName = `${new Date().getTime()}.xlsx`;

		worksheet.columns = sheetData;
		sheetData.map(d => worksheet.addRow(d.values));

		const buffer = await workbook.xlsx.writeBuffer();

		expect(worksheet.rowCount).toEqual(3);
		expect(buffer).not.toBeNull();
		expect(buffer).toBeInstanceOf(Buffer);

		await FileUtils.writeFile(`${filePath}/${fileName}`, buffer);

		expect(FileUtils);
	});

});