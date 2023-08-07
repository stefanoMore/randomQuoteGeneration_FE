import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {CookieService} from "ngx-cookie-service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {

  }
}
