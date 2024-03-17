import { BaseComponent } from '../../../components/base-component';
import { WordComponent } from '../../../components/word/word-component';
import { GameProps } from '../../../interfaces/game-props';
import { localStorageService } from '../../../services/storage-service';
import { getImage, getLengthChar, getShuffledWords } from '../../../utils/words-game';

export class SourceSection extends BaseComponent {
  private wordElements: WordComponent[] | undefined;

  constructor(words: string[] | null, gameProps: GameProps) {
    super({
      tagName: 'section',
      classNames: 'source-data',
    });
    if (words) this.drawPuzzle(words, gameProps);
  }

  drawPuzzle(words: string[], gameProps: GameProps) {
    this.wordElements = words.map((el, i) => {
      const wordCard = new WordComponent(
        { classNames: 'word' },
        { isEmpty: false, textContent: el, isFirst: i === 0, isLast: i === words.length - 1 },
      );

      const lengthWord = el.length * getLengthChar(words || []);
      wordCard.setStyleWidth(lengthWord);

      return wordCard;
    });

    this.addBackgroundImg(words, gameProps);

    this.insertChildren(getShuffledWords<BaseComponent>(this.wordElements ?? []));
  }

  addBackgroundImg(words: string[] | null, gameProps: GameProps) {
    const urlImg = getImage(gameProps.level, gameProps.round);
    let lengthCount = 0;

    this.wordElements?.forEach((el, i) => {
      if (words && localStorageService.getData('puzzleHint')) {
        const lengthWord = words[i].length * getLengthChar(words);
        el.setBackgroundImgForSpanText(urlImg, lengthCount, gameProps.sentence * 10);
        lengthCount += lengthWord;
        el.setBackgroundImgForSpanRight(urlImg, lengthCount - 6, gameProps.sentence * 10);
      } else {
        el.setBackgroundImgForSpanText('', 0, 0);
        el.setBackgroundImgForSpanRight('', 0, 0);
      }
    });
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
