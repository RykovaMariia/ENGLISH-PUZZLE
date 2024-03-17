import { BaseComponent, TaggedElementProps } from '../base-component';

interface WordProps {
  isEmpty: boolean;
  textContent?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export class WordComponent extends BaseComponent {
  private spanText;

  private spanRight;

  constructor(props: TaggedElementProps, word?: WordProps) {
    super({ tagName: 'div', ...props });
    if (!word?.isEmpty) {
      const spanLeft = new BaseComponent({ tagName: 'span', classNames: 'left' });
      this.spanText = new BaseComponent({
        tagName: 'span',
        classNames: 'text',
        textContent: word?.textContent,
      });
      this.spanRight = new BaseComponent({ tagName: 'span', classNames: 'right' });

      if (word?.isFirst) {
        this.insertChildren([this.spanText, this.spanRight]);
      } else if (word?.isLast) {
        this.insertChildren([spanLeft, this.spanText]);
      } else {
        this.insertChildren([spanLeft, this.spanText, this.spanRight]);
      }
    }
  }

  setBackgroundImgForSpanText(urlImg: string | undefined, lengthCount: number, y: number) {
    this.spanText?.setBackgroundImg(urlImg, lengthCount, y);
  }

  setBackgroundImgForSpanRight(urlImg: string | undefined, lengthCount: number, y: number) {
    this.spanRight?.setBackgroundImg(urlImg, lengthCount, y);
  }
}
