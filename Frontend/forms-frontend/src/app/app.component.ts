import { Component } from '@angular/core';
import {DataLoaderComponent} from './components/data-loader/data-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataLoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms-frontend';
}
