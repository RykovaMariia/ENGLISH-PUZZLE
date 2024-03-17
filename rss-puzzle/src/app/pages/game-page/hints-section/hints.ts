import './hints.scss';
import { BaseComponent } from '../../../components/base-component';
import { Button } from '../../../components/button/button-component';
import { gameService } from '../../../services/game-service';
import { localStorageService } from '../../../services/storage-service';

export class Hints extends BaseComponent {
  private translationHintField: BaseComponent | undefined;

  private translationIcon: BaseComponent | undefined;

  constructor() {
    super({
      tagName: 'section',
      classNames: 'hints',
    });
    this.drawTranslationHint();
  }

  drawTranslationHint() {
    this.translationHintField = new BaseComponent({
      tagName: 'span',
      classNames: 'translation-field',
    });

    const translationHint = new Button(
      {
        classNames: ['translation-hint'],
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

  setTranslateHintState() {
    if (localStorageService.getData('translateHint')) {
      this.translationIcon?.setTextContent('lightbulb');
      this.translationHintField?.setTextContent(gameService.getRussianSentence() || '');
    } else {
      this.translationIcon?.setTextContent('light_off');
      this.translationHintField?.setTextContent('');
    }
  }
}
