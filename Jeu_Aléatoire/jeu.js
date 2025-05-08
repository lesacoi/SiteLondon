function point() {
  var point = localStorage.getItem("Point"); // On récupère le score
  const affiche = document.getElementById("points");
  affiche.innerHTML = `<p>${point} 🪙</p>`;
  affiche.style.display = "block";
}

if (localStorage.getItem("Point") === null) {
  localStorage.setItem("Point", 0); // On initialise le score à 0
} else {
  point();
}

function showRandomPicture() {
  var count = 0;
  function makeName(name) {
    if (name.includes(".")) {
      name = name.substring(0, name.indexOf("."));
    }
    return name
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(/\(\d+\)/g, " ")
      .trim();
  }
  function buildButtons(tab) {
    const form = document.getElementById("quiz-form");
    form.innerHTML = ""; // On vide le formulaire avant d'ajouter les boutons
    tab.forEach((e) => {
      const bouton = document.createElement("button");
      bouton.className = "quiz-option"; // On ajoute la classe CSS pour le style
      bouton.type = "submit"; // Le bouton va soumettre le formulaire
      bouton.name = "reponse"; // Optionnel : nom du bouton
      bouton.value = e; // Valeur du bouton (pour identifier la réponse)
      bouton.textContent = makeName(e); // Texte affiché sur le bouton

      form.appendChild(bouton); // On ajoute le bouton au formulaire
    });
    buttonEvent(); // On gère l'évènement du bouton
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // On sélectionne l'image aléatoirement
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const img = document.getElementById("random_picture");
  const button = document.getElementById("RandomGame");
  button.style.display = "none"; // On cache le bouton
  img.style.display = "block"; // On affiche l'image
  img.style.height = "4rem"; // On met la hauteur de l'image à 4rem
  img.style.width = "4rem"; // On met la largeur de l'image à 4rem
  img.src = "../Photo/Chargement.gif"; // On vide la source de l'image
  const day = Math.floor(Math.random() * 5);
  jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  jour = jours[day];
  var req = new XMLHttpRequest();

  req.open(
    "GET",
    `https://api.github.com/repos/lesacoi/SiteLondon/contents/${jour}/Photo?ref=main`
  );
  // req.setRequestHeader(
  //   "Authorization",
  //   token
  // );
  // req.setRequestHeader("Accept", "application/vnd.github.v3+json");

  var data;
  var photo;

  req.addEventListener("load", function () {
    // On vérifie que le status HTTP est bien supérieur à 200 et inférieur à 400
    // Sinon on renvoie le code du statut et le message du statut
    if (req.status >= 200 && req.status < 400) {
      data = JSON.parse(this.responseText); // On convertit la réponse en JSON
      nbrphoto = data.length;
      photo = Math.floor(Math.random() * nbrphoto);
      img.src = "../" + data[photo]["path"];
      img.style.height = "auto"; // On met la hauteur de l'image à auto
      img.style.width = "auto"; // On met la largeur de l'image à auto
      const question = document.getElementById("quiz-question");
      question.style.display = "block"; // On affiche la question
      question.innerHTML = `Regarde bien l'image et choisis le bon jour :`;
      const options = document.getElementById("quiz-options");
      buildButtons(jours); // On construit les boutons avec les jours
      options.style.display = "block"; // On affiche la réponse
    } else {
      console.error(req.status + " " + req.statusText);
      button.style.display = "block"; // On affiche le bouton
      img.style.height = "auto"; // On met la hauteur de l'image à auto
      img.style.width = "auto"; // On met la largeur de l'image à auto
      img.src = ""; // On vide la source de l'image pour afficher l'erreur
      return;
    }
  });
  req.addEventListener("error", function () {
    console.error("La requête a rencontré un problème");
    button.style.display = "block"; // On affiche le bouton
    img.style.height = "auto"; // On met la hauteur de l'image à auto
    img.style.width = "auto"; // On met la largeur de l'image à auto
    img.src = ""; // On vide la source de l'image pour afficher l'erreur
    return;
  });

  // Évènement timeout
  req.addEventListener("timeout", function () {
    console.error("timeout");
    button.style.display = "block"; // On affiche le bouton
    img.style.height = "auto"; // On met la hauteur de l'image à auto
    img.style.width = "auto"; // On met la largeur de l'image à auto
    img.src = ""; // On vide la source de l'image pour afficher l'erreur
    return;
  });

  req.send();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // On gère le premier quiz sur les jours.
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function buttonEvent() {
    const boutons = document.querySelectorAll("#quiz-form button");
    boutons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault(); // empêche le rechargement du formulaire
        const choix = this.value;
        verifierReponse(choix, boutons);
      });
    });
  }

  function verifierReponse(choix, boutons) {
    if (jours.includes(choix)) {
      answer = jour;
      exo = "jour";
      next = document.getElementById("next-button");
      next.style.display = "block"; // On affiche le bouton suivant
      next.addEventListener("click", function (e) {
        buildNext();
      });
    } else {
      answer = data[photo]["name"];
      exo = "nom";
      replay = document.getElementById("replay-button");
      replay.style.display = "block"; // On affiche le bouton replay
      if (count === 1) {
        localStorage.setItem(
          "Point",
          parseInt(localStorage.getItem("Point")) + 1
        );
        point();
      }
    }
    const result = document.getElementById("quiz-result");
    result.style.display = "block"; // On affiche le résultat
    const answerButton = Array.from(boutons).find((b) => b.value === answer);
    answerButton.style.backgroundColor = "#4caf50";
    if (choix === answer) {
      result.innerHTML = `Bravo ! Tu as trouvé le bon ${exo} !`;
      count += 1;
    } else {
      result.innerHTML = `Dommage ! Ce n'est pas le bon ${exo} !`;
      const choixButton = Array.from(boutons).find((b) => b.value === choix);
      choixButton.style.backgroundColor = "red";
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // On gère le 2 ème quiz sur le sujet de l'image.
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function melangerTableau(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tableau[i], tableau[j]] = [tableau[j], tableau[i]]; // échange des éléments
    }
    return tableau;
  }
  function addonetimes(namesPhoto, name) {
    // Vérifie si un élément équivalent existe déjà
    const exists = namesPhoto.some(
      (element) => makeName(element) === makeName(name)
    );

    if (!exists) {
      namesPhoto.push(name);
    }

    return namesPhoto;
  }

  function buildNext() {
    next = document.getElementById("next-button");
    next.style.display = "none"; // On masque le bouton suivant
    const result = document.getElementById("quiz-result");
    result.style.display = "none"; // On masque le résultat
    const question = document.getElementById("quiz-question");
    question.innerHTML = `Regarde bien l'image et choisis le lieu / nom :`;
    i = 0;
    nbrphoto = data.length;
    var y;
    namesPhoto = [data[photo]["name"]];
    while (i < nbrphoto && i < 4) {
      i++;
      y = Math.floor(Math.random() * nbrphoto);
      namesPhoto = addonetimes(namesPhoto, data[y]["name"]);
    }

    namesPhoto = melangerTableau(namesPhoto);
    buildButtons(namesPhoto); // On construit les boutons avec les noms des photos
  }
}

// Lire les paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);

// Vérifier si le paramètre "true" est présent dans l'URL
if (urlParams.has("true")) {
  replay = document.getElementById("replay-button");
  replay.onclick = function () {
    window.location.href = window.location.href;
  }; // Permet de ne pas avoir un additionné les ?true
  showRandomPicture();
  // Appeler une fonction ou exécuter une logique ici
}
