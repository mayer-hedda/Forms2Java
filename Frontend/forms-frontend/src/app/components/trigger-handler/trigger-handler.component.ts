import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggerService, Trigger } from '../../services/trigger.service';

@Component({
  selector: 'app-trigger-handler',
  templateUrl: './trigger-handler.component.html',
  styleUrls: ['./trigger-handler.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TriggerHandlerComponent implements OnInit, OnChanges {
  @Input() triggers: Trigger[] = [];
  @Input() formData: any = {};
  @Input() itemName: string = '';
  @Input() blockName: string = '';

  constructor(private triggerService: TriggerService) {}

  ngOnInit() {
    // Form állapot frissítése
    this.triggerService.updateFormState(this.formData);
    
    // Alapértelmezett triggerek végrehajtása
    this.executeDefaultTriggers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formData']) {
      // Form állapot frissítése, ha változik
      this.triggerService.updateFormState(this.formData);
    }
  }

  // Alapértelmezett triggerek végrehajtása
  private executeDefaultTriggers() {
    // ON-LOGON trigger
    this.executeTriggerByName('ON-LOGON');
    
    // WHEN-NEW-FORM-INSTANCE trigger
    this.executeTriggerByName('WHEN-NEW-FORM-INSTANCE');
  }

  // Trigger végrehajtása név alapján
  executeTriggerByName(triggerName: string, params: any = {}) {
    const trigger = this.triggers.find(t => t.Name === triggerName);
    if (trigger) {
      this.executeTrigger(trigger, params);
    }
  }

  // Trigger végrehajtása
  executeTrigger(trigger: Trigger, params: any = {}) {
    // További paraméterek hozzáadása
    const triggerParams = {
      ...params,
      itemName: this.itemName,
      blockName: this.blockName,
      formData: this.formData
    };

    // Trigger végrehajtása
    this.triggerService.executeTrigger(trigger as Trigger, triggerParams);
  }

  // Gomb megnyomás kezelése
  onButtonPress(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Elem változás kezelése
  onItemChange(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Egér kattintás kezelése
  onMouseClick(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Egér dupla kattintás kezelése
  onMouseDoubleClick(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Egér belépés kezelése
  onMouseEnter(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Egér kilépés kezelése
  onMouseLeave(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Egér mozgás kezelése
  onMouseMove(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Időzítő lejárás kezelése
  onTimerExpired(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Elem validálás kezelése
  onValidateItem(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord validálás kezelése
  onValidateRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Blokk törlés kezelése
  onClearBlock(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Form törlés kezelése
  onClearForm(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord létrehozás kezelése
  onCreateRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord törlés kezelése
  onDeleteRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord duplikálás kezelése
  onDuplicateRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord lekérdezés kezelése
  onFetchRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord zárolás kezelése
  onLockRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord eltávolítás kezelése
  onRemoveRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }

  // Rekord frissítés kezelése
  onUpdateRecord(trigger: Trigger) {
    this.executeTrigger(trigger);
  }
} 