import { Component, OnInit } from "@angular/core";
import { GeneralMethodsService } from "../Services/general-methods.service";

@Component({
  selector: "app-encryption",
  templateUrl: "./encryption.component.html",
  styleUrls: ["./encryption.component.css"]
})
export class EncryptionComponent implements OnInit {
  keyEncr: any;
  cipherText = "";
  plainText: string;
  algo: string = "";
  algos: { label: any; value: any }[];
  cipherKeyEncrypt = [];
  showError: boolean = false;
  constructor(private genMethods: GeneralMethodsService) {}

  ngOnInit() {
    this.algos = this.genMethods.populateAlgosDropdown();
  }

  encryptingAlgos() {
    switch (this.algo) {
      case "CeaserCipher":
        console.log(this.algo);
        
        this.ceaserCipherEncrypt();
        this.showErrorOnKeyType()
        console.log(typeof this.keyEncr)
        break;

      case "VigenereCipher":
        console.log(this.algo);
        this.vigenereCipherEncrypt();
        break;

      case "substitueCipher":
        this.sustitueCipherEncrypt();
        console.log(this.algo);
        break;

      case "PlayfairCipher":
        this.playFairCipherEncryption();
        console.log(this.algo);
        break;

      default:
        console.log(this.algo);
        break;
    }
    console.log(this.algo);
  }

  //Shift Cipher Encryption
  ceaserCipherEncrypt() {
   
    this.cipherText = "";
    let Xpt = 0,
      XplusK = 0,
      Ypt = 0;

    for (var i = 0; i < this.plainText.length; i++) {
      if (this.plainText[i] !== " ") {
        Xpt = this.genMethods.globalArray.indexOf(
          this.plainText[i].toUpperCase()
        );
        XplusK = Xpt +  parseInt(this.keyEncr);
        Ypt = XplusK % 26;
        this.cipherText += this.genMethods.globalArray[Ypt];
      } else {
        this.cipherText += " ";
      }
    }
  }

  //Vigenere Cipher Encrypt

  vigenereCipherEncrypt() {
    this.cipherText = "";
    this.plainText = this.plainText.replace(/\s/g, "");
    console.log(this.plainText);
    var Xpt = 0,
      XplusK = 0,
      kpt = 0,
      Ypt = 0;
    var currentVal = 0;

    for (let i = 0; i < this.plainText.length; i++) {
      for (let j = 0; j < this.keyEncr.length; j++) {
        currentVal++;
        Xpt = this.genMethods.globalArray.indexOf(
          this.plainText[i].toUpperCase()
        );
        kpt = this.genMethods.globalArray.indexOf(
          this.keyEncr[j].toUpperCase()
        );
        XplusK = Xpt + kpt;
        Ypt = XplusK % 26;
        this.cipherText += this.genMethods.globalArray[Ypt];
        i = currentVal;
        if (currentVal >= this.plainText.length) break;
      }
      if (currentVal >= this.plainText.length) break;
      i--;
    }
  }

  //Substitue cipher Encrypt
  sustitueCipherEncrypt() {
     
    this.cipherKeyEncrypt = this.genMethods.generateKeyForSubstitueCipher(
      this.keyEncr   
    );
    let indexPt = 0;
    for (let i = 0; i < this.plainText.length; i++) {
      if (this.plainText[i] !== " ") {
        indexPt = this.genMethods.globalArray.indexOf(this.plainText[i].toUpperCase());
        this.cipherText += this.cipherKeyEncrypt[indexPt];
      } else {
        this.cipherText += " ";
      }
    }   
    
  }


  //PlayFair cipher encryption
  playFairCipherEncryption(){
    let key = this.genMethods.generateKeyForPlayFairCipher(this.keyEncr.toUpperCase())
    console.log(key)
    this.plainText =this.editPlain(this.plainText.replace(/\s/g, ""));
    this.cipherText = this.encryptPlayFair(this.plainText,key)
    
  }

  editPlain(plain) {
    for (let i = 0; i < plain.length - 1; i += 2) {
      if (plain[i] === plain[i + 1])
        plain = plain.slice(0, i + 1) + 'X' + plain.slice(i + 1);
    }
  
    if (plain.length % 2 === 1) plain += 'X';
  
    plain = plain.replace(/j/g, 'I'); //regular expression 'g means global '
    return plain;
  }

  encryptPlayFair(plaintext, key) {
    var ciphertext = "";
    plaintext = plaintext.replace(/\s/g, "")
    for (let i = 0; i < plaintext.length - 1; i += 2) {
  

      var i1, i2, j1, j2;
      // index (1d) --> i = index / 5 , j = index % 5 (2d)
      //5/2 = 2.5 | 0 = 2
      i1 = key.indexOf(plaintext[i].toUpperCase()) / 5 | 0; //integer
      j1 = key.indexOf(plaintext[i].toUpperCase()) % 5;
  
      i2 = key.indexOf(plaintext[i + 1].toUpperCase()) / 5 | 0; //integer
      j2 = key.indexOf(plaintext[i + 1].toUpperCase()) % 5;
  
      //same row
      if (i1 == i2)
        // i1, (j1 + 1) % 5 and i2, (j2 + 1) % 5
        ciphertext += key[i1 * 5 + (j1 + 1) % 5] + key[i2 * 5 + (j2 + 1) % 5];
  
      //same column
      else if (j1 == j2)
        //(i1 + 1) % 5, j1 and (i2 + 1) % 5, j2
        ciphertext += key[((i1 + 1) % 5) * 5 + j1] + key[((i2 + 1) % 5) * 5 + j2];
  
      else
        // i1, j2 and i2, j1
        ciphertext += key[i1 * 5 + j2] + key[i2 * 5 + j1];
    }
    return ciphertext;
  }
  

  resetFields(){
    this.plainText = "";
    this.cipherText = "";
    this.algo = null;
    this.keyEncr = null;
    this.showError = false
  }

  checkAlgo(){
    if(this.algo){
      return true;
    }
    else{
      return false;
    }
  }

  showErrorOnKeyType(){
    
    var numbers = /^[0-9]+$/;
    if(!numbers.test(this.keyEncr) && this.algo === "CeaserCipher"){
      this.cipherText = "";
      this.showError =  true;
    }
    else{
      this.showError =  false;
    }
  }
}
