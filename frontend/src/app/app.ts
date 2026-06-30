import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Portfolio } from './components/portfolio/portfolio';
import { Dashboard } from "./components/dashboard/dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Portfolio, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('enviro365-frontend');
}
