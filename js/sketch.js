//AFFICHAGE
var canvas;
var facteurZoom = 2;
var limiteZDefaut=600;
var limiteZ=limiteZDefaut;
var cameraX = 0,cameraY = 0,cameraZ = 0;
var stabilisation = false;
var deuxD = false;
var divMessages;
var inputSujet;
var inputProp;
var inputObjet;
var modeCommande = true;
var defautMessage = "Echap = mode Commande, i = mode Insertion. En mode commande  : h pour afficher cette aide,  </br> ";
defautMessage+= "* et ù ou roulette pour zoomer, m et l pour la force des ressorts, : et ; pour la longueur des ressorts, + et - pour accelérer, ralentir les déplacements </br>";
defautMessage+=" espace pour reinitialiser la camera,  clic ou a,z,q,s,w,x,e,d,c pour tourner, fleches pour se déplacer, n pour un nouveau graphe,  </br>";
defautMessage+=" touche ! pour passer en 2D/3D, et les trois champs ci-dessous pour ajouter <a href='https://fr.wikipedia.org/wiki/Resource_Description_Framework' target='-blank'>un triplet RDF</a></br>";
defautMessage+= "f pour charger les dix premières infos depuis un endpoint (serveur) sparql (valider deux fois pour le endpoint et la requete), g pour charger les dix suivantes et ggggggggg pour en charger plein </br>"
defautMessage+="[[<a href='js/commande.js' target='_blank'>Commandes</a>]][[<a href='https://github.com/scenaristeur/graphe' target='_blank'>Code source</a>]]";
var rotationX = 0,rotationY = 0,rotationZ = 0;
var font = '36pt Times';
var afficheTout = true;
var triplets2add =[];

// DONNEES
var sujetValue;
var propValue;
var objetValue;
var triplets = [];
var noeuds = [];
var links = [];
//var inputFile;
var loadSourceInput;
var paramSujet;
var paramPropriete;
var paramObjet;

//SPARQL
var endpoints = [];
var dbpediaPath = "http://dbpedia.org/data/";
var limiteSparql = 10;
var offsetSparql = 0;

//PHYSICS
var physics;
var PHYS_GRAVITY = 0;
var PHYS_DRAG_DEFAULT = 0.05;
var PHYS_DRAG = PHYS_DRAG_DEFAULT;
var SPRING_STRENGTH_DEFAULT = 0.001; //0.01
var SPRING_STRENGTH = SPRING_STRENGTH_DEFAULT;
var springLongueurDefault=120;
var springLongueur=springLongueurDefault;
//var seuilAtt=springLongueur*3;
var hypothenuse = Math.sqrt(Math.pow(springLongueur,2)*2);
var centroid = new Smoother3D(0.9);
var mouse,b,c =new Particle();
//var inputLongueur;

function setup() {
	var query = getQueryParams(document.location.search);
	paramSujet=query.sujet;
	paramPropriete = query.propriete;
	paramObjet = query.objet;
	//CANVAS
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.attribute('id', 'canvas');
	canvas.mouseWheel(changeZoom);
	canvas.touchStarted(toucheStart);

	divMessages = createDiv(defautMessage);
	divMessages.position(10,10);

	inputSujet = createInput('');
  inputSujet.input(inputSujetEvent);
	inputSujet.position(10,130);
	inputSujet.attribute('id', 'inputSujet');

	inputProp = createInput('');
	inputProp.input(inputPropEvent);
 	inputProp.position( inputSujet.width,130);
	inputProp.attribute('id', 'inputProp');

	inputObjet = createInput('');
	inputObjet.input(inputObjetEvent);
	inputObjet.position(2*inputSujet.width,130);
	inputObjet.attribute('id', 'inputObjet');


var fileSelect = createFileInput(handleFile);
fileSelect.position(10, 150);
//	input = createFileInput(handleFile);  //http://p5js.org/reference/#/p5/createFileInput    createFileInput([callback],[multiple]) https://github.com/processing/p5.js/issues/370
//	input.position(10, 150);
/*	loadSourceInput=document.createElement("INPUT");
     loadSourceInput.setAttribute('id', 'file');
     loadSourceInput.setAttribute('type', 'file');
  //   loadSourceInput.multiple=true;
	//	 loadSourceInput.style.left=10;
	//	 loadSourceInput.style.top=150;

		 loadSourceInput.addEventListener('change', function() {
		var listeFichiers=this.files;
		console.log(this.files);

		for (i=0; i<listeFichiers.length; i++) {
				var fichier=listeFichiers[i];

				//  var fichierAgent = new FichierAgent('fichierAgent'+i);
				//   console.log(fichier);
				handleFile(fichier);
				//     fichierAgent.send('contexte1', "Hello contexte1, peux-tu rajouter le fichier ' "+fichier.name+" ' dans l'interface pour suivre son traitement");
		}
});*/




	initialisationPhysics();
			initialisationData();
	if ((typeof paramSujet == "undefined") && (typeof paramPropriete == "undefined") && (typeof paramObjet == "undefined") ){
			remplissageDataTest();
	}else{
		rechercheFromParam(paramSujet,paramPropriete,paramObjet);
	}
console.log(triplets);
	triplets2links(triplets);
	updateAttractions();
}



