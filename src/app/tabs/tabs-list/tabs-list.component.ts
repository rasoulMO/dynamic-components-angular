import {PeopleListComponent} from '../../people/people-list/people-list.component';
import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import {TabsContentComponent} from '../tabs-content/tabs-content.component';
import {DynamicTabAnchorDirective} from '../dynamic-tab-anchor.directive';

@Component({
  selector: 'ngx-tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.tabTitle}}</a>
      </li>
      <!-- dynamic tabs -->
      <li *ngFor="let tab of dynamicTabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.tabTitle}} <span class="tab-close" *ngIf="tab.isCloseable" (click)="closeTab(tab)">x</span></a>
      </li>
    </ul>
    <ng-content></ng-content>
    <ng-template dynamicTabAnchor #container></ng-template>
  `
})
export class TabsListComponent implements AfterContentInit {
  @ContentChildren(TabsContentComponent)
  tabs!: QueryList<TabsContentComponent>;
  @ViewChild(DynamicTabAnchorDirective)
  dynamicTabPlaceholder!: DynamicTabAnchorDirective;
  // @ViewChild('container', { read: ViewContainerRef })
  // dynamicTabPlaceholder;
  dynamicTabs: TabsContentComponent[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  openTab(title: string, template: any, data: any, isCloseable = false) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      TabsContentComponent
    );

    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // create a component instance
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    const instance: TabsContentComponent = componentRef.instance as TabsContentComponent;
    instance.tabTitle = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    this.dynamicTabs.push(instance);

    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  selectTab(tab: TabsContentComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  closeTab(tab: TabsContentComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);

        const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        viewContainerRef.remove(i);

        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  closeActiveTab() {
    let activeTab = this.dynamicTabs.filter(tab => tab.active);
    if (activeTab.length > 0) {
      this.closeTab(activeTab[0]);
    }
  }
}

