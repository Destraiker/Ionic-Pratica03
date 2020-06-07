import { Component } from '@angular/core';
import { Pessoas } from '../model/pessoas';
import { PessoaService } from '../services/pessoa.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  pessoas: Pessoas[] = [];

  constructor(private servicePessoas: PessoaService, private geolocation: Geolocation) {
  }
  async ngOnInit() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      console.log("Entro aqui");
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("Lat: "+resp.coords.latitude+" Long: "+resp.coords.longitude)
      this.pessoasProximas(resp.coords.latitude,resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  async pessoasProximas(lat,long) {
    await this.servicePessoas.encontrarPessoasProximas(lat, long).then((x) => {
      console.log(x);
      x.forEach(x => {
        console.log(x);
        console.log(x.data);
        this.pessoas.push(x.data);
      })
      console.log(this.pessoas);
    }).catch((err) => {
      console.log(err);
    })
  }

}
