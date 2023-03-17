import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Messages } from '../../constants/messages';


describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  const mockData: Array<Pokemon> = [{
    name: "Prueba",
    id: 1,
    type: "Tipo de pokemon",
    attack: 0,
    defense: 1,
    hp: 3,
    idAuthor: 1,
    image: "neoris.com"
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {
          provide: 'url',
          useValue: 'apiUrl'
        }
      ]
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("getByIdAuthor should make a GET HTTP Request and return all data items by author id", () => {
    service.getByIdAuthor().subscribe(
      {
        next: (v) => {
          expect(v).toEqual(mockData);
        }
      }
    );

    const req = httpTestingController.expectOne(`${Messages.URL}?idAuthor=2`);

    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    
    req.flush(mockData);
    httpTestingController.verify();
  });

  it("getByPokemonId should make a GET HTTP Request and return an item by pokemon id", () => {
    service.getByPokemonId(1).subscribe(
      {
        next: (v) => {
          expect(v).toEqual(mockData);
        }
      }
    );

    const req = httpTestingController.expectOne(`${Messages.URL}/1`);

    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');

    req.flush(mockData);
    httpTestingController.verify();
  });

  it("deletePokemonById should make a DELETE HTTP Request and return an item by pokemon id", () => {
    service.deletePokemonById(1).subscribe(
      {
        next: (v) => {
          expect(v).toEqual("");
        }
      }
    );

    const req = httpTestingController.expectOne(`${Messages.URL}/1`);

    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    
    httpTestingController.verify();
  });

  it("editPokemon should make a PUT HTTP Request and return a pokemon item", () => {
    service.editPokemon(mockData[0]).subscribe(
      {
        next: (v) => {
          expect(v).toEqual(mockData[0]);
        }
      }
    );

    const req = httpTestingController.expectOne(`${Messages.URL}/1`);

    expect(req.request.method).toBe('PUT');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');

    httpTestingController.verify();
  });

  it("newPokemon should make a POST HTTP Request and return a pokemon item", () => {
    service.newPokemon(mockData[0]).subscribe(
      {
        next: (v) => {
          expect(v).toEqual(mockData[0]);
        }
      }
    );

    const req = httpTestingController.expectOne(`${Messages.URL}/`);

    expect(req.request.method).toBe('POST');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');

    httpTestingController.verify();
  });
});
