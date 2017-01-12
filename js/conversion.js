function data2Xml( _dataString) {
    //FICHIERS OWL
    var dataString=_dataString;
    console.log(dataString);
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(dataString, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(dataString);
    }
    console.log(xmlDoc);
    createTableauxXml(xmlDoc);
}

function rdf2Xml2(_dataString){
  //console.log(_dataString);
  loadStrings(_dataString,traiteRDFLignes,erreurRDFLignes);
}

function traiteRDFLignes(lignes){
  console.log(lignes[0]);
    var lignesString=lignes.join("\n");
  if(lignes[0].startsWith('@prefix ')){
    console.log("PREF");
    ttl2Xml(lignesString);
  }else{


    console.log(lignesString);
    console.log(lignesString.length);
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(lignesString, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(lignesString);
    }
    console.log(xmlDoc.childNodes);


        for(var i = 0; i< xmlDoc.childNodes.length; i++){
            var element = xmlDoc.childNodes[i];
            //    console.log(element);
            var name = element.nodeName;
            var type = element.nodeType;
            var value = element.nodeValue;

            switch(type){
                case 1 :
                parseRdfNode(element);
                break;
                case 8 :
                //   console.log("Commentaire");
                //   console.log(element);
                break;
                case 10 :
                //   console.log("DOCTYPE");
                //   console.log(element);
                break;
                default :
                console.log("non traite 1 , type : "+type);
                console.log(type +" "+name+" "+value);
                console.log(element);
                break;
            }
        }
        console.log(triplets2add);
      //  triplets2links(triplets);
      //  updateAttractions();
      }
}

function erreurRDFLignes(data){
  console.log(data);
}





function rdf2Xml(_dataString){
    console.log( "DEPART RDF");
    var dataString=_dataString;
     console.log(dataString);
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(dataString, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(dataString);
    }
    console.log(xmlDoc.childNodes);

    for(var i = 0; i< xmlDoc.childNodes.length; i++){
        var element = xmlDoc.childNodes[i];
        //    console.log(element);
        var name = element.nodeName;
        var type = element.nodeType;
        var value = element.nodeValue;

        switch(type){
            case 1 :
            parseRdfNode(element);
            break;
            case 8 :
            //   console.log("Commentaire");
            //   console.log(element);
            break;
            case 10 :
            //   console.log("DOCTYPE");
            //   console.log(element);
            break;
            default :
            console.log("non traite 1 , type : "+type);
            console.log(type +" "+name+" "+value);
            console.log(element);
            break;
        }
    }
}

function parseRdfNode(data){
    var parsingMethod=["owl","rdf"];
    var pMi=0; //Parsing Method indice owl /rdf...
    var ontologie="";
    var title="";
    var description="";
    var classes=[];
    var namedIndividuals=[];
    var objectProperties=[];
    var datatypeProperties=[];
    var comments=[];
    console.log(data.childNodes);
    for(var i = 0; i< data.childNodes.length; i++){
        var element = data.childNodes[i];
        var name = element.nodeName;
        var type = element.nodeType;
        var value = element.nodeValue;


        switch(type){
            case 1 :
            switch (name){
                case "owl:Ontology" :
                try{
                    ontologie=element.getAttribute("rdf:about");
                    title=element.getAttribute("dc:title");
                    description=element.getAttribute("dc:description");
                }
                catch(err)
                {
                    pMi++;
                    console.log("changement parsing method : "+parsingMethod[pMi]+" "+err);
                    element.attributes["rdf:about"].nodeValue;

                }

                console.log(ontologie);

                break;
                case "owl:AnnotationProperty" :
                console.log(type +" "+name+" "+value);
                console.log(element);
                console.log("non traite 7 ");
                break;
                case "owl:Class" :
                // console.log(type +" "+name+" "+value);
                // console.log("non traite 8 ");
                // console.log(element);
                parseRdfsClass(element);
                break;
                case "rdfs:Class" :
                parseRdfsClass(element);
                break;
                case "rdf:Property" :
                console.log(type +" "+name+" "+value);
                console.log(element);
                console.log("non traite 5 ");
                break;
                case "owl:ObjectProperty" :
                // console.log(type +" "+name+" "+value);
                // console.log("non traite 4 ");
                // console.log(element);
                parseObjectProperty(element);
                break;
                case "owl:DatatypeProperty" :
                console.log(type +" "+name+" "+value);
                console.log("non traite 9 ");
                console.log(element);
                break;

                case "owl:NamedIndividual" :
                // console.log(type +" "+name+" "+value);
                // console.log("non traite 8 ");
                // console.log(element);
                parseOwlNamedIndividual(element);
                break;
                default :
                console.log("non traite 3 , name : "+name);
                console.log(type +" "+name+" "+value);
                console.log(element);
                break;



            }
            break;
            case 3 :
            if(value.trim() != ""){
                console.log(type +" "+name+" "+value);
            }
            break;
            case 8 :
            // console.log("Commentaire");
            // console.log(element);
            break;
            default :
            console.log("non traite 2 , type : "+type);

            console.log(type +" "+name+" "+value);
            console.log(element);
            break;
        }



    }

    console.log(ontologie);
    console.log(title);
    console.log(description);
}


