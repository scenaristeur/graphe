///////////////////////////////////////////////
// FONCTIONS UTILES A DIVERS ENDROITS DU SCRIPT
///////////////////////////////////////////////

//affiche un message sur la page
function message(texte){
    divMessages.elt.innerHTML=texte+" </br> 'Echap' + 'h' pour afficher l'aide";
}

// redimensionne le canvas
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// regénère toutes les attractions entre les différentes particules
function updateAttractions(){
  physics.attractions = [];
  for(var i=0;i<noeuds.length;i++){
    var noeudI=noeuds[i];
      r1 = physics.makeAttraction( centre, noeudI.particule, springLongueur/2, 2*springLongueur );
    for(var j=0;j<noeuds.length;j++){
      var noeudJ=noeuds[j];
  	  if(noeudI!=noeudJ){
  			r = physics.makeAttraction( noeudJ.particule, noeudI.particule, -springLongueur, springLongueur+random(10) );
      }
    }
  }
//console.log(physics.attractions);
}

// initialisation
function initialisationData(){
  triplets = [];
  noeuds = [];
  links = [];
}

function initialisationPhysics(){
  // Runge-Kutta, the default integrator is stable and snappy,
// but slows down quickly as you add particles.
// 500 particles = 7 fps on my machine

// Try this to see how Euler is faster, but borderline unstable.
// 500 particles = 24 fps on my machine
//physics.setIntegrator( ParticleSystem.MODIFIED_EULER );
  physics = new ParticleSystem(PHYS_GRAVITY ,PHYS_DRAG);
  centre = physics.makeParticle(10,0,0,0);
  mouse = physics.makeParticle();
  mouse.makeFixed();
  centre.makeFixed();
  mouse.id="mouse";
  centre.id="centre";
}

function remplissageDataTest(){

  	/*	var noeudTest = new Noeud();
  		noeudTest.id="test";
  		noeuds.push(noeudTest);*/
  		var triplet1 = new Triplet("David", "type", "Developpeur");
  		var triplet2 = new Triplet("Smag0", "type", "Projet");
  		var triplet3 = new Triplet("David","developpeurDe","Smag0");
  		var triplet4 = new Triplet("Developpeur", "subClassOf", "Personne");
  		var triplet5 = new Triplet("Sphero-Carto", "type", "Projet");
  		var triplet6 = new Triplet("Blacj", "type", "Projet");
  		var triplet7 = new Triplet("Miss Here²", "type", "Projet");
  		var triplet8 = new Triplet("Simon", "type", "Personne");
  		var triplet9 = new Triplet("Lucie", "type", "Personne");
      var triplet10 = new Triplet("Martin", "type", "Personne");
      var triplet11 = new Triplet("Emile", "type", "Personne");
      var triplet12 = new Triplet("Simon", "filsDe", "David");
      var triplet13 = new Triplet("Lucie", "filleDe", "David");
      var triplet14 = new Triplet("Martin", "filsDe", "David");
      var triplet15 = new Triplet("Emile", "filsDe", "David");
      var triplet16 = new Triplet("Smag0", "utilise", "PcDuinoBot");
      var triplet17 = new Triplet("David", "developpeurDe", "PcDuinoBot");
      var triplet18 = new Triplet("PcDuinoBot", "hasPart", "PcDuino");
      var triplet19 = new Triplet("PcDuino", "type", "CarteElectronique");
      var triplet20 = new Triplet("Arduino", "type", "CarteElectronique");
      var triplet21 = new Triplet("PcDuinoBot", "type", "Robot");
      var triplet22 = new Triplet("Sphero", "type", "Robot");
      var triplet23 = new Triplet("Sphero-Carto", "utilise", "Sphero");
  		var triplet24 = new Triplet("David","developpeurDe","Sphero-Carto");
  		var triplet25 = new Triplet("Simon","demandeurDe","Smag0");
  		var triplet26 = new Triplet("Smag0","utilise","Sphero-Carto");
  		triplets.push(triplet1);
  		triplets.push(triplet2);
  		triplets.push(triplet3);
  		triplets.push(triplet4);
  		triplets.push(triplet5);
  		triplets.push(triplet6);
  		triplets.push(triplet7);
  		triplets.push(triplet8);
  		triplets.push(triplet9);
      triplets.push(triplet10);
  		triplets.push(triplet11);
  		triplets.push(triplet12);
  		triplets.push(triplet13);
  		triplets.push(triplet14);
  		triplets.push(triplet15);
      triplets.push(triplet16);
  		triplets.push(triplet17);
  		triplets.push(triplet18);
  		triplets.push(triplet19);
      triplets.push(triplet20);
  		triplets.push(triplet21);
  		triplets.push(triplet22);
  		triplets.push(triplet23);
  		triplets.push(triplet24);
  		triplets.push(triplet25);
  		triplets.push(triplet26);
  	//	console.log(triplets);
}


// triplets to links, change les triplets en liens

