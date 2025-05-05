function showRandomPicture() {
  const day = Math.floor(Math.random() * 5);
  console.log(day);
  jour = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  nbrphoto = [1, 2, 3, 4, 5];
  photo = Math.floor(Math.random() * nbrphoto[day]);
  const img = document.getElementById("random_picture");
  img.src = "../" + jour[day] + "/Photo/" + photo + ".jpg";
}
