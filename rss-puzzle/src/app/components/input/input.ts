import { BaseElement, TaggedElementProps } from '../base-element';

interface InputProps {
  valueType?: string;
  id?: string;
  cb?: (e: Event) => void;
}

interface ValidationProps {
  isRequired?: boolean;
  patternValue?: string;
  minlengthValue?: number;
}

export class Input extends BaseElement<HTMLInputElement> {
  constructor(props: TaggedElementProps, inputProps: InputProps) {
    super({ tagName: 'input', ...props });

    this.setAttribute({ name: 'type', value: inputProps?.valueType ?? 'text' });
    if (inputProps.id) this.setAttribute({ name: 'id', value: inputProps.id });
    if (inputProps.cb) this.setHandler(inputProps.cb);
  }

  setValidation(validationProps: ValidationProps) {
    this.element.required = validationProps.isRequired ?? false;
    if (validationProps.patternValue) {
      this.setAttribute({ name: 'pattern', value: validationProps.patternValue });
    }
    if (validationProps.minlengthValue) {
      this.setAttribute({ name: 'minlength', value: validationProps.minlengthValue.toString() });
    }
  }

  setHandler(cb: (e: Event) => void) {
    if (typeof cb === 'function') {
      this.element.addEventListener('input', (e) => cb(e));
    }
  }

  getValue() {
    return this.element.value;
  }

  isValid() {
    return this.element.validity.valid;
  }

  isValueMissing() {
    return this.element.validity.valueMissing;
  }

  isPatternMismatch() {
    return this.element.validity.patternMismatch;
  }

  isTooShort() {
    return this.element.validity.tooShort;
  }
}