function triplets2links(triplets){
	for (var i=0;i<triplets.length;i++){
		var sujetCourant;
		var objetCourant;
		var sExist=false;
		var oExist=false;
		var triplet=triplets[i];
		var sujet=triplet.sujet;
		var propriete = triplet.propriete;
		var objet = triplet.objet;
		var noeud;

		//verification sujet exist
		for (var j=0;j<noeuds.length;j++){
			noeud = noeuds[j];
		//	console.log(noeud);
			if (noeud.id==sujet){
				sujetCourant=noeud;
				sExist=true;
			}
			if (noeud.id==objet){
				objetCourant=noeud;
				oExist=true;
			}
		}

		if(sExist == false){
			sujetCourant = new Noeud(sujet);
			noeuds.push(sujetCourant);
		}

		if(oExist == false){
			objetCourant = new Noeud(objet);
			noeuds.push(objetCourant);
		}
//	console.log(noeuds);
		s = physics.makeSpring( sujetCourant.particule, objetCourant.particule, SPRING_STRENGTH+(random(SPRING_STRENGTH)), 0.01, springLongueur+random(springLongueur), propriete ); // force , damping, longueur
		s.imageConst = constructImage(propriete);
		s.img = s.imageConst[0];
		s.IMGtaille = s.imageConst[1];
		links.push(s);
	//	console.log(s);
	}
updateAttractions();
}

// CREATION DES IMAGES 2D pour afficher le texte des noeuds et links
function constructImage(texte) {
  //affichage du texte en 3D
var  textCanvas = document.createElement("CANVAS");
   textCanvas.setAttribute("id","textCanvas");
  //  textCanvas.style.height=40;
  	//  textCanvas.style.width=0;
  //  textCanvas.style.left=-width;
  //  textCanvas.style.top=-height;
  //	document.body.appendChild(textCanvas);
var 	tCtx = textCanvas.getContext('2d');
	//console.log(tCtx);
	tCtx.canvas.width = tCtx.measureText(texte).width+2;
	tCtx.canvas.height = 20;
  //textCanvas.style.background="rgba(158, 167, 184, 0.2)";

	//	tCtx.canvas.style('display','none');
	IMGtaille = tCtx.canvas.width / 2;
	//	console.log(taille);
//	tCtx.font = "40px verdana"; // verdana, serif, Arial
	//voir http://jsfiddle.net/AbdiasSoftware/2JGHs/
	tCtx.fillText(texte, 0, tCtx.canvas.height*4/5);
	//	imageElem.src = tCtx.canvas.toDataURL();
	//	console.log(imageElem.src);
	//	image1.src = tCtx.canvas.toDataURL();
	img = loadImage(tCtx.canvas.toDataURL());
	//console.log(texte);
	var imgConst=[img,IMGtaille];
	return imgConst;

}




function changeZoom(event){
	cameraZ+=event.deltaY;
}

function stabilisation(){
	// fonction de stabilisation en complement du physics.drag --> peut être pas si necessaire ?
	for (var i=0;i<physics.particles.length;i++){
	  var particule=physics.particles[i];
		var velocity=particule.velocity.x+particule.velocity.y+particule.velocity.z;
	if ((particule.id != "mouse") && (particule.id != "centre")){
		if(abs(velocity)<.0001) {
			//  console.log(particule.id+" "+velocity);
			particule.velocity.set( 0,0,0 );
		}
		else{
			console.log(particule.id+" baisse "+velocity);
			particule.velocity.set( .99*particule.velocity.x,.99*particule.velocity.y,.99*particule.velocity.z );
		}
	}
}
}


// really basic collision strategy:
// sides of the window are walls
// if it hits a wall pull it outside the wall and flip the direction of the velocity
// the collisions aren't perfect so we take them down a notch too
function handleBoundaryCollisions(  p )
{
  var particule=p;

  if ( particule.position.x < -width || particule.position.x > width ){
    particule.velocity.set( -0.5*particule.velocity.x, particule.velocity.y, particule.velocity.z );
  //  console.log(particule);
  }
  if ( particule.position.y < -height  || particule.position.y > height ){
  particule.velocity.set( particule.velocity.x, -0.5*particule.velocity.y, particule.velocity.z  );
//console.log(particule);
  }

    if ( particule.position.z < -limiteZ  || particule.position.z > limiteZ ){
      particule.velocity.set( particule.velocity.x, particule.velocity.y, -0.9*particule.velocity.z);
  //    console.log(particule.id);
}

 particule.position.set( constrain( particule.position.x, -width, width ), constrain( particule.position.y, -height , height ) , constrain( particule.position.z, -limiteZ , limiteZ ) );
}




function validationSaisie(){
	var sujetTemp = sujetValue || "";
	var propTemp = propValue || "";
	var objetTemp = objetValue || "";
	var champsRemplis = 0;
console.log(inputObjet.focused);
// si l'un des elements du triplet est vide ou point d'interrogation, on suppose que l'on est en recherche
if ((sujetTemp.startsWith("?")) || (sujetTemp=="")){
	console.log("vide");
}else{
	console.log("pas vide");
	champsRemplis++;
}
if ((propTemp.startsWith("?")) || (propTemp=="")){
	console.log("vide");
}else{
	console.log("pas vide");
	champsRemplis++;
}
if ((objetTemp.startsWith("?")) || (objetTemp=="")){
	console.log("vide");
}else{
	console.log("pas vide");
	champsRemplis++;
}

if (champsRemplis == 3){
	console.log("ajout info");
	var triplet = new Triplet(sujetTemp,propTemp,objetTemp);
	triplets.push(triplet);
	console.log(triplets);
	triplets2links(triplets);
}else{
	console.log("recherche");
	var r = select("#David");
	console.log(r);

}

}


/*
function getClass(obj) {
  if (typeof obj === "undefined")
    return "undefined";
  if (obj === null)
    return "null";
  return Object.prototype.toString.call(obj)
    .match(/^\[object\s(.*)\]$/)[1];
}*/