function parseObjectProperty(data){
    var propertyUri=data.getAttribute("rdf:about");
    var propertyLabel=data.getAttribute("rdfs:label");
    var propertyComment=data.getAttribute("rdfs:comment");
    var laClasse=data.nodeName;

    if (propertyUri.indexOf("#")>0){
        sujetPrefix=propertyUri.split("#")[0];
        sujet=propertyUri.split("#")[1];
    }
    if (laClasse.indexOf(":")>0){
        objetPrefix=laClasse.split(":")[0];
        objet=laClasse.split(":")[1];
    }

    if (data.childNodes.length>0){
        for(var i = 0; i< data.childNodes.length; i++){
            var element = data.childNodes[i];
            var nodeType= element.nodeType;
            console.log(element);
            var propriete=element.localName;
            if (nodeType==1){
                console.log(sujet+" "+propriete+" "+objet);
              //  var newStatement = new Statement(sujet, propriete,objet);
              //  newStatement.add2Statements();
              var triplet = new Triplet(sujet, propriete,objet);
              triplets2add.push(triplet);
            }
        }
    }

}

function parseOwlNamedIndividual(data){
    //  console.log("-----------------------------\n--------------------\n");
    //  console.log(data);
    var individualUri=data.getAttribute("rdf:about");
    var individualLabel=data.getAttribute("rdfs:label");
    var individualComment=data.getAttribute("rdfs:comment");
    var laClasse=data.nodeName;
    // console.log(data.childNodes);
    //  console.log("traitement de "+individualUri);

    if (individualUri.indexOf("#")>0){
        sujetPrefix=individualUri.split("#")[0];
        sujet=individualUri.split("#")[1];
    }
    if (laClasse.indexOf(":")>0){
        objetPrefix=laClasse.split(":")[0];
        objet=laClasse.split(":")[1];
    }
    // creation du sujet en tant qu'individual
    //  var newStatement = new Statement(sujet, "type", laClasse);
    //  newStatement.add2Statements();

    if (data.childNodes.length>0){
        for(var i = 0; i< data.childNodes.length; i++){
            var element = data.childNodes[i];
            var nodeType= element.nodeType;

            if (nodeType!=3){
                //   console.log(element);
                var propriete=element.localName;
                var objetInside="";
                if (typeof element.attributes["rdf:resource"] !="undefined"){
                    objetInside=element.attributes["rdf:resource"].value;
                    var objetInsidePrefix="";
                    if (objetInside.indexOf("#")>0){
                        objetInsidePrefix=objetInside.split("#")[0];
                        objetInside=objetInside.split("#")[1];
                    }
                    }else{
                    objetInside=element.innerHTML;
                }
                console.log(sujet+" "+propriete+" "+objetInside);
              //  var newStatement = new Statement(sujet, propriete, objetInside);
              //  newStatement.add2Statements();
              var triplet = new Triplet(sujet, propriete,objetInside);
              triplets2add.push(triplet);
            }
        }
    }
}

