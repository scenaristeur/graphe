importScripts('Triplet.js');



onmessage = function(e) {
  console.log('Message received from main script');
  var jsonTriplets=e.data[0];
  var triplets = e.data[1];
  var noeuds = e.data[2];
  console.log(paramSujet);
console.log(paramPropriete);
console.log(paramObjet);

  for  (var i=0; i< jsonTriplets.length;i++){
    var jsonTriplet = jsonTriplets[i];
    var sujetTemp;
    var propTemp;
    var objetTemp;
    if(typeof jsonTriplet.Sujet.value == "undefined"){
      sujetTemp = paramSujet;
    }else{
      sujetTemp = jsonTriplet.Sujet.value;
    }
    if(typeof propTemp == "undefined"){
      propTemp = paramPropriete;
    }else{
      propTemp = jsonTriplet.Predicat.value;
    }
    if(typeof objetTemp == "undefined"){
      objetTemp = paramObjet;
    }else{
      objetTemp = jsonTriplet.Objet.value;
    }
    var triplet = new Triplet(sujetTemp,propTemp,objetTemp);
    triplets.push(triplet);
  }
  console.log(i+"/"+jsonTriplets.length);
  console.log('Posting message back to main script');
  postMessage(triplets);
}
