import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-dynamic-loader',
  template: `
    <div>
      <select (change)="onComponentSelect($event)">
        <option value="">Select a component</option>
        <option *ngFor="let component of componentNames" [value]="component">{{ component }}</option>
      </select>
    </div>
    <ng-container #dynamicComponentContainer></ng-container>
  `,
})
export class DynamicLoaderComponent {
  @ViewChild('dynamicComponentContainer', { static: false, read: ViewContainerRef }) container!: ViewContainerRef;

  componentNames = ['module1', 'module2'];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  onComponentSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const componentName = selectElement.value;
    this.loadComponent(componentName);
  }

  async loadComponent(componentName: string) {
    if (!componentName) return;

    try {
      const module = await import(`./generated/${componentName}/${componentName}.component`);
      const componentType = Object.values(module)[0] as any;

      if (!componentType) {
        console.error(`Component "${componentName}" could not be loaded!`);
        return;
      }

      this.container.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.container.createComponent(factory);
    } catch (error) {
      console.error(`Failed to load component "${componentName}"`, error);
    }
  }
}