import { Component, OnInit } from "@angular/core";
import { GeneralMethodsService } from "../Services/general-methods.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-decryption",
  templateUrl: "./decryption.component.html",
  styleUrls: ["./decryption.component.css"]
})
export class DecryptionComponent implements OnInit {
  keyDecr: any;
  cipherText = "";
  plainText: string = "";
  algo: string = "";
  algos: { label: string; value: string }[];
  ciherKeyDecrypt = [];
  showError: boolean = false;
  constructor(private genMethods: GeneralMethodsService) {}

  ngOnInit() {
    this.algos = this.genMethods.populateAlgosDropdown();
  }

  decryptingAlgos() {
    switch (this.algo) {
      case "CeaserCipher":
        console.log(this.algo);
        this.ceaserCipherDecrypt();
        this.showErrorOnKeyType()
        break;

      case "VigenereCipher":
        console.log(this.algo);
        this.vigenereCipherDecryption();
        break;

      case "substitueCipher":
        this.substituteCipherDecrypt()
        console.log(this.algo);
        break;

      case "PlayfairCipher":
        this.playFairCipherDecryption();
        console.log(this.algo);
        break;

      default:
        console.log(this.algo);
        break;
    }
    console.log(this.algo);
  }

  //Shift Cipher Decryption
  ceaserCipherDecrypt() {
    var YminusK = 0,
      Yct = 0,
      Xct = 0;

    for (var i = 0; i < this.cipherText.length; i++) {
      //For Encryption
      if (this.cipherText[i] !== " "){
      Yct = this.genMethods.globalArray.indexOf(
        this.cipherText[i].toUpperCase()
      );
      YminusK = Yct - parseInt(this.keyDecr);
      Xct = YminusK % 26;
      if (Xct < 0) {
        Xct = 26 - Math.abs(YminusK % 26);
      }
      this.plainText += this.genMethods.globalArray[Xct];
    }
    else {
      this.plainText += " ";
    }
  }
  }

  //Vigenere Cipher Decryption

  vigenereCipherDecryption() {
    var Xpt = 0,
      XminusK = 0,
      Ypt = 0,
      kpt = 0;
    var currentVal = 0;
    for (let i = 0; i < this.cipherText.length; i++) {
      for (let j = 0; j < this.keyDecr.length; j++) {
        currentVal++;

        Xpt = this.genMethods.globalArray.indexOf(
          this.cipherText[i].toUpperCase()
        );
        kpt = this.genMethods.globalArray.indexOf(
          this.keyDecr[j].toUpperCase()
        );
        XminusK = Xpt - kpt;
        Ypt = XminusK % 26;
        if (Ypt < 0) {
          Ypt = 26 - Math.abs(XminusK % 26);
        }
        this.plainText += this.genMethods.globalArray[Ypt];
        i = currentVal;
        if (currentVal >= this.cipherText.length) break;
      }
      if (currentVal >= this.cipherText.length) break;
      i--;
    }
  }

  //Substitute Cipher Decrypt

  substituteCipherDecrypt() {
    this.ciherKeyDecrypt = this.genMethods.generateKeyForSubstitueCipher(
      this.keyDecr
    );
    let index = 0;
    for (let j = 0; j < this.cipherText.length; j++) {
      if (this.cipherText[j] !== " ") {
        index = this.ciherKeyDecrypt.indexOf(this.cipherText[j].toUpperCase());
        this.plainText += this.genMethods.globalArray[index];
      } else {
        this.plainText += " ";
      }
    }
  }


//play fair cipher decrypt
playFairCipherDecryption(){
  let key = this.genMethods.generateKeyForPlayFairCipher(this.keyDecr.toUpperCase())
  console.log(key)
  // this.cipherText =this.editPlain(this.cipherText);
  this.plainText = this.decrypter(this.cipherText,key)
  
}



//for playfair
  decrypter(cipherText: any, key: string) {
    
        var length = cipherText.length;
        var a, b;
        var a_ind, b_ind, a_row, b_row, a_col, b_col;
        var sb ='';
    
        for (let i = 0; i < length; i += 2)
        {
            a = cipherText[i];
            b = cipherText[i + 1];
    
            a_ind = key.indexOf(a);
            b_ind = key.indexOf(b);
            a_row = Math.floor(a_ind / 5);
            b_row = Math.floor( b_ind / 5);
            a_col = a_ind % 5;
            b_col = b_ind % 5;
    
            if (a_row == b_row)
            {
                if (a_col == 0)
                {
                   sb= sb.concat(key[a_ind + 4]);
                   sb=   sb.concat(key[b_ind - 1]);
                }
                else if (b_col == 0)
                {
                  sb=  sb.concat(key[a_ind - 1]);
                  sb=  sb.concat(key[b_ind + 4]);
                }
                else
                {
                  sb= sb.concat(key[a_ind - 1]);
                  sb=  sb.concat(key[b_ind - 1]);
                }
            }
            else if (a_col == b_col)
            {
                if (a_row == 0)
                {
                  sb=    sb.concat(key[a_ind + 20]);
                  sb=   sb.concat(key[b_ind - 5]);
                }
                else if (b_row == 0)
                {
                  sb=  sb.concat(key[a_ind - 5]);
                  sb=   sb.concat(key[b_ind + 20]);
                }
                else
                {
                  sb=    sb.concat(key[a_ind - 5]);
                  sb=    sb.concat(key[b_ind - 5]);
                }
            }
            else
            {
              sb= sb.concat(key[5 * a_row + b_col]);
              sb=  sb.concat(key[5 * b_row + a_col]);
            }
        }
        return sb;
      }


      resetFields(){
        this.plainText = "";
        this.cipherText = "";
        this.algo = null;
        this.keyDecr = null;
        this.showError = false;
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
        if(!numbers.test(this.keyDecr) && this.algo === "CeaserCipher"){
          this.plainText = "";
          this.showError =  true;
        }
        else{
          this.showError =  false;
        }
      }

}
