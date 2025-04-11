import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private static _initialized = false;
  private initializationMessage: string = '';

  constructor() {}

  async initialize(): Promise<boolean> {
    // Statikus flag használata, hogy az újratöltések között is megmaradjon
    if (InitService._initialized) {
      return true;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('http://localhost:8080/api/xml/json/all', {
        signal: controller.signal,
        method: 'GET',
        cache: 'no-store' // Ne cache-elje a kérést
      });

      clearTimeout(timeoutId);

      // Elmentjük a visszakapott üzenetet
      this.initializationMessage = await response.text();
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Initialization completed successfully:', this.initializationMessage);
      InitService._initialized = true;
      return true;
    } catch (error) {
      console.error('Initialization failed:', error);
      // Hiba esetén is true-val térünk vissza, hogy ne blokkolja az app betöltését
      InitService._initialized = true;
      return true;
    }
  }

  getInitializationMessage() {
    return this.initializationMessage;
  }

  isInitialized() {
    return InitService._initialized;
  }
} 