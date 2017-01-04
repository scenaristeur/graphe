//////////////////////////////////////////////////
// COMMANDES
/////////////////////////////////////////////////

/* Selon que l'on soit en mode "commande" (touche "ECHAP") ou en mode "insertion" (touche i)
on utilise la fonction "commandes" ou "commandesInsertion"
keyIsDOwn est utilisé lorsque la touche est appuyée en continu
KeyPressed est utilisé pour n'attrapper qu'un seul appui de la touche
*/

function commandes(){
  if (keyIsDown(UP_ARROW)) //fleche haut
  	cameraY-=facteurZoom;
  if (keyIsDown(DOWN_ARROW))//fleche bas
  	cameraY+=facteurZoom;
  if (keyIsDown(LEFT_ARROW))//fleche gauche
  	cameraX-=facteurZoom;
  if (keyIsDown(RIGHT_ARROW))//fleche droite
  	cameraX+=facteurZoom;
  if (keyIsDown(220))// touche *
    cameraZ-=facteurZoom*2;
  if (keyIsDown(192))//touche ù
    cameraZ+=facteurZoom*2;
  if (keyIsDown(73)){ // touche i pour passer en mode insertion comme vi =  sortir du mode commande
    modeCommande = false;
    message("Mode commande : "+modeCommande);
      document.getElementById('inputSujet').focus();
  }
//ROTATION
  if (keyIsDown(65))//touche a
    rotationY+=.01;
  if (keyIsDown(90))//touche z
    rotationY-=.01;
  if (keyIsDown(81)) //touche q
      rotationX+=.01;
  if (keyIsDown(83))// touche s
      rotationX-=.01;
  if (keyIsDown(87))// touche w
      rotationZ+=.01;
  if (keyIsDown(88))//touche x
      rotationZ-=.01;
  if (keyIsDown(69))//touche e
      rotationY=0;
  if (keyIsDown(68))//touche d
      rotationX=0;
  if (keyIsDown(67))//touche c
      rotationZ=0;

}

function commandesEdition(){
  if (keyIsDown(ESCAPE)){    // touche ESC pour passer en mode commande comme vi, sortir du mode insertion
    modeCommande = true;
    document.getElementById('inputSujet').blur();
    document.getElementById('inputProp').blur();
    document.getElementById('inputObjet').blur();
    message("Mode commande : "+modeCommande);
  }
}

function keyPressed() {
  console.log("mode commande");
  if (modeCommande == true){
     switch(keyCode) {
      /* case 68:
        //d pour DEBUG
        console.log(physics);
       break;*/
       case 79:
        //o pour basculer afficheTout
        afficheTout = !afficheTout;
        console.log(afficheTout);
       break;
       case 188:
        //? pour stabilisation
        stabilisation = !stabilisation;
        console.log(stabilisation);
       break;

       case 223:
        // ! pour passer de 2D à 3D
        deuxD=!deuxD;
        SPRING_STRENGTH = SPRING_STRENGTH_DEFAULT;
        if(deuxD == false){
        for (i = 0 ; i< physics.particles.length;i++){
          var particule = physics.particles[i];
        particule.position.set(particule.position.x,particule.position.y,particule.position.z+random(-10,10));
      }
    }
       break;
       case 70:
        // f pour charger des données

        var query="";
        var endpointAsk = prompt("Choisissez un Endpoint", "https://rdf-smag0.rhcloud.com/ds/query");
        if (endpointAsk != null) {
          //  document.getElementById("demo").innerHTML =
          //  "Hello " + person + "! How are you today?";

          var queryAsk = prompt("Choisissez une Requete", "select+*+where+%7B%3FSujet+%3FPredicat+%3FObjet%7D+LIMIT"+limiteSparql+"OFFSET"+offsetSparql+"&output=json");
          if (queryAsk != null) {
              query=endpointAsk+"?query="+queryAsk;
                  message (query);
                  console.log(query);
                  envoiJSONQuery(query);
          }
        }

        break;
        case 71:
         //g pour charger plus de resultats
         continueRequete();
        break;
        case 66:
         //b pour panique, lorsque tous les noeuds sont à perpet
         for (i = 0 ; i< physics.particles.length;i++){
           var particule = physics.particles[i];
           SPRING_STRENGTH = SPRING_STRENGTH_DEFAULT;
         particule.position.set(random(10), random(20), random(10));
         console.log(particule.position);
       }
        break;
        case 89:
         //y pour exporter les informations, les partager par mail,
         exportRdf();
        break;
        case 85:
         //u pour importer des informations (charger un fichier)
         importRdf();
        break;
       case 72:
        // h pour afficher l'aide
        message (defautMessage);
        break;
       case 32:
        // espace pour reinitialiser
        cameraX = 0;
   		  cameraY = 0;
        cameraZ = 0;
        springLongueur = springLongueurDefault;
        SPRING_STRENGTH = SPRING_STRENGTH_DEFAULT/10;
        PHYS_DRAG = PHYS_DRAG_DEFAULT;
        rotationX = 0;
        rotationY = 0;
        rotationZ = 0;
      //  noeuds[0].particule.position.set(0,0,0);
        updateAttractions();
       break;
       case 187:
        // - pour ralentir les déplacements
        physics.drag = max ((physics.drag-0.05).toFixed(2),0);
        console.log(physics.drag);
        message("Retention mouvement : "+ physics.drag+" / "+modeAff);
      break;
      case 54:
        //+ pour accélérer les déplacements
        physics.drag+=0.05;
        console.log(physics.drag);
        message("Retention mouvement : "+ physics.drag+" / "+modeAff);
      break;
      case 191:
        //: pour allonger la longueur des springs / ressorts
        springLongueur=springLongueur+10 ;
        updateAttractions();
         message("springLongueur : "+springLongueur);
      break;
      case 190:
        //; pour raccourcir les liens
        springLongueur=max(0,springLongueur-10) ;
        updateAttractions();
        message("springLongueur : "+springLongueur);
      break;
      case 77:
        //m pour augmenter la force des springs
        SPRING_STRENGTH=SPRING_STRENGTH/2 ;
        message("SPRING_STRENGTH : "+SPRING_STRENGTH);
      break;
      case 76:
        //l pour diminuer la force des springs
        SPRING_STRENGTH=SPRING_STRENGTH*2 ;
        message("SPRING_STRENGTH : "+SPRING_STRENGTH);
      break;
      case 78:
       //n pour Nouveau + todo : ajouter confirmation
       console.log("nouveau");
       initialisationData();
       initialisationPhysics();
      break;
      default:
       // sinon afficher le keycode de la touche
       console.log("defaut : "+ keyCode);
   }
}else{
  console.log("mode insert");
  //mode insertion
    switch(keyCode) {
      case ENTER:
        // Enter pour valider la saisie
        console.log("ENTER");
        validationSaisie();
      break;
  }
}
//  return false; // prevent default
}