function draw(){
	background(250);
	camera(cameraX,cameraY,cameraZ);
		  normalMaterial();
//	strokeWeight(3);
//	stroke(0);
//	noFill();
//fill(255,0,0,50);
	if(modeCommande == true){
		commandes();
	  orbitControl();
	}else{
		commandesEdition();
	}
	rotateX(rotationX);
	rotateY(rotationY);
	rotateZ(rotationZ);

	if(deuxD==true){
		if(limiteZ>0){
			limiteZ-=10;
			modeAff="2D";
			message("2D : " + limiteZ);
			//		stroke('red');
			//	strokeWeight(4);
		//	fill(0,10,0,10);
 			box(limiteZ);
		}
	}else{
		modeAff="3D";
		if(limiteZ<limiteZDefaut){
			limiteZ+=10;
			modeAff="3D";
			message("3D : " + limiteZ);
		//	fill(0,10,0,10);
			box(limiteZ);
		}
	}


  mouse.position.x = mouseX-width/2;
  mouse.position.y = mouseY-height/2;
  mouse.position.z = 0;
  physics.tick();

  //stroke( 2 );
	//fill(10,0,0,10);
	//noFill();
//affichage souris
  ellipse( mouse.position.x, mouse.position.y, 35, 35 );

		//affichage centre 0,0,0, la particule "centre" a pu se déplacer ?
  box( 10 );

	if(stabilisation){
		stabilisation();
	}


if (afficheTout == true){
	for (i = 0 ; i< physics.particles.length;i++){
		var particle = physics.particles[i];
		if ((particle.id != "mouse") && (particle.id != "centre")){
		//	handleBoundaryCollisions( particle );
		if(deuxD == true){
		handle2DLimite(particle);
	}
			var x=particle.position.x;
			var y=particle.position.y;
			var z=particle.position.z;
			if (isNaN(x)){
		//		console.log("Houston, we've had a problem here, particle.position is not a number");
		//		console.log("-"+physics.attractions.length+" "+physics.particles.length+" "+physics.particles[2].position);
	//	console.log(particle);
		SPRING_STRENGTH = SPRING_STRENGTH_DEFAULT;
		particle.position = new Vector(random(-100,100),random(-100,100),random(-100,100));
		particle.velocity = new Vector(random(-1,1),random(-1,1),random(-1,1));
		particle.force = new Vector(random(-1,1),random(-1,1),random(-1,1));
		handle2DLimite(particle);
		 x=particle.position.x;
		 y=particle.position.y;
		 z=particle.position.z;

			}
			var taille=particle.mass;
			push();
	  	translate( x, y ,z );
			if ((particle.id==sujetValue) /*|| (particle.id==objetValue)*/){
				torus(10+max(0,cameraZ/20),3+max(0,cameraZ/100));
			}else if (/*(particle.id==sujetValue) ||*/ (particle.id==objetValue)){
			 	cone(20+max(0,cameraZ/20));
			}else{
				var d = dist (	mouse.position.x,mouse.position.y,mouse.position.z,particle.position.x,particle.position.y,particle.position.z)
				if(d<30){
					ambientLight(255,0,0);
					pointLight(250, 250, 250, 100, 100, 0);
					ambientMaterial(250);
					particle.over = true;
				}else{
					particle.over = false;
				}

//console.log(taille);
				sphere(10);
			//	console.log(s);
			//	s.mouseOver(test);
			}
			if (particle.img!=undefined){
				rotateX(-rotationX);
				rotateY(-rotationY);
				rotateZ(-rotationZ);
				translate( 10, 10 ,0 );
				texture(particle.img);
				plane(particle.IMGtaille, 20);
				normalMaterial();
			}
			pop();
		}
	}


}
	for (i = 0 ; i< physics.springs.length;i++){
		var spring = physics.springs[i];
		var deb = spring.a;
		var fin = spring.b;
		var debX = deb.position.x;
		var debY = deb.position.y;
		var debZ = deb.position.z;
		var finX = fin.position.x;
		var finY = fin.position.y;
		var finZ = fin.position.z;
		spring.length=springLongueur;
		spring.constant = SPRING_STRENGTH;
		// utiliser Curve curve(debX,debY,debZ,0,0,0,10,10,10,finX,finY,finZ);
		var milieuSens = createVector((debX * 3 + finX) / 4, (debY * 3 + finY) / 4, (debZ * 3 + finZ) / 4);
		//pour eviter que les proprietes ne se superposent ou gerer une repulsion
		//	var milieuSens = createVector((debX * 3 + finX) / 4+random(10), (debY * 3 + finY) / 4+random(10), (debZ * 3 + finZ) / 4+random(10));
		beginShape();
	//	fill(0, 0, 0);
			vertex(debX, debY,debZ);
			vertex(milieuSens.x,milieuSens.y,milieuSens.z);
			vertex(finX, finY,finZ);
		endShape();
		push();
		//curve(0,0,0,0);
		//normalMaterial();
		//sphere(6);
		//if ((this.sujet.particle.position.z>0 && (this.objet.particle.position.z>0))){
		//if (afficheTexte) {
		//	translate(10, 10, -10);
		if (afficheTout == true){
		translate(milieuSens.x, milieuSens.y, milieuSens.z);
		rotateX(-rotationX);
		rotateY(-rotationY);
		rotateZ(-rotationZ);

		texture(spring.img);
		//	box(80, 80, 80);
		plane(spring.IMGtaille, 20);
		pop();
	}
		normalMaterial();
	}


if((triplets2add.length>0) ){
	var lim=min(10,triplets2add.length);
		for (var l=0;l<lim;l++){
			var t=triplets2add.pop();
		//	console.log(t);
			var triplet = new Triplet(t.sujet,t.propriete,t.objet);
			triplets.push(triplet);
		//	triplets2links(triplets);
		//console.log(triplets2add.length+" "+triplets.length);
	triplets2links(triplets);
		}

	//updateAttractions();


}
//if(triplets2add.length == 0){
	//	continueRequete();

	gereAttractions();

//}
/*
if (physics.attractions.length>0){
console.log(triplets2add.length+"springs "+physics.springs.length+" / attractions : "+physics.attractions.length+" framerate : "+int(frameRate()));
}*/
}



