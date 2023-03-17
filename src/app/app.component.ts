import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './libs/infraestructure/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLoading: boolean;
  public title = "PokemonConcept";

  constructor(
    public _loader: LoaderService,
    private changeDetector : ChangeDetectorRef
  ){
    this.isLoading = false;
    this._loader.isLoading.subscribe(
      {
        next: (v) => {
          this.isLoading = v;
        }
      }
    )
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
