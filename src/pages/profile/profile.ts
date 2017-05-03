import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileDataProvider } from "../../providers/profile-data/profile-data";
import { AuthDataProvider } from "../../providers/auth-data/auth-data";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: any;

  constructor(public navCtrl: NavController, public profile: ProfileDataProvider, public auth: AuthDataProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter() {
    this.profile.getUserProfile().then(profileSnap => {
      this.userProfile = profileSnap;
      this.birthDate = this.userProfile.birthDate;
    });
  }

  logOut() {
    this.auth.logout().then(() => {
      this.navCtrl.setRoot('LandingPage');
    });
  }

  updateName() {
    let alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name', value: this.userProfile.firstName
        }, {
          name: 'lastName',
          placeholder: 'Your last name', value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profile.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDateOfBirth(birthDate) {
    this.profile.updateDateOfBirth(birthDate);
  }

  updateEmail() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'password',
          placeholder: 'Your current password',
          type: 'password'
        },
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        }, {
          text: 'Save', handler: data => {
            this.profile.updateEmail(data.newEmail, data.password);
          }
        }]
    });
    alert.present();
  }

  updatePassword() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword', placeholder: 'Your new password', type: 'password'
        }, {
          name: 'oldPassword', placeholder: 'Your old password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        }, {
          text: 'Save', handler: data => {
            this.profile.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }
}
