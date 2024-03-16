import { BaseElement } from '../../../components/base-element';
import { Button } from '../../../components/button/button';
import { gameService } from '../../../services/game-service';

export class Hints extends BaseElement {
  constructor() {
    super({
      tagName: 'section',
      classNames: 'hints',
    });
    this.drawTranslationHint();
  }

  drawTranslationHint() {
    const translationHintField = new BaseElement({
      tagName: 'span',
      classNames: 'translation-field',
    });

    const translationHint = new Button(
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

    const translationIcon = new BaseElement({
      tagName: 'span',
      classNames: 'material-symbols-outlined',
      textContent: 'lightbulb',
    });

    translationHint.insertChild(translationIcon.getElement());

    this.insertChildren([translationHintField, translationHint]);
  }
}
