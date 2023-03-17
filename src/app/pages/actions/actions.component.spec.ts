import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ApiCallerService } from 'src/app/libs/infraestructure/services/api-caller.service';
import { PokemonService } from 'src/app/libs/infraestructure/services/pokemon.service';

import { ActionsComponent } from './actions.component';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        PokemonService,
        ApiCallerService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({id: '301'})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