function parseRdfsClass(data){
    //  console.log("-----------------------------\n--------------------\n");
    //  console.log(data);
    var classUri=data.getAttribute("rdf:about");
    var classLabel=data.getAttribute("rdfs:label");
    var classComment=data.getAttribute("rdfs:comment");
    var laClasse=data.nodeName;
    //  console.log(data.childNodes);
    if (data.childNodes.length>0){
        for(var i = 0; i< data.childNodes.length; i++){
            var element = data.childNodes[i];
            var name = element.nodeName;
            var localName= element.localName;
            var type = element.nodeType;
            var innerhtml=element.innerHTML;
            var value = element.nodeValue;
            var statementSujet="";
            var statementPropriete="";
            var statementObjet="";


            switch(type){
                case 1 :
                if ((typeof classLaber != "undefined") && (classLabel!="")&&(classLabel.trim()=="")){
                    statementSujet=classLabel ;
                    }else{
                    statementSujet=classUri;
                }
                statementPropriete=localName;
                statementObjet=innerhtml;
                console.log(statementSujet+" -> "+statementPropriete+" -> "+statementObjet);
              //  var newStatement = new Statement(statementSujet, statementPropriete,statementObjet);
              //  newStatement.add2Statements();
                var triplet = new Triplet(statementSujet, statementPropriete,statementObjet);
                triplets2add.push(triplet);
                break;
                case 3 :
                if(value.trim() != ""){
                    console.log(type +" "+name+" "+value);
                }
                break;
                // case 8 :
                // console.log("Commentaire");
                // console.log(element);
                // break;
                default :
                console.log("non traite 4 , type : "+type);
                console.log(type +" "+name+" "+value);
                console.log(element);
                break;
            }
        }
    }
    else{
        //  console.log("traitement de "+classUri);
        var sujet ="";
        var sujetPrefix = "";
        var objet="";
        var objetPrefix="";
        var propriete = "type";
        if (classUri.indexOf("#")>0){
            sujetPrefix=classUri.split("#")[0];
            sujet=classUri.split("#")[1];
        }
        if (laClasse.indexOf(":")>0){
            objetPrefix=laClasse.split(":")[0];
            objet=laClasse.split(":")[1];
        }
        console.log(sujet+" "+propriete+" "+objet);
      //  var newStatement = new Statement(sujet, propriete,objet);
      //  newStatement.add2Statements();
      var triplet = new Triplet(sujet, propriete,objet);
      triplets2add.push(triplet);
    }
    console.log(triplets2add);

}


function createTableauxXml(_xml){
    var xmlDoc=_xml;
    var entete=xmlDoc.childNodes[0];
    var rdf=xmlDoc.childNodes[1];
    var commentaires=xmlDoc.childNodes[2];

    var ontologie="";
    var classes=[];
    var namedIndividuals=[];
    var objectProperties=[];
    var datatypeProperties=[];
    var comments=[];

    for(var i = 0; i< rdf.childNodes.length; i++){
        var element = rdf.childNodes[i];
        var name=element.nodeName;




        switch(name){
            case "owl:Ontology" :
            ontologie=element.getAttribute("rdf:about");
            break;
            case "owl:Class" :
            console.log("classe");
            classes.push(element);
            break;
            case "owl:NamedIndividual" :
            console.log("namedIndividual");
            namedIndividuals.push(element);
            break;
            case "owl:ObjectProperty" :
            console.log("objectProperties");
            objectProperties.push(element);
            break;
            case "owl:DatatypeProperty" :
            console.log("datatype");
            datatypeProperties.push(element);
            break;
            case "#comment" :
            console.log("comment");
            comments.push(element);
            break;
            default :
            // console.log("non g�r� :");
            // console.log(element);
            break;
        }

    }



    Xml2Noeuds(ontologie, "ontologie");
    Xml2Noeuds(classes, "classe");
    Xml2Noeuds(namedIndividuals, "individual");
    Xml2Noeuds(objectProperties, "propriete");
    //Xml2Noeuds(datatypeProperties, "propriete");
    Xml2Noeuds(comments, "comment");
}


