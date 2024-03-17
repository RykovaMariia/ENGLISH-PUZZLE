import './hints.scss';
import { BaseComponent } from '../../../components/base-component';
import { Button } from '../../../components/button/button-component';
import { gameService } from '../../../services/game-service';
import { localStorageService } from '../../../services/storage-service';

export class Hints extends BaseComponent {
  private translationHintField: BaseComponent | undefined;

  private translationIcon: BaseComponent | undefined;

  private puzzleIcon: BaseComponent | undefined;

  constructor(addBackgroundImg: () => void) {
    super({
      tagName: 'section',
      classNames: 'hints',
    });
    this.drawTranslationHint();
    this.drawBackgroundImgHint(addBackgroundImg);
  }

  drawTranslationHint() {
    this.translationHintField = new BaseComponent({
      tagName: 'span',
      classNames: 'translation-field',
    });

    const translationHint = new Button(
      {
        classNames: ['hint'],
      },
      () => {
        localStorageService.toggleData('translateHint', 'on');
        this.setTranslateHintState();
      },
    );

    this.translationIcon = new BaseComponent({
      tagName: 'span',
      classNames: 'material-symbols-outlined',
    });

    this.setTranslateHintState();

    translationHint.insertChild(this.translationIcon.getElement());

    this.insertChildren([this.translationHintField, translationHint]);
  }

  drawBackgroundImgHint(addBackgroundImg: () => void) {
    const backgroundImgHint = new Button(
      {
        classNames: ['hint'],
      },
      () => {
        localStorageService.toggleData('puzzleHint', 'on');
        this.setBackgroundImgHintState();
        addBackgroundImg();
      },
    );

    this.puzzleIcon = new BaseComponent({
      tagName: 'span',
      classNames: 'material-symbols-outlined',
    });

    this.setBackgroundImgHintState();

    backgroundImgHint.insertChild(this.puzzleIcon.getElement());

    this.insertChildren([backgroundImgHint]);
  }

  setTranslateHintState() {
    if (localStorageService.getData('translateHint')) {
      this.translationIcon?.setTextContent('lightbulb');
      this.translationHintField?.setTextContent(gameService.getRussianSentence() || '');
    } else {
      this.translationIcon?.setTextContent('light_off');
      this.translationHintField?.setTextContent('');
    }
  }

  setBackgroundImgHintState() {
    if (localStorageService.getData('puzzleHint')) {
      this.puzzleIcon?.setTextContent('extension');
    } else {
      this.puzzleIcon?.setTextContent('extension_off');
    }
  }
}
