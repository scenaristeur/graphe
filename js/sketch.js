



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
var defautMessage = "Echap = mode Commande, i mode Insertion, </br>";
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

	  inputProp = createInput('');
		 inputProp.input(inputPropEvent);
 inputProp.position( inputSujet.width,100);

		  inputObjet = createInput('');
			 inputObjet.input(inputObjetEvent);
			  inputObjet.position(2*inputSujet.width,100);


	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.attribute('id', 'canvas');
		canvas.mouseWheel(changeZoom);
		canvas.touchStarted(toucheStart);
initialisationPhysics();
initialisationData();
remplissageDataTest();

		triplets2links(triplets);
		updateAttractions();
/*    Particle makeParticle( float mass, float x, float y, float z )*/
/*Create a new particle in the system with some mass and at some x, y, z position. The default is a new particle with mass 1.0 at (0, 0, 0).*/
/*    b = physics.makeParticle( 1.0, random( -width/2+10, width/2-10 ), random( -height/2+10, height/2-10 ), random( -limiteZ, limiteZ ));
    c = physics.makeParticle( 1.0, random( -width/2+10, width/2-10   ), random( -height/2+10, height/2-10 ), random( -limiteZ, limiteZ ));
    d = physics.makeParticle( 1.0, random( -width/2+10, width/2-10   ), random( -height/2+10, height/2-10 ), random( -limiteZ, limiteZ ));
    b.id="B";
    c.id="C";
		d.id="D";*/


//http://murderandcreate.com/physics/bouncy_balls/Bouncy_Balls.txt
/*Attraction makeAttraction( Particle a, Particle b, float strength, float minimumDistance )
/*Make an attraction (or repulsion) force between two particles.
/*If the strength is negative they repel each other, if the strength is positive they attract.
/* There is also a minimum distance that limits how strong this force can get close up.*/
/*    physics.makeAttraction( centre, b, 10000, 400);
    physics.makeAttraction( centre, c, 10000, 500);
    physics.makeAttraction( centre, d, 10000, 600);*/

	//	physics.makeAttraction( b, c, -100, 100);
	//	physics.makeAttraction( b, d, -100, 100);
//		physics.makeAttraction( c, d, -100, 100);
	//	physics.makeAttraction( centre, d, 10000, 200);
  //  physics.makeAttraction( b, c, -10, 5 );

  /*Spring makeSpring( Particle a, Particle b, float strength, float damping, float restLength )
  /*make a spring in the system between 2 particles you have previously created.
  /* Look at spring down there for what the parameters mean.*/
//    s = physics.makeSpring( c, b, 0.0001, 0.1, 200 );
	//	s = physics.makeSpring( b, d, 0.01, 0.1, 200 );
	//	s = physics.makeSpring( centre, d, 0.1, 0.1, 200 );
	//	s = physics.makeSpring( d, c, 0.1, 0.1, 200 );
//    s = physics.makeSpring( mouse, c, 0.5, 0.1, 75 );
/*inputLongueur = createInput();
  inputLongueur.position(20, 65);
inputLongueur.value(springLongueur);*/
}



function draw(){
background(250);

  //drag to move the world.

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
	//	limiteZ=limiteZDefaut;
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
//console.log(mouse);
  mouse.position.x = mouseX-width/2;
  mouse.position.y = mouseY-height/2;
  mouse.position.z = 0;
  physics.tick();

//  background( 255 );

  stroke( 0 );
  //noFill();
  ellipse( mouse.position.x, mouse.position.y, 35, 35 );
  box( 10 );



	/*
	beginShape(LINES);
	vertex(0,0,0);
	vertex( c.position.x, c.position.y,c.position.z );
	endShape();*/
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
		//	console.log(particle.img);

			rotateX(-rotationX);
			rotateY(-rotationY);
			rotateZ(-rotationZ);
			translate( taille+10, taille+10 ,0 );
		texture(particle.img);
		//	box(80, 80, 80);
		plane(particle.IMGtaille, 20);
	//	text(particle.id,10,10,10);
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
//	console.log(spring);
	var deb = spring.a;
	var fin = spring.b;
	var debX = deb.position.x;
	var debY = deb.position.y;
	var debZ = deb.position.z;
	var finX = fin.position.x;
	var finY = fin.position.y;
	var finZ = fin.position.z;
	//update longueur
	spring.length=springLongueur;
	spring.constant = SPRING_STRENGTH;
	// utiliser Curve curve(debX,debY,debZ,0,0,0,10,10,10,finX,finY,finZ);
	var milieuSens = createVector((debX * 3 + finX) / 4, (debY * 3 + finY) / 4, (debZ * 3 + finZ) / 4);
	//pour eviter que les proprietes ne se superposent ou gerer une repulsion
	//	var milieuSens = createVector((debX * 3 + finX) / 4+random(10), (debY * 3 + finY) / 4+random(10), (debZ * 3 + finZ) / 4+random(10));
	beginShape();
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
	//	plane(8, 4);
//}
//}
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
