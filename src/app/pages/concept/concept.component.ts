import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/libs/constants/messages';
import { Pokemon } from 'src/app/libs/infraestructure/interfaces/pokemon';
import { PokemonService } from 'src/app/libs/infraestructure/services/pokemon.service';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {

  public pokemonList: Array<Pokemon>;
  public pokemonListCopy: Array<Pokemon>;
  public showPokemonDetail: boolean;
  public form: FormGroup;
  public searchForm: FormGroup;
  public edit: boolean;
  public onErrorImg: string;

  constructor(
    private _pokemon: PokemonService,
    private formBuilder: FormBuilder
  ) {
    this.onErrorImg = "assets/img/404.png";
    this.edit = false;
    this.showPokemonDetail = false;
    this.pokemonList = new Array<Pokemon>();
    this.pokemonListCopy = new Array<Pokemon>();
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      attack: [50, [Validators.required]],
      defense: [50, [Validators.required]],
      hp: [50, [Validators.required]],
      type: ["", [Validators.required]],
      idAuthor: [2, [Validators.required]]
    });
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  public ngOnInit(): void {
    this._pokemon.getByIdAuthor().subscribe(
      {
        next: (v) => {
          this.pokemonList = v;
          this.pokemonListCopy = v;
        },
        error: (e) => {
          alert(e.error);
        }
      }
    );

    this.searchForm.get("search")?.valueChanges.subscribe(
      {
        next: (v) => {
          if (v == '') {
            this.pokemonListCopy = this.pokemonList;
            return;
          }

          this.pokemonListCopy = this.pokemonList.filter(x => x.name.trim().toLowerCase().includes(v.trim().toLowerCase()));
        }
      }
    )
  }

  public actualValueSlider(name: string){
    return this.form.get(name)?.value;
  }

  public changeStatusShow(status: boolean): void {
    this.edit = status ? false : true;
    this.showPokemonDetail = status;
    this.form.reset();
    this.form.get("idAuthor")?.patchValue(2);
  }

  public editPokemon(id: number) {
    this._pokemon.getByPokemonId(id).subscribe(
      {
        next: (v) => {
          this.edit = true;
          this.showPokemonDetail = true;
          this.form.patchValue(v);
        },
        error: (e) => {
          alert(Messages.NOT_FOUND);
        }
      }
    )
  }

  public savePokemon() {
    const bodyPokemon: Pokemon = this.form.value;
    const serviceCall = !this.edit ? this._pokemon.newPokemon(bodyPokemon) : this._pokemon.editPokemon(bodyPokemon);

    serviceCall.subscribe(
      {
        next: (v) => {
          this.ngOnInit();
          this.changeStatusShow(false);
          this.searchForm.get("search")?.patchValue("");
        },
        error: (e) => {
          alert(Messages.ERROR);
        }
      }
    );
  }

  public deletePokemon(id: number): void {
    this._pokemon.deletePokemonById(id).subscribe(
      {
        next: (v) => {
          this.ngOnInit();
          this.searchForm.get("search")?.patchValue("");
        },
        error: (e) => {
          alert(Messages.ERROR);
        }
      }
    )
  }
}
