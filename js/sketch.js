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
var defautMessage = "Echap = mode Commande, i mode Insertion, [[<a href='https://github.com/scenaristeur/graphe' target='_blank'>Code source</a>]]</br>";
defautMessage+= "* et ù pour zoomer, $ et ^ pour la force des ressorts, : et ; pour la longueur des ressorts, voir toutes les <a href='js/commande.js' target='_blank'>autres commandes</a></br>";
defautMessage+=" espace pour reinitialiser la camera,  clic pour tourner, fleches pour se déplacer , n pour un nouveau graphe,  </br>";
defautMessage+=" touche ! pour passer en 2D/3D, et les trois champs ci-dessous pour ajouter <a href='https://fr.wikipedia.org/wiki/Resource_Description_Framework' target='-blank'>un triplet RDF</a>";
var rotationX = 0,rotationY = 0,rotationZ = 0;
var font = '36pt Times';

// DONNEES
var sujetValue;
var propValue;
var objetValue;
var triplets = [];
var noeuds = [];
var links = [];

//SPARQL
var endpoints = [];
var dbpediaPath = "http://dbpedia.org/data/";

//PHYSICS
var physics;
var PHYS_GRAVITY = 0;
var PHYS_DRAG_DEFAULT = 0.05;
var PHYS_DRAG = PHYS_DRAG_DEFAULT;
var SPRING_STRENGTH_DEFAULT = 0.0001; //0.01
var SPRING_STRENGTH = SPRING_STRENGTH_DEFAULT;
var springLongueurDefault=75;
var springLongueur=springLongueurDefault;
var centroid = new Smoother3D(0.9);
var mouse,b,c =new Particle();
//var inputLongueur;

function setup() {
	//CANVAS
	divMessages = createDiv(defautMessage);
	divMessages.position(0,0);

	inputSujet = createInput('');
  inputSujet.input(inputSujetEvent);
	inputSujet.position(0,100);
	inputSujet.attribute('id', 'inputSujet');

	inputProp = createInput('');
	inputProp.input(inputPropEvent);
 	inputProp.position( inputSujet.width,100);
	inputProp.attribute('id', 'inputProp');

	inputObjet = createInput('');
	inputObjet.input(inputObjetEvent);
	inputObjet.position(2*inputSujet.width,100);
	inputObjet.attribute('id', 'inputObjet');


	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.attribute('id', 'canvas');
	canvas.mouseWheel(changeZoom);
	canvas.touchStarted(toucheStart);

	initialisationPhysics();
	initialisationData();
	remplissageDataTest();
	triplets2links(triplets);
	updateAttractions();
}



function draw(){
	background(250);
	camera(cameraX,cameraY,cameraZ);

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
			fill(0,10,0,10);
 			box(limiteZ);
		}
	}else{
		modeAff="3D";
		if(limiteZ<limiteZDefaut){
			limiteZ+=10;
			modeAff="3D";
			message("3D : " + limiteZ);
			fill(0,10,0,10);
			box(limiteZ);
		}
	}
  normalMaterial();

  mouse.position.x = mouseX-width/2;
  mouse.position.y = mouseY-height/2;
  mouse.position.z = 0;
  physics.tick();

  stroke( 0 );
  ellipse( mouse.position.x, mouse.position.y, 35, 35 );
  box( 10 );

	for (i = 0 ; i< physics.particles.length;i++){
		var particle = physics.particles[i];
		if ((particle.id != "mouse") && (particle.id != "centre")){
			handleBoundaryCollisions( particle );
			var x=particle.position.x;
			var y=particle.position.y;
			var z=particle.position.z;
			var taille=particle.mass;
			push();
	  	translate( x, y ,z );
			if ((particle.id==sujetValue) /*|| (particle.id==objetValue)*/){
				torus(10, 3);
			}else if (/*(particle.id==sujetValue) ||*/ (particle.id==objetValue)){
			 	cone(20, 20);
			}else{
				sphere(10,100);
			}
			if (particle.img!=undefined){
				rotateX(-rotationX);
				rotateY(-rotationY);
				rotateZ(-rotationZ);
				translate( taille+10, taille+10 ,0 );
				texture(particle.img);
				plane(particle.IMGtaille, 20);
				normalMaterial();
			}
			pop();
		}
	}

	if(stabilisation){
		stabilisation();
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
		translate(milieuSens.x, milieuSens.y, milieuSens.z);
		rotateX(-rotationX);
		rotateY(-rotationY);
		rotateZ(-rotationZ);

		texture(spring.img);
		//	box(80, 80, 80);
		plane(spring.IMGtaille, 20);
		pop();
		normalMaterial();
	}
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

function rechercheXML(recherche){
	    //var path=dbpediaPath+recherche+".json";
			var query="http://fr.dbpedia.org/sparql?default-graph-uri=http://fr.dbpedia.org&query=DESCRIBE+%3Chttp://fr.dbpedia.org/resource/"+recherche+"%3E&output=application/ld-json";
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
