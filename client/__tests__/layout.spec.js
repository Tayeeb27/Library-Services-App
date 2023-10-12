const { renderDOM } = require('./helpers');
let dom;
let document;

describe('home.html and footer.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('../home.html');
    document = await dom.window.document;
  });


  it('should have a title element', () => {
    const titleElement = document.querySelector('title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toBe('Home');
  });

  it('should contain a welcome message', () => {
    const welcomeMessage = document.querySelector('h1');
    expect(welcomeMessage).toBeTruthy();
    expect(welcomeMessage.textContent).toContain('Welcome');
  });

  it('should have a carousel with images', () => {
    const carousel = document.querySelector('.carousel');
    expect(carousel).toBeTruthy();

    const carouselImages = document.querySelectorAll('.carousel-item img');
    expect(carouselImages.length).toBeGreaterThan(0);
    carouselImages.forEach((image) => {
      expect(image.getAttribute('src')).toBeTruthy();
    });
  });

  it('should have a navigation section', () => {
    const navSection = document.querySelector('#nav');
    expect(navSection).toBeTruthy();
  });

  // Tests for footer.html

  it('should load a footer via iframe', () => {
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('src')).toBe('footer.html');
  });
});
describe('About Page', () => {
    // Before each test, create a JSDOM environment and set up the document.
    beforeEach(async () => {
        dom = await renderDOM('../about.html');
        document = await dom.window.document;
    });
    it('should have a title element with the text "About"', () => {
      const titleElement = document.querySelector('title');
      expect(titleElement).toBeTruthy();
      expect(titleElement.textContent).toBe('About');
    });
  
    it('should display a welcome message', () => {
      const welcomeMessage = document.querySelector('h1');
      expect(welcomeMessage).toBeTruthy();
      expect(welcomeMessage.textContent).toContain('Meet The Team');
    });
  
  });
  describe('Books Page', () => {
    beforeEach(async () => {
        dom = await renderDOM('../book.html');
        document = await dom.window.document;
    });

    it('should have a title element', () => {
        const titleElement = document.querySelector('title');
        expect(titleElement).toBeTruthy();
        expect(titleElement.textContent).toBe('Books');
    });

    it('should have a search input for book titles', () => {
        const searchInput = document.querySelector('#searchbooktext');
        expect(searchInput).toBeTruthy();
    });

    it('should have a search button', () => {
        const searchButton = document.querySelector('#searchbookbtn');
        expect(searchButton).toBeTruthy();
    });

    it('should have a dropdown for book genres', () => {
        const dropdownButton = document.querySelector('.dropbtn');
        const dropdownContent = document.querySelector('.dropdown-content');
        expect(dropdownButton).toBeTruthy();
        expect(dropdownContent).toBeTruthy();
    });

    it('should have a section for displaying books', () => {
        const booksContainer = document.querySelector('#booksContainer');
        expect(booksContainer).toBeTruthy();
    });

    it('should have a form for collection date and order reference', () => {
        const datePicker = document.querySelector('#datePicker');
        const orderRef = document.querySelector('#orderRef');
        const orderButton = document.querySelector('#orderBtn');
        expect(datePicker).toBeTruthy();
        expect(orderRef).toBeTruthy();
        expect(orderButton).toBeTruthy();
    });

    it('should have a section for reserved books (basket)', () => {
        const basketTitle = document.querySelector('.basketAll h2');
        const basketContainer = document.querySelector('.basket');
        expect(basketTitle).toBeTruthy();
        expect(basketContainer).toBeTruthy();
    });

    it('should load a footer via iframe', () => {
        const iframe = document.querySelector('iframe');
        expect(iframe).toBeTruthy();
        expect(iframe.getAttribute('src')).toBe('footer.html');
    });
});
