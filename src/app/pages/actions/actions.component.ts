import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/libs/constants/messages';
import { Pokemon } from 'src/app/libs/infraestructure/interfaces/pokemon';
import { PokemonService } from 'src/app/libs/infraestructure/services/pokemon.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent{

  public form: FormGroup;

  private edit: boolean;

  constructor( 
    private _pokemon: PokemonService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.edit = false;
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      attack: [0, [Validators.required]],
      defense: [0, [Validators.required]],
      hp: [0, [Validators.required]],
      type: ['', [Validators.required]],
      idAuthor: [2]
    })
  }

  public ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe(
      {
        next: (v: any) => {
          if(v.id != null){
            this._pokemon.getByPokemonId(v.id).subscribe(
              {
                next: (v) => {
                  this.edit = true;
                  this.form.patchValue(v);
                },
                error: (e) => {
                  alert(Messages.NOT_FOUND);
                  this.router.navigateByUrl("/home");
                }
              }
            )
          }
        }
      }
    )
  }

  public savePokemon(): void{

    const bodyPokemon : Pokemon = this.form.value;
    const serviceCall = !this.edit ? this._pokemon.newPokemon(bodyPokemon) : this._pokemon.editPokemon(bodyPokemon);
    
    serviceCall.subscribe(
      {
        next: (v) => {
          this.router.navigateByUrl("/home");
        },
        error: (e) => {
          alert(Messages.ERROR);
        }
      }
    );
  }
}
