import { Modal, App, Notice } from 'obsidian';


// Modal for user input
export class SearchTermModal extends Modal {
  
    onSubmit: (result: string) => void;
  
    constructor(app: App, onSubmit: (result: string) => void) {
      super(app);
      this.onSubmit = onSubmit;
    }
  
    onOpen() {
      const { contentEl } = this;
      contentEl.createEl('h2', { text: 'Search Book of Mormon' });
  
      // Create input field
      const searchInput = contentEl.createEl('input', { type: 'text', placeholder: 'Enter book name or chapter' });
      searchInput.focus();


      contentEl.createEl('h4', { text: `static result`});
  
      searchInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
          this.onSubmit(searchInput.value);

          // array of returned results
    //       let results = 

    //       results.forEach(item => {
    //         console.log('not empty')
    //     });
    //   console.log('empty')


          this.close(); // closes the modal
        }
      });
    }
  
    onClose() {
      this.contentEl.empty();
    }
}

  