function Xml2Noeuds( _datas,  _type) {
    var datas=_datas;
    var type=_type;
    console.log(type);
    console.log(datas);

    for (var i = 0; i < datas.length; i++) {

        var data = datas[i];



        if (type=="individual") {
            //  console.log(data);
            console.log(" ");
            var about=data.getAttribute("rdf:about");
            var easyCutS=about.split('#');
            var sujetPrefix=easyCutS[0];
            var sujetLocalName=easyCutS[1];
            //    console.log("r�cup�ration des propri�t�s de "+sujetLocalName);
            //recuperation des proprietes
            var proprietes=data.childNodes;
            for (var j=0; j<proprietes.length; j++) {
                var proprieteXml=proprietes[j];
                if (proprieteXml.nodeType==1){
                    console.log(proprieteXml);
                    var prop=proprieteXml.nodeName;
                    var objetUri=proprieteXml.getAttribute("rdf:resource");


                    if (prop.indexOf(":") > -1){
                        console.log("coupe "+ prop);
                        var easyCutP=prop.split(':');
                        var propPrefix=easyCutP[0];
                        var propLocalName=easyCutP[1];
                        prop=propLocalName;
                    }

                    var objet="";

                    if((typeof objetUri != 'undefined')&&(objetUri!=null)){
                        var easyCutO=objetUri.split('#');
                        var objetPrefix=easyCutO[0];
                        objetLocalName=easyCutO[1];
                        objet=objetLocalName;
                    }
                    else{

                        objet=proprieteXml.firstChild.nodeValue;
                    }


                    console.log(sujetLocalName+" -> "+prop+" -> "+objet);
                  //  var newStatement = new Statement(sujetLocalName, prop,objet);
                //    newStatement.add2Statements();
                var triplet = new Triplet(sujet, propriete,objet);
                triplets2add.push(triplet);

                }
            }
            /* String about =data.attributes[0].value;
                String[] easyCut  = split(about, '#');
                String sujetPrefix=easyCut[0];
                String sujetLocalName=easyCut[1];
                //   console.log("r�cup�ration des propri�t�s de "+sujetLocalName);

                //r�cup�ration des propri�t�s
                XML[]proprietes=data.getChildren();
                // console.log(children);
                for (int j=0; j<proprietes.length; j++) {
                XML [] proprieteXml=proprietes[j];
                //  console.log(proprieteXml);
                String proprieteString=proprieteXml.fullName;
                //  console.log("prop ="+proprieteString);
                if (proprieteString) {
                if (proprieteXml.attributes[0]) {
                String objetUri= proprieteXml.attributes[0].value;
                //   console.log(proprieteXml.fullName+" "+objetUri);
                String[] easyCut  = split(objetUri, '#');
                String objetPrefix=easyCut[0];
                String objetLocalName=easyCut[1];
                //  ajouteInformation(sujetLocalName, proprieteString, objetLocalName);
                Array<String> infoAAjouter= new String[3];
                infoAAjouter[0]=sujetLocalName;
                infoAAjouter[1]=proprieteString;
                infoAAjouter[2]=objetLocalName;
                infosAAjouter.add(infoAAjouter);
                // console.log(infosAAjouter.size());
                var divMessage=document.getElementById("divMessage");
                divMessage.innerHTML= "DV3"+infosAAjouter.size();
                } else {
                console.log("descendre encore d'un niveau");
                }
                //  console.log("--->"+child.attributes[0].value);
                } else {
                //  console.log("fullname non trouv� "+child);
                }
                }
            */

















            //   console.log(localName);
            /*   int nx=random(width);
                int ny = random(height);
                Noeud noeud=new Noeud(localName, nx, ny);
                noeud.prefix=prefix;
                noeud.type=type;
            noeuds.add(noeud);*/
            /*  Noeud  nouveauNoeud=new Noeud(massDefaut);
                nouveauNoeud.setUriCourte(localName);
                nouveauNoeud.setPrefix(prefix);
            physics.particles.add(nouveauNoeud);*/
        }


        // console.log(type);
        // r�cup�rer les liens de chaque Noeud
        /*  if (type.equals("individual")) {
            console.log("-------------------------------------------------------Individuel" +localName);
            XML[]children=data.getChildren();
            for (int j=0; j<children.length; j++) {
            XML [] child=children[j];
            if (child.fullname) {
            console.log(child.fullname);
            console.log(child);
            //  console.log("--->"+child.attributes[0].value);
            } else {
            //  console.log("fullname non trouv� "+child);
            }
            }
            }
        */

        /*
            // get children
            if (type.equals("propriete")) {
            console.log("-------------------------------------------------------propri�t�" +localName);
            XML[]children=data.getChildren();
            for (int j=0; j<children.length; j++) {
            XML [] child=children[j];
            if (child.fullname) {
            console.log(child.fullname);
            //  console.log("--->"+child.attributes[0].value);
            } else {
            //  console.log("fullname non trouv� "+child);
            }
            }
        }*/
    }
}

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}



