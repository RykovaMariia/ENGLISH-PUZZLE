import './hints.scss';
import { BaseComponent } from '../../../components/base-component';
import { ButtonComponent } from '../../../components/button/button-component';
import { gameService } from '../../../services/game-service';

export class Hints extends BaseComponent {
  constructor() {
    super({
      tagName: 'section',
      classNames: 'hints',
    });
    this.drawTranslationHint();
  }

  drawTranslationHint() {
    const translationHintField = new BaseComponent({
      tagName: 'span',
      classNames: 'translation-field',
    });

    const translationHint = new ButtonComponent(
      {
        classNames: ['translation-hint'],
      },
      () => {
        if (translationHintField.getTextContent() === '') {
          translationHintField.setTextContent(gameService.getRussianSentence() || '');
        } else {
          translationHintField.setTextContent('');
        }
      },
    );

    const translationIcon = new BaseComponent({
      tagName: 'span',
      classNames: 'material-symbols-outlined',
      textContent: 'lightbulb',
    });

    translationHint.insertChild(translationIcon.getElement());

    this.insertChildren([translationHintField, translationHint]);
  }
}
