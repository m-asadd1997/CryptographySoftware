import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GeneralMethodsService {
  globalArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  algos: { label: string; value: string }[];
  cipherKey = [];

  playFairCipherMatrix = [];

  constructor() {}

  //to populate dropdown
  populateAlgosDropdown() {
    return (this.algos = [
      {
        label: "Ceaser Cipher",
        value: "CeaserCipher"
      },
      {
        label: "Vigenere Cipher",
        value: "VigenereCipher"
      },
      {
        label: "Substitue Cipher",
        value: "substitueCipher"
      },
      {
        label: "Playfair Cipher",
        value: "PlayfairCipher"
      }
    ]);
  }

  //for generation key fro subs cipher
  generateKeyForSubstitueCipher(key: any) {
    for (let i = 0; i < key.length; i++) {
      if (i === 0) {
        this.cipherKey.push(key[i]);
      } else {
        if (this.cipherKey.includes(key[i])) {
        } else this.cipherKey.push(key[i]);
      }
    }

    for (let j = 0; j < this.globalArray.length; j++) {
      if (this.cipherKey.includes(this.globalArray[j])) {
      } else this.cipherKey.push(this.globalArray[j]);
    }

    return this.cipherKey;
  }

  //for generating key for payfair cipher

  generateKeyForPlayFairCipher(key: any) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  key += alphabet;
  for (let i = 0; i < key.length; i++) {
    // already exists ?!
    //secretabcdefghi..
    if (key.indexOf(key[i]) !== i) {
      key = key.slice(0, i) + key.slice(i + 1); //abcdefghi => abcd + fghi
      i--;
    }

  }
  return key;
  
}



}
