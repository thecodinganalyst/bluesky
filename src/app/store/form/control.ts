export interface Control {
  name: string;
  value?: any;
  label: string;
  required: boolean;
  order?: number;
  controlType: 'textbox' | 'textarea' | 'dropdown';
  type?: 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
  options?: ControlOption[];
  size?: string;
}

export interface ControlOption {
  display: string;
  value: string | number | boolean;
}

export interface ActionButton {
  name: string;
  label: string;
  order?: number;
  behavior: 'submit' | 'reset' | 'button';
  color?: 'primary' | 'accent' | 'warn';
  action?: string;
}
