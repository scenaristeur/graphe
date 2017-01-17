":graphe"
L'interface la plus simple pour visualiser et gérer des bases de connaissance au format RDF.



[DEMO](https://scenaristeur.github.io/graphe/)

 # url parametree, exemple with parametrized url :
 
 https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Resource_Description_Framework
 
 
  https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Lyon
  
  
   https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Molière
   
   
    https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Arduino
 
 
 dbpedia n'étant pas encore en https, activez au bout de la barre d'adresse le chargement de script à risque (bouclier)





testé avec le navigateur Chrome v55


with P5JS in WEB-GL mode

todo : corriger la position de la souris en cas de translation

depuis le repertoire cloné, lancez un serveur web  selon votre version de python installée, comme décrit ici :

Python 2 :

```

python -m SimpleHTTPServer

```

ou Python 3 :

```

python -m http.server

```

