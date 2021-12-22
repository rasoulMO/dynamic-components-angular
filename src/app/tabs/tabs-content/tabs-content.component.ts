import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-tab',
  styles: [
    `
    .pane{
      padding: 1rem;
    }
  `
  ],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
      <ng-container *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{person: dataContext}">
      </ng-container>
    </div>
  `
})
export class TabsContentComponent {
  @Input() tabTitle!: string;
  @Input() active: boolean = false;
  @Input() template: any;
  @Input() dataContext: any;
  @Input() isCloseable: boolean = false;
}
