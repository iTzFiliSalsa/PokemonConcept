import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiCallerService } from 'src/app/libs/infraestructure/services/api-caller.service';
import { PokemonService } from 'src/app/libs/infraestructure/services/pokemon.service';

import { ConceptComponent } from './concept.component';

describe('ConceptComponent', () => {
  let component: ConceptComponent;
  let fixture: ComponentFixture<ConceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        PokemonService,
        ApiCallerService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should be valid form", () => {
    const fixture = TestBed.createComponent(ConceptComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.form.get("name")?.patchValue("Nombre");
    app.form.get("image")?.patchValue("image");
    app.form.get("attack")?.patchValue(100);
    app.form.get("defense")?.patchValue(23);
    app.form.get("hp")?.patchValue(32);
    app.form.get("type")?.patchValue("Tipo de Pokemon");

    expect(app.form.invalid).toBeFalse();
  });

  it("Should exists a table with five columns", () => {
    const fixture = TestBed.createComponent(ConceptComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll("th").length).toBe(5);
  });
  

});