function gereAttractions(){
//	console.log("springs "+physics.springs.length+" / attractions : "+physics.attractions.length+" framerate : "+int(frameRate()));
	//console.log(physics.attractions[0]);
	var att2remove=[];
	for (var i=0;i<physics.attractions.length;i++){
		var att = physics.attractions[i];

		var a = att.a.position;
		var b = att.b.position;
		var d = dist(a.x,a.y,a.z,b.x,b.y,b.z);
		//console.log(physics.attractions.length+" "+d);
		if (d>(hypothenuse)){
			att2remove.push(att);
		//	console.log("rem");
		}

	}
	var av=att2remove.length;
	for (var j=0;j<att2remove.length;j++){
		var att = att2remove[j];
		physics.attractions.remove(att);
	}
	updateAttractions();
//	console.log(av +" "+att2remove.length+" "+physics.attractions.length);
}

function continueRequete(){
	offsetSparql+=limiteSparql;
	var endpointAsk = "https://rdf-smag0.rhcloud.com/ds/query";
	var queryAsk = "select+*+where+%7B%3FSujet+%3FPredicat+%3FObjet%7D+LIMIT"+limiteSparql+"OFFSET"+offsetSparql+"&output=json";
	query=endpointAsk+"?query="+queryAsk;
			message (query);
			console.log(query);
			envoiJSONQuery(query);
}


function toucheStart(e){
	console.log(e);
	console.log(mouseX+" "+mouseY);
}

function inputSujetEvent(){
	console.log('you are typing sujet : ', this.value());
	sujetValue=this.value();
	modeCommande = false;
}

function inputPropEvent(){
	console.log('you are typing prop: ', this.value());
	propValue = this.value();
	modeCommande = false;
}

function inputObjetEvent(){
	console.log('you are typing Obj: ', this.value());
	objetValue = this.value();
	modeCommande = false;
}

function envoiJSONQuery(query){
	loadJSON(query,jsonDataOk,jsonDataError);
}


