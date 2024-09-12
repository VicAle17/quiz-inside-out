// oggetto + max
let emozioni = {
  gioia: 0,
  tristezza: 0,
  rabbia: 0,
  disgusto: 0,
  paura: 0,
  ansia: 0,
  invidia: 0,
  imbarazzo: 0,
  ennui: 0,

  assegnaPunti: function (str) {
    switch (str) {
      case "gioia":
        this.gioia += 1;
        break;
      case "tristezza":
        this.tristezza += 1;
        break;
      case "rabbia":
        this.rabbia += 1;
        break;
      case "disgusto":
        this.disgusto += 1;
        break;
      case "ansia":
        this.ansia += 1;
        break;
      case "paura":
        this.paura += 1;
        break;
      case "invidia":
        this.invidia += 1;
        break;
      case "imbarazzo":
        this.imbarazzo += 1;
        break;
      case "ennui":
        this.ennui += 1;
        break;
    }
  },
  massimo: function () {
    const context = this; // assuming 'this' refers to the object you want to iterate over

    let maxValue = -Infinity;
    let maxKey = "";

    for (let key in context) {
      if (context.hasOwnProperty(key) && context[key] > maxValue) {
        maxValue = context[key];
        maxKey = key;
      }
    }

    for (let i in this) {
      this[i] = 0;
    }

    return `${maxKey} (${maxValue})`;
  },
};

function updateSelection() {
  var groups = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"];

  for (var i = 0; i < groups.length; i++) {
    var radios = document.getElementsByName(groups[i]);
    for (var j = 0; j < radios.length; j++) {
      if (radios[j].checked) {
        emozioni.assegnaPunti(radios[j].value);
        //   selectedValues.push(radios[j].value);
        break;
      }
    }
  }

  const username = localStorage.getItem("username");
  const maxEmotion = emozioni.massimo()
  const maxEmotionName=maxEmotion.replace(/\(\d+\)/, '');
  console.log(maxEmotionName)
  const persona = maxEmotionName;
  localStorage.setItem('personaggio', persona)
  console.log(persona)
  console.log(emozioni.massimo);

  

  //console.log(emozioni)
  // personaggio è salvato in persona
  // let persona = emozioni.massimo();
  // DEVI MODIFICARE IL TUO ALGORITMO IN MANIERA TALE
  //    CHE TI RESTITUISCA UNA STRINGA CON IL CAMPO CON VALORE MASSIMO
  //    COSI DA SALVARLA IN UNA VARIABILE E INFILARLA NEL BODY


  function getRomeFormattedDate() {
    const romeTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Rome",
    });
    const romeDate = new Date(romeTime);
    const year = romeDate.getFullYear();
    const month = (romeDate.getMonth() + 1).toString().padStart(2, "0"); // Mesi partono da 0
    const day = romeDate.getDate().toString().padStart(2, "0");
    const hour = romeDate.getHours().toString().padStart(2, "0");
    const minute = romeDate.getMinutes().toString().padStart(2, "0");
    const second = romeDate.getSeconds().toString().padStart(2, "0");
    return ` ${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }
  let data = getRomeFormattedDate()

  

  // dopo tutto l'algoritmo quindi invochiamo la rotta per salvare il personaggio nel db

  async function personaggio() {
    const request = await fetch("http://127.0.0.1:8000/api/personaggio", {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personaggio: persona,
        username: username,
        data : data
      }),
    });
    const risposta = await request.json();
    console.log(risposta);
  }
  personaggio();
  // console.log(selectedValues)

  
} 


// script.js
