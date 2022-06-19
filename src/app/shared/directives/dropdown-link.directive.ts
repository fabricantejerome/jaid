import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy } from '@angular/core';

import { AppDropdownDirective } from './dropdown.directive';

@Directive({
  selector: '[appDropdownLink]',
})
export class DropdownLinkDirective implements OnInit, OnDestroy {
  @Input() public group: any;

  protected _open: boolean;
  protected nav: AppDropdownDirective;

  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    // if (value) {
    //   this.nav.closeOtherLinks(this);
    // }
  }

  public constructor(@Inject(AppDropdownDirective) nav: AppDropdownDirective) {
    this.nav = nav;
  }

  public ngOnInit(): any {
    this.nav.addLink(this);
  }

  public ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  public toggle(): any {
    this.open = !this.open;
  }
}
