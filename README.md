":graphe"
L'interface la plus simple pour visualiser et gérer des bases de connaissance au format RDF.



- [DEMO](https://scenaristeur.github.io/graphe/)

 # url parametree, exemple with parametrized url :
 
  dbpedia n'étant pas encore en https, activez au bout de la barre d'adresse le chargement de script à risque (bouclier)
 
- Rdf :  https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Resource_Description_Framework
 
 
- Lyon : https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Lyon
  
  
- Ruillé-le-Gravelais : https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Ruillé-le-Gravelais
  
- Molière : https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Molière
   
   
- Arduino : https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Arduino


- Ville : https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/Ville
 
 


ou remplacez XXX par ce que vous voulez dans :

https://scenaristeur.github.io/graphe/?endpoint=http://fr.dbpedia.org/sparql&sujet=http://fr.dbpedia.org/resource/XXX

vous pouvez même remplacer la valeur de endpoint par votre endpoint préféré




testé avec le navigateur Chrome v55


with P5JS in WEB-GL mode

todo : corriger la position de la souris en cas de translation, clic sur noeud pour passer d'un noeud a l'autre.

depuis le repertoire cloné, lancez un serveur web  selon votre version de python installée, comme décrit ici :

Python 2 :

```

python -m SimpleHTTPServer

```

ou Python 3 :

```

python -m http.server

```

