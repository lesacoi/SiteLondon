function deplacerImageAleatoirement(id) {
  const imageClicable = document.getElementById(id);
  const largeurFenetre = window.innerWidth - imageClicable.clientWidth;
  const hauteurFenetre = window.innerHeight - imageClicable.clientHeight;
  const positionX = Math.floor(Math.random() * largeurFenetre);
  const positionY = Math.floor(Math.random() * hauteurFenetre);
  imageClicable.style.left = `${positionX}px`;
  imageClicable.style.top = `${positionY}px`;
}
