import { Plugin, Notice } from 'obsidian';
import { loadData } from './dataloader';
import { SearchTermModal } from 'verselink';

// Main Plugin class
export default class BookOfMormonPlugin extends Plugin {
  private data: any[] = [];

  // onload
  async onload() {
    // Load data
    try {
      this.data = await loadData.call(this); // Using .call to set the correct context
    } catch (error) {
      new Notice('Failed to load Book of Mormon data: ' + error.message);
      return;
    }

    // Add command to open the search modal
    this.addCommand({
      id: 'verse-link',
      name: 'Verse Link',
      callback: () => this.openSearchModal(),
    });
  }


  // Verse Link Modal
  openSearchModal() {
    new SearchTermModal(this.app, (searchTerm) => {
      if (searchTerm) {
        this.searchInDatabase(searchTerm);
      } else {
        new Notice('Search term cannot be empty.');
      }
    }).open();
  }

  searchInDatabase(searchTerm: string) {
    const result = this.data.find(entry => entry.text.toLowerCase().includes(searchTerm.toLowerCase()));
    if (result) {
      
      let baseURLString = `https://www.churchofjesuschrist.org/study/scriptures/bofm/` 
      let middleString = `?lang=eng&id=`
      if (result.title == "1 Nephi") {
        let urlString = `${baseURLString}1-ne/${result.chapter}${middleString}p${result.verse}`
        navigator.clipboard.writeText(`${urlString}`);  
        new Notice(`Found: ${urlString}`);
      }
    } else {
      new Notice(`No results found for "${searchTerm}".`);
    }
}

  // onunload
  onunload() {
    console.log('Unloading Book of Mormon Plugin...');
  }
}
