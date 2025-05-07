function showRandomPicture() {
  const day = Math.floor(Math.random() * 5);
  console.log(day);
  jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  jour = jours[day];
  var req = new XMLHttpRequest();

  req.open(
    "GET",
    `https://api.github.com/repos/lesacoi/SiteLondon/contents/${jour}/Photo?ref=main`
  );

  req.addEventListener("load", function () {
    // On vérifie que le status HTTP est bien supérieur à 200 et inférieur à 400
    // Sinon on renvoie le code du statut et le message du statut
    if (req.status >= 200 && req.status < 400) {
      const data = JSON.parse(this.responseText);
      nbrphoto = data.length;
      const photo = Math.floor(Math.random() * nbrphoto);
      const img = document.getElementById("random_picture");
      img.src = "../" + data[photo]["path"];
    } else {
      console.error(req.status + " " + req.statusText);
      return;
    }
  });
  req.addEventListener("error", function () {
    console.error("La requête à recontrer un problème");
    return;
  });

  // Évènement timeout
  req.addEventListener("timeout", function () {
    console.error("timeout");
    return;
  });

  req.send();
}
