import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Trigger {
  Name: string;
  DirtyInfo: string;
  TriggerText: string;
}

@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  private formState = new BehaviorSubject<any>({});
  private triggerHandlers = new Map<string, (params: any) => void>();

  constructor() {
    this.initializeDefaultHandlers();
  }

  private initializeDefaultHandlers() {
    // Alapértelmezett trigger kezelők regisztrálása
    this.registerHandler('ON-LOGON', this.handleOnLogon.bind(this));
    this.registerHandler('WHEN-NEW-FORM-INSTANCE', this.handleWhenNewFormInstance.bind(this));
    this.registerHandler('WHEN-WINDOW-CLOSED', this.handleWhenWindowClosed.bind(this));
    this.registerHandler('WHEN-BUTTON-PRESSED', this.handleWhenButtonPressed.bind(this));
    this.registerHandler('WHEN-ITEM-CHANGED', this.handleWhenItemChanged.bind(this));
    this.registerHandler('WHEN-MOUSE-CLICK', this.handleWhenMouseClick.bind(this));
    this.registerHandler('WHEN-MOUSE-DOUBLE-CLICK', this.handleWhenMouseDoubleClick.bind(this));
    this.registerHandler('WHEN-MOUSE-ENTER', this.handleWhenMouseEnter.bind(this));
    this.registerHandler('WHEN-MOUSE-LEAVE', this.handleWhenMouseLeave.bind(this));
    this.registerHandler('WHEN-MOUSE-MOVE', this.handleWhenMouseMove.bind(this));
    this.registerHandler('WHEN-TIMER-EXPIRED', this.handleWhenTimerExpired.bind(this));
    this.registerHandler('WHEN-VALIDATE-ITEM', this.handleWhenValidateItem.bind(this));
    this.registerHandler('WHEN-VALIDATE-RECORD', this.handleWhenValidateRecord.bind(this));
    this.registerHandler('WHEN-CLEAR-BLOCK', this.handleWhenClearBlock.bind(this));
    this.registerHandler('WHEN-CLEAR-FORM', this.handleWhenClearForm.bind(this));
    this.registerHandler('WHEN-CREATE-RECORD', this.handleWhenCreateRecord.bind(this));
    this.registerHandler('WHEN-DELETE-RECORD', this.handleWhenDeleteRecord.bind(this));
    this.registerHandler('WHEN-DUPLICATE-RECORD', this.handleWhenDuplicateRecord.bind(this));
    this.registerHandler('WHEN-FETCH-RECORD', this.handleWhenFetchRecord.bind(this));
    this.registerHandler('WHEN-LOCK-RECORD', this.handleWhenLockRecord.bind(this));
    this.registerHandler('WHEN-REMOVE-RECORD', this.handleWhenRemoveRecord.bind(this));
    this.registerHandler('WHEN-UPDATE-RECORD', this.handleWhenUpdateRecord.bind(this));
  }

  // Trigger kezelő regisztrálása
  registerHandler(triggerName: string, handler: (params: any) => void) {
    this.triggerHandlers.set(triggerName, handler);
  }

  // Trigger végrehajtása
  executeTrigger(trigger: string | Trigger, params: any = {}) {
    if (typeof trigger === 'string') {
      // Ha string, akkor a trigger neve
      const triggerName = trigger;
      const handler = this.triggerHandlers.get(triggerName);
      
      if (handler) {
        // Ha van kezelő, akkor azt futtatjuk
        handler(params);
      } else {
        console.warn(`No handler found for trigger: ${triggerName}`);
      }
      return;
    }

    // Ha Trigger objektum
    if (!trigger || !trigger.Name) {
      console.warn('Invalid trigger object');
      return;
    }

    console.log(`Executing trigger: ${trigger.Name}`, trigger);

    // Trigger kezelő keresése
    const handler = this.triggerHandlers.get(trigger.Name);
    
    if (handler) {
      // Ha van kezelő, akkor azt futtatjuk
      handler(params);
    } else {
      // Ha nincs kezelő, akkor a PL/SQL kódot feldolgozzuk
      this.processPLSQL(trigger.TriggerText, params);
    }
  }

  // PL/SQL kód feldolgozása
  private processPLSQL(plsqlCode: string, params: any = {}) {
    if (!plsqlCode) return;

    console.log('Processing PL/SQL:', plsqlCode);

    // Egyszerű PL/SQL parancsok feldolgozása
    const commands = this.parsePLSQL(plsqlCode);
    
    for (const command of commands) {
      this.executePLSQLCommand(command, params);
    }
  }

  // PL/SQL kód feldolgozása parancsokra
  private parsePLSQL(plsqlCode: string): string[] {
    // Egyszerű feldolgozás: parancsok szétválasztása pontosvesszők alapján
    return plsqlCode.split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);
  }

  // PL/SQL parancs végrehajtása
  private executePLSQLCommand(command: string, params: any = {}) {
    // Alapvető PL/SQL parancsok kezelése
    if (command.includes('exit_form')) {
      this.handleExitForm(params);
    } else if (command.includes('commit_form')) {
      this.handleCommitForm(params);
    } else if (command.includes('rollback_form')) {
      this.handleRollbackForm(params);
    } else if (command.includes('clear_form')) {
      this.handleClearForm(params);
    } else if (command.includes('clear_block')) {
      this.handleClearBlock(params);
    } else if (command.includes('go_block')) {
      this.handleGoBlock(params);
    } else if (command.includes('go_item')) {
      this.handleGoItem(params);
    } else if (command.includes('show_alert')) {
      this.handleShowAlert(params);
    } else if (command.includes('show_message')) {
      this.handleShowMessage(params);
    } else if (command.includes('set_item_property')) {
      this.handleSetItemProperty(params);
    } else if (command.includes('set_window_property')) {
      this.handleSetWindowProperty(params);
    } else if (command.includes('set_canvas_property')) {
      this.handleSetCanvasProperty(params);
    } else {
      console.log('Unhandled PL/SQL command:', command);
    }
  }

  // Alapértelmezett trigger kezelők
  private handleOnLogon(params: any) {
    console.log('ON-LOGON trigger executed', params);
    // Implementáció
  }

  private handleWhenNewFormInstance(params: any) {
    console.log('WHEN-NEW-FORM-INSTANCE trigger executed', params);
    // Implementáció
  }

  private handleWhenWindowClosed(params: any) {
    console.log('WHEN-WINDOW-CLOSED trigger executed', params);
    // Implementáció
  }

  private handleWhenButtonPressed(params: any) {
    console.log('WHEN-BUTTON-PRESSED trigger executed', params);
    // Implementáció
  }

  private handleWhenItemChanged(params: any) {
    console.log('WHEN-ITEM-CHANGED trigger executed', params);
    // Implementáció
  }

  private handleWhenMouseClick(params: any) {
    console.log('WHEN-MOUSE-CLICK trigger executed', params);
    // Implementáció
  }

  private handleWhenMouseDoubleClick(params: any) {
    console.log('WHEN-MOUSE-DOUBLE-CLICK trigger executed', params);
    // Implementáció
  }

  private handleWhenMouseEnter(params: any) {
    console.log('WHEN-MOUSE-ENTER trigger executed', params);
    // Implementáció
  }

  private handleWhenMouseLeave(params: any) {
    console.log('WHEN-MOUSE-LEAVE trigger executed', params);
    // Implementáció
  }

  private handleWhenMouseMove(params: any) {
    console.log('WHEN-MOUSE-MOVE trigger executed', params);
    // Implementáció
  }

  private handleWhenTimerExpired(params: any) {
    console.log('WHEN-TIMER-EXPIRED trigger executed', params);
    // Implementáció
  }

  private handleWhenValidateItem(params: any) {
    console.log('WHEN-VALIDATE-ITEM trigger executed', params);
    // Implementáció
  }

  private handleWhenValidateRecord(params: any) {
    console.log('WHEN-VALIDATE-RECORD trigger executed', params);
    // Implementáció
  }

  private handleWhenClearBlock(params: any) {
    console.log('WHEN-CLEAR-BLOCK trigger executed', params);
    // Implementáció
  }

  private handleWhenClearForm(params: any) {
    console.log('WHEN-CLEAR-FORM trigger executed', params);
    // Implementáció
  }

  private handleWhenCreateRecord(params: any) {
    console.log('WHEN-CREATE-RECORD trigger executed', params);
    // Implementáció
  }

  private handleWhenDeleteRecord(params: any) {
    console.log('WHEN-DELETE-RECORD trigger executed', params);
    // Implementáció
  }

  private handleWhenDuplicateRecord(params: any) {
    console.log('WHEN-DUPLICATE-RECORD trigger executed', params);
    // Implementáció
  }

  private handleWhenFetchRecord(params: any) {
    console.log('WHEN-FETCH-RECORD trigger executed', params);
    // Implementáció
  }

  private handleWhenLockRecord(params: any) {
    console.log('WHEN-LOCK-RECORD trigger executed', params);
    // Implementáció
  }

  private handleWhenRemoveRecord(params: any) {
    console.log('WHEN-REMOVE-RECORD trigger executed', params);
    // Implementáció
  }

  private handleWhenUpdateRecord(params: any) {
    console.log('WHEN-UPDATE-RECORD trigger executed', params);
    // Implementáció
  }

  // PL/SQL parancs kezelők
  private handleExitForm(params: any) {
    console.log('Executing exit_form', params);
    // Implementáció
  }

  private handleCommitForm(params: any) {
    console.log('Executing commit_form', params);
    // Implementáció
  }

  private handleRollbackForm(params: any) {
    console.log('Executing rollback_form', params);
    // Implementáció
  }

  private handleClearForm(params: any) {
    console.log('Executing clear_form', params);
    // Implementáció
  }

  private handleClearBlock(params: any) {
    console.log('Executing clear_block', params);
    // Implementáció
  }

  private handleGoBlock(params: any) {
    console.log('Executing go_block', params);
    // Implementáció
  }

  private handleGoItem(params: any) {
    console.log('Executing go_item', params);
    // Implementáció
  }

  private handleShowAlert(params: any) {
    console.log('Executing show_alert', params);
    // Implementáció
  }

  private handleShowMessage(params: any) {
    console.log('Executing show_message', params);
    // Implementáció
  }

  private handleSetItemProperty(params: any) {
    console.log('Executing set_item_property', params);
    // Implementáció
  }

  private handleSetWindowProperty(params: any) {
    console.log('Executing set_window_property', params);
    // Implementáció
  }

  private handleSetCanvasProperty(params: any) {
    console.log('Executing set_canvas_property', params);
    // Implementáció
  }

  // Form állapot frissítése
  updateFormState(newState: any) {
    this.formState.next(newState);
  }

  // Form állapot lekérdezése
  getFormState(): Observable<any> {
    return this.formState.asObservable();
  }
} 