function ttl2Xml( _dataString){
    //FICHIERS TTL , N3, N3T
    //   console.log(_dataString);
    var prefixes=[];
    var base="";
    var separateur="";
    var lignes=_dataString.split("\n");
    for (var i=0; i<lignes.length; i++){
        var ligne=lignes[i];
        //  console.log("--> "+ligne);
        if (ligne.startsWith("@prefix ")) {

            var lignePrefix=ligne.split("@prefix ");
            var lignePrefixCuted=lignePrefix[1].split(": ");
            var prefix=lignePrefixCuted[0].trim();
            var vpWithPoint=lignePrefixCuted[1].trim();
            var valeurPrefix = vpWithPoint.substring(0, vpWithPoint.length-1).trim();
            console.log(prefix+" --> "+valeurPrefix);

            if(prefix==""){
                prefix=":";
            }
            prefixes.push(prefix, valeurPrefix);

        }
        else if (ligne.startsWith("@base ")) {
            // console.log(ligne);
            base=ligne.split("@base ")[1].trim();
            base=base.substring(0, base.length-1).trim();
            // console.log("BASE => "+base);
            }else {
            ligne=ligne.trim();
            var ligneSplit=ligne.split(" ");

            if(ligneSplit.length>1){
                console.log(ligneSplit.length);
                console.log(ligneSplit);

                var ligneValide=false;
                switch(ligneSplit.length) {
                    case 5:
                    console.log("A g�rer, import avec graphe ?");
                    ligneValide=false;
                    break;
                    case 4:
                    sujet=ligneSplit[0];
                    propriete=ligneSplit[1];
                    objet=ligneSplit[2];
                    separateur=ligneSplit[3];
                    ligneValide=true;
                    break;
                    case 3 :
                    if (separateur==";") {
                        propriete=ligneSplit[0];
                        objet=ligneSplit[1];
                        separateur=ligneSplit[2];
                        ligneValide=true;
                        } else {
                        ligneValide=false;
                        console.log("PB avec ligneSplit 3");
                    }
                    break;
                    case 2:
                    if (separateur==",") {
                        objet=ligneSplit[0];
                        separateur=ligneSplit[1];
                        ligneValide=true;
                        } else {
                        ligneValide=false;
                        console.log("PB avec ligneSplit2");
                    }
                    break;
                    case 1:
                    ligneValide=false;
                    console.log("un seul champ pour ligneSplit -> pas d'info");
                    break;
                    default :
                    ligneValide=false;
                    console.log("pb de ligne");
                    //   sketch.ajouteInformation("smag:"+sujet, "rdf:type", "smag:"+message);
                }
            }


            if (ligneValide) {
                if (sujet.indexOf(":")  == 0 ){
                    sujet=sujet.substring(1);
                }
                if (propriete.indexOf(":")  == 0 ){
                    propriete=propriete.substring(1);
                }
                if (objet.indexOf(":")  == 0 ){
                    objet=objet.substring(1);
                }

                console.log(" => "+sujet+" "+propriete+" "+objet);
                //ajouteInformation(sujet, propriete, objet);
              //  var newStatement = new Statement(sujet, propriete,objet);
              //  newStatement.add2Statements();
              var triplet = new Triplet(sujet, propriete,objet);
              triplets2add.push(triplet);
            }
            ligneValide=false;
        }

    }
    console.log(triplets2add);
  //  triplets2links(triplets);
  //  updateAttractions();
}






