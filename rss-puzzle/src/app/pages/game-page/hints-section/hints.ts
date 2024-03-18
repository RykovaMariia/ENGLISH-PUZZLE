import './hints.scss';
import { BaseComponent } from '../../../components/base-component';
import { Button } from '../../../components/button/button-component';
import { gameService } from '../../../services/game-service';
import { localStorageService } from '../../../services/storage-service';
import { GameProps } from '../../../interfaces/game-props';
import { getSound } from '../../../utils/words-game';

export class Hints extends BaseComponent {
  private translationHintField: BaseComponent | undefined;

  private translationIcon: BaseComponent | undefined;

  private puzzleIcon: BaseComponent | undefined;

  constructor(gameProps: GameProps, addBackgroundImg: () => void) {
    super({
      tagName: 'section',
      classNames: 'hints',
    });
    const urlSound = getSound(gameProps);
    this.drawAudioHint(urlSound || '');
    this.drawTranslationHint();
    this.drawBackgroundImgHint(addBackgroundImg);
  }

  drawAudioHint(urlSound: string) {
    const audioIcon = new BaseComponent({
      tagName: 'span',
      classNames: ['material-symbols-outlined', 'audio'],
      textContent: 'play_circle',
    });
    const audio = new Audio(`./assets/${urlSound}`);

    audioIcon.setOnclick(() => {
      audio.play();
      audioIcon.setClassName('audio-play');
    });
    // eslint-disable-next-line no-param-reassign
    audio.onended = () => audioIcon.removeClassName('audio-play');

    this.insertChildren([audioIcon]);
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
