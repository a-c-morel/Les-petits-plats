# Les petits plats
Bienvenue sur le projet 7 de ma formation OpenClassrooms "Développeur d'Application JavaScript REACT". Il s'agit d'une démo de site web fonctionnant avec un algorithme de filtrage :
L'utilisateur peut chercher une recette parmi les 50 de la base de données, en suivant les scénarios suivants :
## Scénario principal
1. Le cas d’utilisation commence lorsque l’utilisateur entre au moins 3 caractères dans la
barre de recherche principale.
2. Le système recherche des recettes correspondant à l’entrée utilisateur dans : le titre de
la recette, la liste des ingrédients de la recette, la description de la recette.
3. L’interface est actualisée avec les résultats de recherche.
4. Les champs de recherche avancée sont actualisés avec les informations ingrédients,
ustensiles, appareil des différentes recettes restantes
5. L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles,
appareil.
6. Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le
champ disparaissent. Par exemple, si l’utilisateur entre “coco” dans la liste d’ingrédients,
seuls vont rester “noix de coco” et “lait de coco”.
7. L’utilisateur choisit un mot clé dans le champ.
8. Le mot clé apparaît sous forme de tag sous la recherche principale.
9. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les
champs de recherche avancée.
10. L’utilisateur sélectionne une recette.
## Scénario alternatif 1
Aucune recette correspondante à la recherche. L'enchaînement A1 commence au point 3 du scénario nominal :
3. L’interface affiche « Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.
## Scénario alternatif 2
L’utilisateur commence sa recherche par un tag. L'enchaînement A2 commence au point 1 du scénario nominal et reprend au point 9 du scénario nominal :
1. L’utilisateur commence la recherche par un tag.
2. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les
champs de recherche avancée (9 du cas principal)
## Scénario alternatif 3
L’utilisateur ajoute d’autres tags pour la recherche avancée. L'enchaînement A3 commence au point 9 du scénario nominal. Cet enchaînement peut se répéter autant que nécessaire :
10. L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles,
appareil.
11. Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans
le champ disparaissent.
12. L’utilisateur choisit un mot clé dans le champ.
13. Le mot clé apparaît sous forme de tag sous la recherche principale.
14. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les
champs de recherche avancée.
***
Le but de ce projet est de tester 2 versions afin de déterminer quelle méthode entre l'utilisation des boucles natives for et filter() en JavaScript est la plus performante. Mon hypothèse de départ était que la méthode filter() serait la plus optimale, avec l'idée qu'elle est "faite pour cette utilisation", mais pour l'instant, d'après mes recherches sur le sujet il semblerait que cela soit plus complexe que ça et qu'il est même possible que l'inverse soit vrai.
Je suis actuellement sur la fin de la version 1, celle qui utilise les boucles for et ne fait pas appel à filter() : je vais ensuite créer une nouvelle branche sur le repository afin de développer la version 2, celle qui utilise filter().
