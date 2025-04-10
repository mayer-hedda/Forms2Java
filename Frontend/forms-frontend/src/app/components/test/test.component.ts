import { Component, OnInit } from '@angular/core'; // OnInit importálása
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-handler',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  imports: [CommonModule]
})
export class TestComponent implements OnInit { // OnInit implementálása
  isLoading = false;
  errorMessage: string | null = null;
  responseMessage: string | null = null;

  ngOnInit(): void { // OnInit metódus
    this.loadJsonFiles();
  }

  async loadJsonFiles(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    this.responseMessage = null;

    try {
      const response = await fetch('http://localhost:8080/api/xml/json/all');

      if (!response.ok) {
        throw new Error(`HTTP hiba! státusz: ${response.status}`);
      }

      const data = await response.json();
      console.log('Sikeres válasz:', data);
      this.responseMessage = JSON.stringify(data, null, 2);

    } catch (error: any) {
      console.error('Hiba:', error);
      this.errorMessage = `Hiba: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  }
}
