import { Component } from '@angular/core';

@Component({
  selector: 'app-${formName?lower_case}',
  templateUrl: './${formName?lower_case}.component.html',
  styleUrls: ['./${formName?lower_case}.component.css']
})
export class ${formName?cap_first}Component {
  constructor() { }
}
