import { Ng4HackernewsPage } from './app.po';

describe('ng4-hackernews App', () => {
  let page: Ng4HackernewsPage;

  beforeEach(() => {
    page = new Ng4HackernewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
