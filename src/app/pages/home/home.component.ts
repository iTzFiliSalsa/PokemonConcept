import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from 'src/app/libs/constants/messages';
import { Pokemon } from 'src/app/libs/infraestructure/interfaces/pokemon';
import { PokemonService } from 'src/app/libs/infraestructure/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pokemonList: Array<Pokemon>;
  public pokemonSelected: Pokemon | undefined;
  public deleting: number;
  public showDeleting: boolean;
  
  constructor(
    private _pokemon: PokemonService,
    private router: Router
  ){
    this.showDeleting = false;
    this.deleting = 0;
    this.pokemonList = new Array<Pokemon>();
    this.pokemonSelected = undefined
  }

  public ngOnInit(): void{
    this._pokemon.getByIdAuthor().subscribe(
      {
        next: (v) => {
          this.pokemonList = v;
          this.pokemonSelected = this.pokemonList[0];
        },
        error: (e) => {
          alert(e.error);
        }
      }
    )
  }

  public selectPokemon(item: Pokemon): void{
    this.pokemonSelected = item;
  }

  public deletePokemon(id: number): void{
    this.deleting = id;
    this.showDeleting = true;
    
  }

  public delete(): void{
    this._pokemon.deletePokemonById(this.deleting).subscribe(
      {
        next: (v) => {
          this.showDeleting = false;
          this.ngOnInit();
        },
        error: (e) => {
          alert(Messages.ERROR);
        }
      }
    )
  }

  public editPokemon(id: number): void{
    this.router.navigate(["actions"], {queryParams: {id}})
  }
}
