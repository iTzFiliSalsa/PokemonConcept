import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { ApiCallerService } from './api-caller.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private _apiCaller: ApiCallerService
  ) { }

  getByIdAuthor(id: number = 2){
    return this._apiCaller.get(`?idAuthor=${id}`);
  }

  deletePokemonById(id: number){
    return this._apiCaller.delete(`/${id}`);
  }

  newPokemon(body: Pokemon){
    return this._apiCaller.post("/", body);
  }

  getByPokemonId(id: number){
    return this._apiCaller.get(`/${id}`);
  }

  editPokemon(body: Pokemon){
    return this._apiCaller.put(`/${body.id}`, body);
  }
}