/*
    function ttl2Xml( _dataString) {
    HashMap<String, String> prefixes=new HashMap();
    String base=new String();
    console.log(_dataString);
    String[] lignes=_dataString.split("\n");
    String sujet=new String();
    String propriete=new String();
    String objet=new String();
    String separateur=new String();
    for (String ligne : lignes) {

    if (ligne.startsWith("@prefix ")) {
    String[] lignePrefix=ligne.split("@prefix ");
    String[] lignePrefixCuted=lignePrefix[1].split(": ");
    String prefix=trim(lignePrefixCuted[0]);
    String vpWithPoint=trim(lignePrefixCuted[1]);
    String valeurPrefix = trim(vpWithPoint.substring(0, vpWithPoint.length-1));
    if (prefix.equals("")) {
    prefix=":";
    }
    prefixes.put(prefix, valeurPrefix);
    // console.log(prefixes);
    //  console.log("PREFIX :\n\t "+prefix+"\t"+valeurPrefix);
    } else if (ligne.startsWith("@base ")) {
    // console.log(ligne);
    base=trim(ligne.split("@base ")[1]);
    base=trim(base.substring(0, base.length-1));
    // console.log("BASE => "+base);
    } else {
    ligne=trim(ligne);
    String[] ligneSplit=ligne.split(" ");
    console.log(ligneSplit.length);
    console.log(ligneSplit);
    Boolean ligneValide=false;
    switch(ligneSplit.length) {
    case 5:
    console.log("A g�rer, import avec graphe ?");
    ligneValide=false;
    break;
    case 4:
    sujet=ligneSplit[0];
    propriete=ligneSplit[1];
    objet=ligneSplit[2];
    separateur=ligneSplit[3];
    ligneValide=true;
    break;
    case 3 :
    if (separateur=";") {
    propriete=ligneSplit[0];
    objet=ligneSplit[1];
    separateur=ligneSplit[2];
    ligneValide=true;
    } else {
    ligneValide=false;
    console.log("PB avec ligneSplit 3");
    }
    break;
    case 2:
    if (separateur=",") {
    objet=ligneSplit[0];
    separateur=ligneSplit[1];
    ligneValide=true;
    } else {
    ligneValide=false;
    console.log("PB avec ligneSplit2");
    }
    break;
    case 1:
    ligneValide=false;
    console.log("un seul champ pour ligneSplit -> pas d'info");
    break;
    default :
    ligneValide=false;
    console.log("pb de ligne");
    //   sketch.ajouteInformation("smag:"+sujet, "rdf:type", "smag:"+message);
    }

    if (ligneValide) {
    console.log("Ajoute => "+sujet+" "+propriete+" "+objet);
    ajouteInformation(sujet, propriete, objet);
    }
    ligneValide=false;
    }
    }
    // fin du traitement des lignes
    //--> traitement des maps cr��es
    for (String key : prefixes.keySet ())
    {
    console.log(key + " -> " + prefixes.get(key));
    }
    console.log("BASE => "+base);
    }

    function owl2xml(String owlFile) {
    //deuxi�me m�thode pour charger un owl/xml
    xml = new XMLElement(this, owlFile);
    createTableauxXml(xml);
    }


    void createTableauxXml(XML[] _xml) {
    console.log(_xml.getChildCount());
    // if (debug) {
    int enfants = _xml.getChildCount();
    console.log(enfants+" enfants dans le fichier charg�");
    for (int i = 0; i < enfants; i++) {

    XMLElement kid = _xml.getChild(i);
    // console.log(kid.getName());
    //    console.log(kid);
    }
    //}
    ontologie=_xml.getChildren("owl:Ontology");
    classes=_xml.getChildren("owl:Class");
    individuals=_xml.getChildren("owl:NamedIndividual");
    proprietes=_xml.getChildren("owl:ObjectProperty");
    comments=_xml.getChildren("#comment");

    Xml2Noeuds(ontologie, "ontologie");
    Xml2Noeuds(classes, "classe");
    Xml2Noeuds(individuals, "individual");
    Xml2Noeuds(proprietes, "propriete");
    Xml2Noeuds(comments, "comment");
    }
*/
