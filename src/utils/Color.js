export const randomColor = (alpha) => {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  
  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}

export  function randomColorArray(nombreCouleurs) {
    var tableauCouleurs = [];
  
    for (var i = 0; i < nombreCouleurs; i++) {
      tableauCouleurs.push(randomColor(0.2));
    }
  
    return tableauCouleurs;
  }
  
  
  