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

  private audioHintIcon: BaseComponent<HTMLElement> | undefined;

  private audioIcon: BaseComponent<HTMLElement>;

  constructor(gameProps: GameProps, addBackgroundImg: () => void) {
    super({
      tagName: 'section',
      classNames: 'hints',
    });

    const urlSound = getSound(gameProps);
    this.audioIcon = new BaseComponent({
      tagName: 'span',
      classNames: ['material-symbols-outlined', 'audio'],
      textContent: 'play_circle',
    });
    const audio = new Audio(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${urlSound}`,
    );

    this.audioIcon.setOnclick(() => {
      audio.play();
      this.audioIcon.setClassName('audio-play');
    });
    audio.onended = () => this.audioIcon.removeClassName('audio-play');

    this.drawTranslationHint();
    this.drawBackgroundImgHint(addBackgroundImg);
    this.drawAudioHint();
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

  drawAudioHint() {
    const audioHint = new Button(
      {
        classNames: ['hint'],
      },
      () => {
        localStorageService.toggleData('audioHint', 'on');
        this.setAudioHintState();
      },
    );

    this.audioHintIcon = new BaseComponent({
      tagName: 'span',
      classNames: 'material-symbols-outlined',
    });

    this.setAudioHintState();

    audioHint.insertChild(this.audioHintIcon.getElement());

    this.insertChildren([audioHint]);
  }

  setTranslateHintState() {
    if (localStorageService.getData('translateHint')) {
      this.translationIcon?.setTextContent('lightbulb');
      this.addTextContentInTranslationField();
    } else {
      this.translationIcon?.setTextContent('light_off');
      this.translationHintField?.setTextContent('');
    }
  }

  addTextContentInTranslationField() {
    this.translationHintField?.setTextContent(gameService.getRussianSentence() || '');
  }

  setBackgroundImgHintState() {
    if (localStorageService.getData('puzzleHint')) {
      this.puzzleIcon?.setTextContent('extension');
    } else {
      this.puzzleIcon?.setTextContent('extension_off');
    }
  }

  setAudioHintState() {
    if (localStorageService.getData('audioHint')) {
      this.audioHintIcon?.setTextContent('volume_up');
      this.getElement().prepend(this.audioIcon.getElement());
    } else {
      this.audioHintIcon?.setTextContent('volume_off');
      this.audioIcon.destroy();
    }
  }
}
