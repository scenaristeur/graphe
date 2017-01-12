function Noeud (prefix,id){
//	console.log(this);
this.id=id;
this.prefix=prefix;

this.img = loadImage("");
this.imageConst;
//var nbParticules = physics.particles.length*10;
//var p = physics.makeParticle( 2.0, random( -nbParticules,nbParticules   ), random( -nbParticules,nbParticules ), random( -nbParticules,nbParticules ));
var p = physics.makeParticle( 2.0, random(-springLongueur*2,springLongueur*2),random(-springLongueur*2,springLongueur*2),random(-springLongueur*2,springLongueur*2));
//console.log(pos);
console.log(physics.particles.length);
//p.makeFixed();


this.particule=p;
p.id=this.id;
this.createImg();
//r1 = physics.makeAttraction( centre, this.particule, 100, 200 );
/*for(var i=0;i<noeuds.length;i++){
	var noeud=noeuds[i];
	if(noeud!=this){
			r = physics.makeAttraction( noeud.particule, this.particule, -100, 200 );
}}*/

//updateAttractions();
}
Noeud.prototype.createImg = function(){
console.log(this.id);
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
