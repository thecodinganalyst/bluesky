export interface ControlBase<T> {
  label?: string;
}

export class Control<T> implements ControlBase<T>{
  value: T|undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  size: number;
  options: {key: string, value: string}[];

  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    size?: number;
    options?: {key: string, value: string}[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.size = options.size || 1;
    this.options = options.options || [];
  }
}

export class ControlGroup<T> implements ControlBase<T>{
  controls: ControlBase<T>[];
  label: string;

  constructor(options: {
    label?: string,
    controls?: ControlBase<T>[]
  } = {}) {
    this.controls = options.controls || [];
    this.label = options.label || '';
  }
}
