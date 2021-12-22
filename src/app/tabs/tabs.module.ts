import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsListComponent} from './tabs-list/tabs-list.component';
import {TabsContentComponent} from './tabs-content/tabs-content.component';
import {DynamicTabAnchorDirective} from './dynamic-tab-anchor.directive';


@NgModule({
  declarations: [
    TabsListComponent,
    TabsContentComponent,
    DynamicTabAnchorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [TabsListComponent,
    TabsContentComponent],
  entryComponents: [TabsListComponent]
})
export class TabsModule { }
