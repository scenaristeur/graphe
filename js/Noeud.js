function Noeud (prefix,id){
//	console.log(this);
this.id=id;
this.prefix=prefix;


this.img = loadImage("");
this.imageConst;
//var nbParticules = physics.particles.length*10;
//var p = physics.makeParticle( 2.0, random( -nbParticules,nbParticules   ), random( -nbParticules,nbParticules ), random( -nbParticules,nbParticules ));
//var p = physics.makeParticle( 2.0, random(-springLongueur*2,springLongueur*2),random(-springLongueur*2,springLongueur*2),random(-springLongueur*2,springLongueur*2));
var distance = 1;//(physics.particles.length);
var p = physics.makeParticle( 10.0, random(-distance,distance),random(-distance,distance),random(-distance,distance));
p.velocity = p5.Vector.random3D();
//console.log(pos);
//console.log(physics.particles.length);
//p.makeFixed();


this.particule=p;
p.id=this.id;
this.createImg();
}
Noeud.prototype.createImg = function(){
//console.log(this.id);
if(this.id.length>20){
	var littleText=this.id.slice(0,20).concat("...");
	this.imageConst = constructImage(littleText);
	}else{
	this.imageConst = constructImage(this.id);
}

this.particule.img = this.imageConst[0];
this.particule.IMGtaille = this.imageConst[1];

//	console.log(this);
}
