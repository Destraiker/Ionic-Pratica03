import { Component } from '@angular/core';
import { Pessoas } from '../model/pessoas';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  pessoas: Pessoas[];
  
  constructor(private servicePessoas: PessoaService) { }

}
