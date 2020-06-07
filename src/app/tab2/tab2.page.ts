import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { Pessoas } from '../model/pessoas';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pessoa: Pessoas = { } as Pessoas;
  cadastrado: boolean = false;

  constructor(public platform: Platform, private nativeStorage: NativeStorage) { }

  async ngOnInit() {
    if (this.platform.is('hybrid')) {
      console.log('HIBRIDO!');
      await this.nativeStorage.getItem('pessoa')
        .then(
          data => {
            if (data!==undefined &&data!==null) {
              this.pessoa = JSON.parse(data);
              this.cadastrado = true;
            }else{
              this.cadastrado = false;
            }
          },
          error => console.error(error)
        );
    } else {
      if (localStorage.getItem('pessoa') !== undefined && localStorage.getItem('pessoa')!==null) {
        this.cadastrado = true;
        this.pessoa = JSON.parse(localStorage.getItem('pessoa'));
        console.log('Não é hibrido!');
      }else{
        this.cadastrado = false;
      }
      console.log(this.cadastrado);
    }
  }

  async cadastrar(form) {
    if (this.platform.is('hybrid')) {
      console.log('HIBRIDO!');
      await this.nativeStorage.setItem('pessoa', JSON.stringify(form.value))
        .then(
          () => console.log('Cadastrado!'),
          error => console.error('Erro: ', error)
        );
    } else {
      localStorage.setItem('pessoa', JSON.stringify(form.value));
      this.cadastrado = true;
      console.log('Não é hibrido!');
    }
  }

}
