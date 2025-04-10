import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormComponent } from '../json-form/json-form.component';

@Component({
  selector: 'app-data-loader',
  standalone: true,
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.css'],
  imports: [CommonModule, JsonFormComponent]
})
export class DataLoaderComponent implements OnInit {
  isLoading = false;
  errorMessage: string | null = null;
  jsonFiles: string[] = [];
  selectedJsonData: any = null;
  publicFolderPath = '/json_files';

  ngOnInit(): void {
    this.loadJsonFileNames();
  }

  async loadJsonFileNames(): Promise<void> {
    try {
      const response = await fetch('http://localhost:8080/api/xml/list-json-files');
      if (!response.ok) {
        throw new Error(`HTTP hiba! státusz: ${response.status}`);
      }
      this.jsonFiles = await response.json();
    } catch (error: any) {
      this.errorMessage = `Hiba a fájlnevek betöltésekor: ${error.message}`;
      console.error('Hiba a fájlnevek betöltésekor:', error);
    }
  }

  async loadJsonFile(fileName: string): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    this.selectedJsonData = null;

    try {
      const response = await fetch(`${this.publicFolderPath}/${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP hiba! státusz: ${response.status}`);
      }
      this.selectedJsonData = await response.json();
    } catch (error: any) {
      this.errorMessage = `Hiba a JSON fájl betöltésekor: ${error.message}`;
      console.error('Hiba a JSON fájl betöltésekor:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
