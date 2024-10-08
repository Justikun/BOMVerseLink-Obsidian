import { Plugin, TFile, } from 'obsidian'

// Load Book of Mormon data from JSON file
export async function loadData(this: Plugin): Promise<any[]> {
	const filePath = 'data.json'; // Path relative to the vault root
	const file = this.app.vault.getAbstractFileByPath(filePath); // Corrected method name
	console.log(`filePath: ${filePath}`);
	console.log("File found:", file); // Check if the file is found

	if (file && file instanceof TFile) { // Ensure it's a file, not a folder
	  try {
		const content = await this.app.vault.read(file);
		return JSON.parse(content);
	  } catch (error) {
		console.error('Error reading or parsing the JSON file:', error);
		throw new Error('Failed to read or parse JSON file');
	  }
	} else {
	  throw new Error('JSON file not found');
	}
}