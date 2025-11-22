import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppToolbarComponent } from "./core/components/toolbar/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppToolbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class App {
  protected readonly title = signal('paint-eater-portfolio');
}
