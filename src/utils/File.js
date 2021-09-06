const fs = require("fs");

class FileUtils {

	async writeFile(filePath, data) {
		return fs.writeFileSync(filePath, data);
	}

	async existsFile(filePath) {
		return fs.existsSync(filePath);
	}

	async removeDir(path) {
		return fs.rmdirSync(path, { force: true, recursive: true });
	}
	
	async createDir(path) {
		return fs.mkdirSync(path);
	}

}

module.exports = new FileUtils();