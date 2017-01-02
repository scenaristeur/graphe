importScripts('Triplet.js');



onmessage = function(e) {
  console.log('Message received from main script');
  var jsonTriplets=e.data[0];
  var triplets = e.data[1];
  var noeuds = e.data[2];
  for  (var i=0; i< jsonTriplets.length;i++){
    var jsonTriplet = jsonTriplets[i];
    var sujetTemp = jsonTriplet.Sujet.value;
    var propTemp = jsonTriplet.Predicat.value;
    var objetTemp = jsonTriplet.Objet.value;
    var triplet = new Triplet(sujetTemp,propTemp,objetTemp);
    triplets.push(triplet);
  }
  console.log(i+"/"+jsonTriplets.length);
  console.log('Posting message back to main script');
  postMessage(triplets);
}