function jsonDataOk(data){
	console.log(data);
		console.log(data.head.vars);
			console.log(data.results.bindings);
			var jsonTriplets = data.results.bindings;
//[jsonTriplets,triplets]

		//Création d'un worker


//	  var noeuds = e.data[2];
	  console.log(paramSujet);
	console.log(paramPropriete);
	console.log(paramObjet);

	  for  (var i=0; i< jsonTriplets.length;i++){
	    var jsonTriplet = jsonTriplets[i];
			console.log(jsonTriplet)
	    var sujetTemp;
	    var propTemp;
	    var objetTemp;
	    if(typeof jsonTriplet.Sujet == "undefined"){
	      sujetTemp = "http://smag0.blogspot.fr/NS#"+paramSujet;
	    }else{
	      sujetTemp = jsonTriplet.Sujet.value;
	    }
	    if(typeof jsonTriplet.Predicat == "undefined"){
	      propTemp = "http://smag0.blogspot.fr/NS#"+paramPropriete;
	    }else{
	      propTemp = jsonTriplet.Predicat.value;
	    }
	    if(typeof jsonTriplet.Objet == "undefined"){
	      objetTemp = "http://smag0.blogspot.fr/NS#"+paramObjet;
	    }else{
	      objetTemp = jsonTriplet.Objet.value;
	    }
	    var triplet = new Triplet(sujetTemp,propTemp,objetTemp);
	    triplets.push(triplet);
			console.log(triplet);
	  }
	  console.log(i+"/"+jsonTriplets.length);
		console.log(triplets);
			triplets2links(triplets);
			updateAttractions();
	/*	if(window.Worker){
		//le navigateur supporte les workers
				var tripletsWorker = new Worker("js/tripletWorker.js");
					tripletsWorker.postMessage([jsonTriplets,triplets]);
		 		console.log('Message posted to worker');
				tripletsWorker.onmessage=function(event){
						console.log('Message received from worker : ');
						triplets2add= event.data;
							console.log(triplets2add.length);
			};




		}else{
		//le navigateur ne supporte pas les workers
		    alert("Désolé votre navigateur "+
		        "ne supporte pas les workers ! ☹");
		}*/




}

function jsonDataError(data){
	console.log(data);
	message(data);
}





function rechercheXML(recherche){
	    //var path=dbpediaPath+recherche+".json";
		//	var query="http://fr.dbpedia.org/sparql?default-graph-uri=http://fr.dbpedia.org&query=DESCRIBE+%3Chttp://fr.dbpedia.org/resource/"+recherche+"%3E&output=application/ld-json";
		/*	var query="http://fr.dbpedia.org/sparql?default-graph-uri=http://fr.dbpedia.org&query=";
			 query+="SELECT * WHERE {";
   			query+="OPTIONAL{  <http://fr.dbpedia.org/resource/"+recherche+"> ?p ?o}\n";
   			query+="OPTIONAL{ ?s ?p <http://fr.dbpedia.org/resource/"+recherche+">}";
				query+="}";
				query+="LIMIT 10";
				query+="&output=application/ld-json";*/
			console.log(query);
	//		loadStrings(query,describeCharge,describeErreur);
}


function describeCharge(response){
  //console.log(response);
	console.log(response.length);

	for (var i=0; i< 1000;i++){
		var sujetUri = "";
		var propUri = "";
		var objetUri = "";
		var tripletDescribe = response[i].trim();
		var tripletDescribeArray = tripletDescribe.split(/\s+/);
		console.log(tripletDescribeArray.length);
		var lastCar = tripletDescribe.slice(-1);
	//	console.log(lastCar);

		switch(tripletDescribeArray.length) {
	    /*case 0:
						console.log(tripletDescribeArray.length);
						console.log(tripletDescribeArray);
	        break;
	    case 1:
		console.log(tripletDescribeArray.length);
								console.log(tripletDescribeArray);
	        break;
			case 2:
					console.log(tripletDescribeArray.length);
											console.log(tripletDescribeArray);

			  	break;
					case 3:
				console.log(tripletDescribeArray.length);
										console.log(tripletDescribeArray);
							break;*/
							case 4:
						console.log(tripletDescribeArray.length);
												console.log(tripletDescribeArray);
													sujetUri = tripletDescribeArray[0];
													propUri = tripletDescribeArray[1];
													objetUri = tripletDescribeArray[2];
													console.log(sujetUri);
													console.log(propUri);
													console.log(objetUri);
					        break;
	    default:
	        console.log("si cette ligne s'affiche, y'a un pb "+tripletDescribeArray.length);
	}

	var sujetPrefix = sujetUri.split(":")[0];
	var propPrefix = propUri.split(":")[0];
	var objetPrefix = objetUri.split(":")[0];
	var sujetLocal = sujetUri.split(":")[1];
	var propLocal = propUri.split(":")[1];
	var objetLocal = objetUri.split(":")[1];

if (sujetLocal != undefined && propLocal != undefined && objetLocal != undefined){
	var triplet = new Triplet(sujetLocal,propLocal,objetLocal);
	triplets.push(triplet);

}


		/*var tripletDescribeArray = tripletDescribe.toString().split(" ");
		console.log(tripletDescribeArray);

		console.log(sujetUri);
		console.log(propUri);
		console.log(objetUri);
*/
if(i%10==0){
	//console.log(triplet);
triplets2links(triplets);
}
	}

}

function describeErreur(response){
    console.log(response);
		message("ERREUR de chargement du fichier json " );

}
