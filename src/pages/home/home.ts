import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ToastController } from 'ionic-angular'; // For popup toast messages

import { AlertController } from 'ionic-angular'; // For prompt alert

// Provider
import { GroceriesProvider } from '../../providers/groceries/groceries';

import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

// Cordova plugin for sharing
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Title displayed at the top of the home page
  title = 'Grocery List';

  items = [];
  errorMessage: string;

  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,  private alertCtrl: AlertController, public dataService: GroceriesProvider, public inputDialogService: InputDialogServiceProvider, private socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {    
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    //return this.dataService.getItems();
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);

  }


  // Edits an item from the items array
  editItem(item, index) {

    console.log('Item being edited: ', item, index);

    const toast = this.toastCtrl.create({
      message: 'This item was edited:  ' + item.name,
      duration: 3000
    });
    toast.present();

    this.inputDialogService.showPrompt(item, index);

  }

  
  // Removes an item from the items array
  /*
  removeItem(item, index) {

    console.log('Item being removed: ', item, index);

    const toast = this.toastCtrl.create({
      message: 'This item was removed:  ' + item.name,
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index)

  }
  */

  removeItem(id) {
    this.dataService.removeItem(id);
  }

  // Shares an item
  shareItem(item, index) {

    console.log('Item being removed: ', item, index);

    const toast = this.toastCtrl.create({
      message: 'This item was shared:  ' + item.name,
      duration: 3000
    });
    toast.present();

    let message = 'Grocery Item: ' + item.name + ', Qty: ' + item.quantity;
    let subject = 'Shared through groceries app'
    this.socialSharing.share(message, subject).then(() => {
      console.log('Item was succesfully shared')
    }).catch((error) => {
      console.error('Sharing error: ', error);
    });
    

  }


  // Adds an item to the items array
  addItem() {

    console.log('Adding an item');
    this.inputDialogService.showPrompt();
  }

  
}


