import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PriceInput } from './priceInput';

@Component({
  selector: 'app-price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceInputComponent),
      multi: true,
    },
  ],
})
export class PriceInputComponent implements OnInit, ControlValueAccessor {
  @Input() weekday: string;
  @Input() disabled = false;

  value: PriceInput = {
    am: null,
    pm: null,
  };

  constructor() {}

  ngOnInit(): void {}

  onChange: any = () => {};
  onTouch: any = () => {};

  private sanitize(target): number {
    target.value = target.value.replace(/\D/g, '');
    return target.value.length ? +target.value : null;
  }

  changeAm(target) {
    this.value.am = this.sanitize(target);
    this.onChange(this.value);
  }

  changePm(target) {
    this.value.pm = this.sanitize(target);
    this.onChange(this.value);
  }

  writeValue(obj: any): void {
    if (obj === null) {
      this.value = {
        am: null,
        pm: null,
      };
    } else {
      this.value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
