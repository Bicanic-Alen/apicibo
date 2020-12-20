import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {Location} from '@angular/common'
import { FoodService } from '../food.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  routeObs: Observable<ParamMap>;

  prod : any; //Qui salverò la traccia selezionata
  foodServiceObs: Observable<Object>;

  //Usiamo la dependency injection per farci mandare i moduli del routing e dello
  //SpotifyService
  constructor(
    private route: ActivatedRoute,
    private service: FoodService,
    private location: Location ) { }


  ngOnInit(): void {
    //Ottengo l'observable che notifica le informazioni sulla route attiva
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  //Ogni volta che viene invocata la route tracks/:id, l'observable richiama questo metodo
  getRouterParam = (params: ParamMap) =>
  {
    let productId = params.get('id'); //Ottengo l'id dai parametri
    console.log (productId); //Stampo su console
    //spotifyServiceObs va dichiarato
    this.foodServiceObs = this.service.foodDetails(productId) ;
    this.foodServiceObs.subscribe((data)=>this.prod = data)
  }


  back() : void
  {
    this.location.back();
  }

}
