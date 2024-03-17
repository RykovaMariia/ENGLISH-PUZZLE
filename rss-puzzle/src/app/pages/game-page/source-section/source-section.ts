import { BaseComponent } from '../../../components/base-component';
import { WordComponent } from '../../../components/word/word-component';
import { GameProps } from '../../../interfaces/game-props';
import { localStorageService } from '../../../services/storage-service';
import { getImage, getLengthChar, getShuffledWords } from '../../../utils/words-game';

export class SourceSection extends BaseComponent {
  private wordElements: BaseComponent[] | undefined;

  constructor(words: string[] | null, gameProps: GameProps) {
    super({
      tagName: 'section',
      classNames: 'source-data',
    });
    if (words) this.drawPuzzle(words, gameProps);
  }

  drawPuzzle(words: string[], gameProps: GameProps) {
    let lengthCount = 0;
    const urlImg = getImage(gameProps.level, gameProps.round);

    this.wordElements = words.map((el, i) => {
      const wordCard = new WordComponent(
        { classNames: 'word' },
        { isEmpty: false, textContent: el, isFirst: i === 0, isLast: i === words.length - 1 },
      );

      const lengthWord = el.length * getLengthChar(words || []);
      wordCard.setStyleWidth(lengthWord);

      if (localStorageService.getData('puzzleHint')) {
        const y = gameProps.sentence * 10;
        wordCard.setBackgroundImgForSpanText(urlImg, lengthCount, y);
        lengthCount += lengthWord;
        wordCard.setBackgroundImgForSpanRight(urlImg, lengthCount - 6, y);
      }

      return wordCard;
    });
    this.insertChildren(getShuffledWords<BaseComponent>(this.wordElements ?? []));
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
