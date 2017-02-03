///////////////////////////////////////////////
// FONCTIONS UTILES A DIVERS ENDROITS DU SCRIPT
///////////////////////////////////////////////

//affiche un message sur la page
function message(texte){
    divMessages.elt.innerHTML="<font color='red'>"+texte+"</br> 'Echap' + 'h' pour afficher l'aide</font> ";
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

// redimensionne le canvas
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// regénère toutes les attractions entre les différentes particules
function updateAttractions(){
//  physics.attractions = [];



/*if(physics.attractions.length>200){
  physics.attractions.pop();
//  console.log("POP");
}*/
//if(physics.attractions.length<200){
  for(var i=0;i<noeuds.length;i++){
    var noeudI=noeuds[i];
    //  r1 = physics.makeAttraction( centre, noeudI.particule, springLongueur/2, 2*springLongueur );
  //  if(physics.attractions.length<1000 ){
    for(var j=0;j<noeuds.length;j++){
      //console.log(i +" "j);
      var noeudJ=noeuds[j];
      var posI = noeudI.particule.position;
      var posJ = noeudJ.particule.position;
        var d = dist(posI.x,posI.y,posI.z, posJ.x,posJ.y,posJ.z);
  	  if(noeudI!=noeudJ  ){



        //on n'ajoute que si un spring n'existe passer
        var springExist = false;
        for(var h=0;h<physics.springs.length;h++){
          var spring=physics.springs[h];
          var a =spring.a;
          var b=spring.b;

          //console.log(b);
          if(((a==noeudI.particule) && (b==noeudJ.particule)) || ((b==noeudI.particule) && (a==noeudJ.particule))){
            springExist = true;
          //  console.log(springExist);
            continue;
          }
        }

        //on n'ajoute que si une attraction n'existe passer
        var attExist = false;
        for(var h=0;h<physics.attractions.length;h++){
          var att=physics.attractions[h];
          var a1 =att.a;
          var b1=att.b;
          //console.log(a);
          //console.log(b);
          if(((a1==noeudI.particule) && (b1==noeudJ.particule)) || ((b1==noeudI.particule) && (a1==noeudJ.particule))){
            attExist = true;
          /*  push();
            translate (noeudI.particule.position);

              sphere(300);
              pop();*/
          /*  push();
            translate(posI.x,posI.y,posI.z);
            sphere(30);
            pop();

            push();
            translate(posJ.x,posJ.y,posJ.z);
            sphere(30);
            pop();*/
          //  console.log(springExist);
          /*affichage des attractions pour debug possible aussi de faire une ligne pour les visualiser car posent problèmes de ralentissement si trop importantes,
          sont supprimées dans la fonction gereAttraction() --> trouver un équilibre

          push();
          translate(a1.position.x,a1.position.y,a1.position.z);
          sphere(35);
          pop();
          push();
          translate(b1.position.x,b1.position.y,b1.position.z);
          sphere(35);
          pop(); */
            continue;
          }
        }
        //console.log(hypothenuse);
     // if ( d<hypothenuse && springExist == false && attExist == false ){ //2.4
        //    console.log(d+" "+limiteAttraction);
      //  lim = limiteAttraction;


          if ( springExist == false && attExist == false  &&  ( d<dMoyenne-10)  ){ //&& physics.attractions.length<2000 //  && physics.attractions.length<2000 //&& physics.attractions.length<1000 && (d<dMoyenne+1 || d<10) && ((d<frameRate() ||  && (d<dMoyenne+10)
                //  console.log(d);

 			  // r = physics.Attraction( noeudJ.particule, noeudI.particule, -80, springLongueur*2 );    //     console.log("add");

  			  r = physics.makeAttraction( noeudJ.particule, noeudI.particule, -5*(noeudJ.particule.mass+noeudI.particule.mass),limiteAttraction); //-5,5 -50, limiteAttraction-15
          			//   r = physics.makeAttraction( noeudJ.particule, noeudI.particule, -30,hypothenuse*1.5 );
//console.log(physics.attractions.length);
//-10*(noeudJ.particule.mass+noeudI.particule.mass)*(limiteAttraction-d)

         }

      }

//  }
}
//}
}
    // console.log(physics.attractions.length);
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
// pas encore implémenté dans traer.js

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

function rechercheFromParam(paramSujet,paramPropriete,paramObjet){
  console.log(paramSujet);
  console.log(paramPropriete);
  console.log(paramObjet);
  console.log(paramEndpoint);
  console.log(paramRequete);



  if (typeof paramEndpoint == "undefined"){
  var prefixSmag = "PREFIX+smag%3A++++<http%3A%2F%2Fsmag0.blogspot.fr%2FNS%23>%0D%0A";


  console.log();

  if ( typeof paramSujet == "undefined"){
    paramSujet = "?Sujet";
  }else{
      paramSujet = paramSujet.charAt(0).toUpperCase() + paramSujet.slice(1);
    paramSujet = "smag:"+paramSujet;
  }
  if( typeof paramPropriete == "undefined"){
    paramPropriete = "?Predicat";
//    console.log("####################"+paramPropriete);
  }else{
    paramPropriete = "smag:"+paramPropriete;
  }
  if( typeof paramObjet == "undefined"){

    paramObjet = "?Objet";
  }else{
          paramObjet = paramObjet.charAt(0).toUpperCase() + paramObjet.slice(1);
    paramObjet = "smag:"+paramObjet;
  }



  var endpointAsk = "https://rdf-smag0.rhcloud.com/ds/query";
  var queryAsk = prefixSmag;
	queryAsk += "select+*+where+%7B"+paramSujet+"+"+paramPropriete+"+"+paramObjet+"%7D+LIMIT"+limiteSparql+"OFFSET"+offsetSparql+"&output=json";
	query=endpointAsk+"?query="+queryAsk;
			message (query);
			console.log(query);
			envoiJSONQuery(query);
  }else{

  console.log(paramEndpoint);
  console.log(paramRequete);
  var endpointAsk = paramEndpoint;
  //prise en compte du endpoint et sujet comme param de l'url, ex : http://127.0.0.1:8000/?endpoint=http://fuseki-smag0.rhcloud.com/ds/query&sujet=http://smag0.blogspot.fr/ns/smag0#P1420278173713
  //http://jmvanel.free.fr/jmv.rdf#me
  //http://163.172.179.125:9111/sparql
  //requete=SELECT%20*%20WHERE%20{%20%20?p%20?o}+LIMIT%2010&output=ld-json
  // OK : http://127.0.0.1:8000/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Test

    if ( typeof paramSujet == "undefined"){
    paramSujet = "?Sujet";
	}
  if( typeof paramPropriete == "undefined"){
    paramPropriete = "?Predicat";
   // console.log("####################"+paramPropriete);
  }
  if( typeof paramObjet == "undefined"){
    paramObjet = "?Objet";
  }
  console.log(paramRequete);
   if( typeof paramRequete == "undefined"){
   //queryAsk = "SELECT * WHERE { <"+paramSujet+"> "+paramPropriete+" "+paramObjet+" } LIMIT 100 ";
   queryAsk  = "SELECT DISTINCT * WHERE { \n";

   var wherePart = "<"+paramSujet+"> "+paramPropriete+" "+paramObjet+" . \n";
   wherePart += "OPTIONAL { ?Objet ?p2 ?o2 } . \n";
   wherePart += "OPTIONAL { ?s3 ?p3 <"+paramSujet+"> }. \n";
   var wherePartComplete = "OPTIONAL { " + wherePart + "} GRAPH ?GRAPH { " + wherePart + " }";

   queryAsk += wherePartComplete + " } ";
   queryAsk += "LIMIT 200 ";

  }else{
  queryAsk = paramRequete;
  }

  query=endpointAsk+"?query="+queryAsk;
			message (query);
			console.log(query);
			envoiJSONQuery2(query);
  }
}



function splitUri(uri){
  var result = [];
  result = uri.split("#");
 //console.log(result);
  if (result.length != 2){
    var rest = uri.substring(0, uri.lastIndexOf("/") + 1);
    var last = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
   //console.log(rest);
  //console.log(last);
    result[0]=rest;
    result[1]=last;
  //  console.log(result);
  }
  return result;
}
// triplets to links, change les triplets en liens

function triplets2links(triplets){
//  inc=2*3.14/triplets.length;
physics.drag = 0;
	for (var i=0;i<triplets.length;i++){
		var sujetCourant;
		var objetCourant;
		var sExist=false;
		var oExist=false;
		var triplet=triplets.pop();
  //  console.log("popy");
//   console.log(triplet);
		var sujetUri=triplet.sujet;
		var proprieteUri = triplet.propriete;
		var objetUri = triplet.objet;
		var noeud;

var sujet = splitUri(sujetUri);
var propriete = splitUri(proprieteUri);
var objet = splitUri(objetUri);

//  console.log(sujet);
//  console.log(propriete);
//  console.log(objet);

		//verification sujet exist

		for (var j=0;j<noeuds.length;j++){
			noeud = noeuds[j];
			if (noeud.id==sujet[1]){
				sujetCourant=noeud;
				sExist=true;
			}
			if (noeud.id==objet[1]){
				objetCourant=noeud;
				oExist=true;
			}
		}

		if(sExist == false){
			sujetCourant = new Noeud(sujet[0],sujet[1]);
			noeuds.push(sujetCourant);
		}

		if(oExist == false){
			objetCourant = new Noeud(objet[0],objet[1]);
			noeuds.push(objetCourant);

		}
//console.log(sujetCourant);
//console.log(objetCourant)
//  console.log(noeuds);
  sujetCourant.particule.mass = sujetCourant.particule.mass+.2;
  objetCourant.particule.mass = objetCourant.particule.mass+.2;
  var m=(sujetCourant.particule.mass+objetCourant.particule.mass);
	//	s = physics.makeSpring( sujetCourant.particule, objetCourant.particule, (SPRING_STRENGTH+(random(SPRING_STRENGTH)))/m, 0.01, springLongueur+random(springLongueur)+100*m, propriete[0] ); // force , damping, longueur

spring={a:sujetCourant.particule,b:objetCourant.particule, force:SPRING_STRENGTH,damping:0.5,longueur : springLongueur, propriete:propriete[1]};
  springs2add.push(spring);


//  s = physics.makeSpring( sujetCourant.particule, objetCourant.particule, SPRING_STRENGTH, 0.1, springLongueur, propriete[0] ); // force , damping, longueur
  //	spring.imageConst = constructImage(propriete[1]);
	//	spring.img = spring.imageConst[0];
	//	spring.IMGtaille = spring.imageConst[1];
	//	links.push(s);
	//	console.log("S :"+springs2add.length);
    //  console.log(spring);
	}
//updateAttractions();
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
//  console.log(cameraZ);
}

function stabi(){
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
		//	console.log(particule.id+" baisse "+velocity);
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

  if ( particule.position.x < -width|| particule.position.x > width ){
    particule.velocity.set( -0.5*particule.velocity.x, particule.velocity.y, particule.velocity.z );
  //  console.log(particule);
  }
  if ( particule.position.y < -height  || particule.position.y> height ){
  particule.velocity.set( particule.velocity.x, -0.5*particule.velocity.y, particule.velocity.z  );
//console.log(particule);
  }

    if ( particule.position.z < -limiteZ  || particule.position.z > limiteZ ){
      particule.velocity.set( particule.velocity.x, particule.velocity.y, -0.9*particule.velocity.z);
  //    console.log(particule.id);
}

 particule.position.set( constrain( particule.position.x, -width*100, width*100 ), constrain( particule.position.y, -height*100 , height*100 ) , constrain( particule.position.z, -limiteZ , limiteZ ) );
}
function  handle2DLimite(p){
    var particule=p;
 particule.position.set(  constrain( particule.position.x, -width*100, width*100 ), constrain( particule.position.y, -height*100 , height*100 ) ,  constrain( particule.position.z, -limiteZ , limiteZ ) );
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
}else if (champsRemplis == 1){
	console.log("recherche");
  if (sujetTemp!=""){
    rechercheXML(sujetTemp);
  }
  if (objetTemp!=""){
    rechercheXML(objetTemp);
  }
}
}

function test(p){
  console(p);
}

function importRdf(){
  message("la fontion importRDF n'est pas encore implémentée");
}

function exportRdf(){
  message("la fontion exportRDF n'est pas encore implémentée");
}

function gotFile(file) {
  var fileDiv = createDiv(file.name + ' ' + file.type + ' ' + file.subtype + ' ' + file.size + ' bytes');
  // Check what kind of file it is
/*  if (file.type === 'image') {
    // Make an Image DOM element
    var img = createImg(file.data);
  } else if (file.type === 'text') {
    // Pull out some text, etc.
    createDiv(file.data);
  }*/
  switch(file.type) {
  /*  case "rdf+xml":
        console.log("fichier RDF"); //https://github.com/scenaristeur/dreamcatcherAutonome/blob/8376cb5211095a90314e34e9d286b820fbed335b/autonome1/public/agents/FichierAgent.js

         rdf2Xml2(file.data);
        break;*/
    default:
      console.log("ce type de fichier n'est pas pris en compte ("+file.type+" "+file.subtype+")");
}

}


function handleFile(file) {
  print(file);
  // if (file.type === 'image') { img = createImg(file.data); img.hide();
console.log(file.type+" "+file.subtype);
//console.log(file.data);
switch(file.subtype) {
  //https://github.com/scenaristeur/dreamcatcherAutonome/blob/8376cb5211095a90314e34e9d286b820fbed335b/autonome/public/js/conversion.js
    case "rdf+xml":
        console.log("fichier RDF"); //https://github.com/scenaristeur/dreamcatcherAutonome/blob/8376cb5211095a90314e34e9d286b820fbed335b/autonome1/public/agents/FichierAgent.js

         rdf2Xml2(file.data);
        break;
    case "turtle":
          console.log("fichier turtle");
        ttl2Xml(file.data);
        break;
    default:
      console.log("ce type de fichier n'est pas pris en compte ("+file.subtype+")");
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
