import { BaseElement } from '../../../components/base-element';
import { getShuffledWords } from '../../../utils/words-game';

export class SourceSection extends BaseElement {
  private wordElements: BaseElement[] | undefined;

  constructor(words: string[] | null) {
    super({
      tagName: 'section',
      classNames: 'source-data',
    });

    this.wordElements = words?.map(
      (el) => new BaseElement({ tagName: 'div', classNames: 'word', textContent: el }),
    );
    this.insertChildren(getShuffledWords<BaseElement>(this.wordElements ?? []));
  }

  getSourceWordElements() {
    return this.wordElements;
  }

  addWordInSource(wordElement: HTMLElement) {
    const currentElements = Array.from(this.getElement().children).slice();
    const wordHtmlElements = this.wordElements?.map((el) => el.getElement());

    const lastWord = currentElements
      .reverse()
      .find((el) => wordHtmlElements?.includes(el as HTMLElement));

    if (lastWord) {
      lastWord.after(wordElement);
    } else {
      this.getElement().prepend(wordElement);
    }
  }
}
