import { BaseElement } from '../../../components/base-element';
import { getLengthChar, getShuffledWords } from '../../../utils/words-game';

export class SourceSection extends BaseElement {
  private wordElements: BaseElement[] | undefined;

  constructor(words: string[] | null) {
    super({
      tagName: 'section',
      classNames: 'source-data',
    });

    this.wordElements = words?.map((el, i) => {
      const word = new BaseElement({ tagName: 'div', classNames: 'word' });
      const spatLeft = new BaseElement({ tagName: 'span', classNames: 'left' });
      const spatText = new BaseElement({ tagName: 'span', classNames: 'text', textContent: el });
      const spatRight = new BaseElement({ tagName: 'span', classNames: 'right' });

      if (i === 0) {
        word.insertChildren([spatText, spatRight]);
      } else if (i === words.length - 1) {
        word.insertChildren([spatLeft, spatText]);
      } else {
        word.insertChildren([spatLeft, spatText, spatRight]);
      }
      word.setStyleWidth(el.length * getLengthChar(words || []));
      return word;
    });
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
