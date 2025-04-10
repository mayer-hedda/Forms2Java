import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



interface Coordinate {
  CharacterCellWidth: string;
  RealUnit: string;
  DefaultFontScaling: boolean;
  CharacterCellHeight: string;
  CoordinateSystem: string;
}

interface Block {
  Name: string;
  DirtyInfo: string;
  DatabaseBlock: boolean;
  ScrollbarWidth: number;
  ScrollbarLength: number,
  Item: Item | Item[];
  BackColor?: string; // Optional property for background color
  ForegroundColor?: string;
  FontName?: string;
  FontSize?: string;
  FontStyle?: string;
  FontWeight?: string;
  FontSpacing?: string;
  XPosition?: number;
  YPosition?: number;
  Width?: number;
  Height?: number;


}

interface Item {
  Name: string;
  ItemType: string;
  Label?: string;
  Prompt?: string;
  Value?: any;
  CheckedValue?: any;
  UncheckedValue?: any;
  RadioButton?: { Name: string, Label: string }[];
  ListItemElement?: { Name: string, Value: string, Index: string }[];

  // Style properties
  BackColor?: string;
  ForegroundColor?: string;
  FontName?: string;
  FontSize?: string;
  FontStyle?: string;
  FontWeight?: string;
  FontSpacing?: string;

  XPosition?: number;
  YPosition?: number;
  Width?: number;
  Height?: number;
}

interface FormModule {
  Name: string;
  DirtyInfo: string;
  Title: string;
  ConsoleWindow: string;
  MenuModule: string;
  Coordinate: Coordinate;
  Block: Block | Block[];
}



@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JsonFormComponent implements OnChanges {
  @Input() jsonData: { FormModule: FormModule } | undefined;
  displayData: { FormModule: FormModule } | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonData']) {
      this.displayData = this.deepCopy(this.jsonData);
      this.initializeValues();
    }
  }

  getBlocks(data: {FormModule: FormModule} | undefined): Block[] {
    const block = data?.FormModule?.Block;
    return block ? (Array.isArray(block) ? block : [block]) : [];
  }


  getItems(block: Block): Item[] {
    const item = block.Item;
    return item ? (Array.isArray(item) ? item : [item]) : [];
  }

  getInputType(dataType: string): string {
    switch (dataType) {
      case 'Number':
        return 'number';
      case 'VARCHAR2': // Oracle string típus
        return 'text';
      // További típusok hozzáadása
      default:
        return 'text'; // alapértelmezett típus
    }
  }

  private deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  private initializeValues() {

    const blocks = this.getBlocks(this.displayData);


    for (const block of blocks) {
      const items = this.getItems(block);
      for (const item of items) {
        if (item.ItemType === "Check Box") {
          item.Value = item.UncheckedValue || false;
        } else if (item.ItemType === "Radio Group") {
          item.Value = "";
        } else if (item.ItemType === "List Item") {
          item.Value = item.ListItemElement?.[0]?.Name;
        } else if (typeof item.Value === 'undefined'){
          item.Value = '';
        }
      }
    }

  }
}
