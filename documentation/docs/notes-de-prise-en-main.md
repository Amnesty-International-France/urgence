---
title: Notes de prise en main
slug: notes-de-prise-en-main
date: 2023-03-26T13:14:34Z
draft: false
weight: 3
summary: "Notes et réflexions sur le projets suite à la reprise en main de la base de code par Incaya."
---

Incaya a été mandaté par Amnesty en mars 2023 pour reprendre en main la base de code du projet Actions Urgentes afin d'en assurer sa maintenance. Ce document est une trace des notes et des remarques notables émises lors de la découverte de cette base de code legacy.

## Architecture globale du projet

Ce qui ressort de manière forte de l'analyse de l'architecture globale du projet, c'est l'inadéquation entre la simplicité des fonctionnalités du projet et les solutions techniques choisies pour les mettre en oeuvre.

En effet, le projet consiste à gérer un objet métier finalement assez simple, les actions urgentes, puisque constituées de contenus éditoriaux (du texte parfois formaté en HTML et des images) et d'un identifiant technique les reliant au Salesforce Amnesty. 

Il s'agit ensuite d'afficher sur le site public une seule de ces actions, celle déclarée comme action par défaut en fonction d'un flag activé manuellement, et d'afficher un lien `mailto` à l'utilisateur.

Le modèle de la base de données confirme cette simplicité :

![Le modèle de base de données](modelActionUrgente.png)

**Face à cela, les outils et l'organisation du projet mis en place sont très performants, mais sont plutôt prévus pour répondre à des projets d'envergure avec beaucoup plus de complexité métiers** :
- une API en GraphQL dont le point fort est d'éviter les problèmes de retour de données insuffisants (under-fetching) ou surnuméraires (over-fetching). Dans le cas d'A.U. ce problème ne se pose pas vu la simplicité des données.
- des composants visuels isolés dans un module à la manière d'un design system. La complexité induite par cela (comme l'utilisation d'un monorepos ou la mise en place d'un storybook) nous semble inadaptée à la gestion de 3 composants React uniquement utilisés sur le projet A.U. et partagés entre l'administration et le site publique pour faire une simple prévisualisation.
- une base de données PostgreSQL sollicitée pour gérer 4 tables contenant pour les tables métiers une trentaine d'enregistrements.

Cette stack technique répond au besoin actuel et permettrait sans doute de faire énormément évoluer le projet en complexité métier.Si ce besoin devait être exprimé. 

Mais en l'état, il induit selon nous plus désavantages que d'atouts :

- **Des difficultés à entrer sur le projet**. Il nous a fallu beaucoup (trop) de temps pour comprendre la simplicité du besoin derrière la complexité technique. Cela est d'autant plus vrai que le projet n'était pas documenté (aucune information claire concernant Salesforce par exemple). Ceci est en partie résolu puisque nous avons documenté au fil de la prise en main. Mais le projet requiert cependant toujours une bonne expérience technique de la part du développeur, ou alors un temps de montée en compétences.
- **Une augmentation du temps d'intervention** : plus de complexité équivaut immanquablement à plus de code, et donc à plus de temps pour intervenir sur la bonne partie de code. Cette remarque est cependant à modérer par le fait que le code legacy est de qualité et bien découpé.
- **Un cout de maintenance plus élevé. C'est sans doute le principal problème du projet**. Prenons l'exemple du GraphQL. Si ce choix d'architecture d'API nous semble être comparable au choix d'une moissonneuse pour tondre son jardin, il répond au besoin. Mais choisir GraphQL, c'est aussi ajouter **une quinzaine de dépendances au projet**. Mais plus un projet va posséder de dépendances, plus il va demander une maintenance régulière : ces dépendances vont par exemple présenter des failles de sécurité, ou alors évoluer très rapidement (ce qui est particulièrement vrai dans le monde du JavaScript) en imposant ce qu'on appelle des breaking changes (c'est-à-dire des nouvelles versions imposant de reprendre le code pour fonctionner). La maintenance d'Action Urgente n'ayant visiblement pas été faite régulièrement, cela confère **une certaine fragilité au projet**. Aujourd'hui, on ne peut pas opérer de mise à jour de toutes les dépendances sans tout casser. Et certaines dépendances ne sont même plus maintenues ...
- **Une évolution plus compliquée**, en grande partie due aux problèmes de dépendances précédemment vus.
- **Un déploiement plus complexe et plus lent**, puisqu'il faut déployer deux projets (le backend avec son interface d'administration et l'application publique), chacun réclamant des processus de construction spécifique.
- **Un coût d'hébergement plus élevé** puisque le projet est actuellement composé de deux applicatif et d'une base de données.
- **Une écoconception relative** : plus le projet va être complexe et possédera de dépendances, plus le coût énergétique global sera élevé : téléchargements plus conséquents, espace disque plus important sur les environnements d'intégration continue, ressources processeurs nécessaires pour générer les builds finaux ...

## Première tentative de simplification

Rapidement confrontés à la complexité de l'architecture, nous avons voulu expérimenter lors de la prise en main du code une migration vers [Next.js](https://nextjs.org/). **L'objectif principal était de ne plus avoir à gérer qu'une seule et même application.**

Si ce choix de Next.js est contestable (Next.js étant lui-même une grosse dépendance laissant entrevoir [dès maintenant des breaking changes](https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app)), cela nous a tout de même permis de rentrer dans le coeur de projet, et de confirmer ou d'infirmer certaines hypothèses.

Tout d'abord, **le passage de GraphQL à une API Rest ne serait pas problématique**. Les règles métier sont simples et bien isolées dans le code. L'avantage de ce changement d'API est de supprimer un grand nombre de dépendances, la mise en place d'une API étant possible *nativement* avec Express.js.

Ensuite, **l'adaptation du code de react-admin ne pose pas non plus de problème** majeur, puisqu'il a suffi de changer son *dataProvider* pour migrer de l'API GraphQL à l'API REST. De plus, l'utilisation d'une application react-admin au sein d'une application Next.js [ne pose pas de problème](https://marmelab.com/react-admin/NextJs.html).

**Le problème est venu de l'application publique construite comme une single page app (SPA).** Le travail permettant de migrer de GraphQL à REST est plus délicat que pour l'administration, mais le principal frein a été de rendre compatible cette SPA s'appuyant sur le composant *react-router* avec l'approche [server side rendering](https://www.theodo.fr/digital-et-strategie/server-side-rendering-seo-performance) (SSR) de Next.js reposant sur sa propre brique de routing.

**Nous n'avons donc pas continué sur cette voie, le temps nous manquant pour faire une migration sans risque de régressions.**

## Interventions à prévoir

Si les notes précédentes pointent les problèmes, **la base de code actuelle n'en reste pas moins parfaitement fonctionnelle**. Si elle nous semble améliorable, le coût de ces améliorations techniques serait selon nous injustifié tant que le périmètre fonctionnel n'évolue pas de façon majeure. **Et surtout ce coût ne compenserait pas le surcoût de maintenance précédemment évoqué.**

Mais nous avons tout de même relevé quelques points qu'il nous semblerait important d'adresser dans le cadre de la maintenance.

### Compteur de taille de lien mailto

En fait, il ne s'agit pas ici d'un point que nous avons nous-mêmes relevé, mais d'un problème soulevé directement par l'équipe d'Amnesty.

Le problème régulièrement relevé concerne donc le lien permettant d'ouvrir le client email de l'utilisateur de site avec l'email prérempli (le lien `mailto`). Sous certaines conditions, ce lien ne fonctionne pas.

Ce problème a déjà été traité et il semble effectivement qu'une limitation de taille de ce lien s'impose dans certaines conditions (par exemple depuis Chrome sous Windows avec un client mail Outlook). Dans ce cas, la solution est de limiter la taille du lien à 2000 caractères. 

Un compteur de caractère indiquant cette limite de 2000 à donc été mis en place sur l'éditeur du texte d'email sur l'interface d'administration.

![Compteur mailto](bugMailto.png)

Mais ce compteur ne prend en compte que le corps du mail. Or la longueur de lien mailto va dépendre du corps du texte traité pour être mis dans une URL, mais aussi les emails des destinataires ainsi que le sujet du mail.

**Nous proposons donc de revoir le compteur de caractères de l'interface d'administration pour qu'il prenne en compte tous ces paramètres.**

### Clarification du formulaire d'administration des actions

L'interface de création et d'édition d'une action est riche. Tellement riche qu'elle nous semble cruellement manquée d'ergonomie. 

**Nous proposons donc d'améliorer l'ergonomie de cette interface.**

![Proposition clarification formulaire](propalFormAction.jpg)

### Optimisation du formulaire d'administration des actions

Outre son ergonomie contestable, il apparait que le formulaire de création/édition d'une action est des problèmes de réactivité.

Ceci s'explique principalement par le grand nombre d'éditeurs WYSIWYG ouverts sur une page unique.

Si cette lenteur est problématique pour les éditeurs des actions, nous proposons deux pistes afin d'améliorer la réactivité du formulaire.

1. Une première piste consisterait à découper le formulaire en plusieurs étapes indépendantes les unes des autres. Mais cette piste obligera à également travailler sur react-admin qui ne gère pas cela nativement.
2. Une autre piste consisterait à supprimer les éditeurs WYSIWYG et de laisser les éditeurs ajouter le balisage HTML eux-mêmes (les besoins de balisage étant très simples), ou alors via un balisage simplifié comme le [Markdown](https://fr.wikipedia.org/wiki/Markdown)

### Remise en place des teste e2e

Lors de la reprise en main de la base de code, les tests e2e (les tests de bout en bout, c'est à dire ceux simulant intégralement un parcours utilisateur en pilotant un navigateur) étaient désactivés. Et effectivement, ils provoquent des erreurs lorsque nous les réactivons.

**Nous voudrions donc remettre en place ces tests afin qu'ils valident l'état actuel de l'application. Ce sera aussi l'occasion de mettre à jour les outils utilisés pour gérer ces tests (passage à Cypress.io), car ceux utilisés sont vieillissants (Selenium).**

### Suppression du code mort

Il semble que les spécifications d'A.U. est évoluées au cours du temps, mais que le code utilisé pour d'anciennes fonctionnalités n'a pas été supprimé. **Nous aimerions supprimer ce code *mort* au moins pour les fonctionnalités suivantes** :

- génération d'une lettre en PDF
- envoie de ce PDF en pièce jointe d'un email envoyé depuis A.U. (via Mailgun),
- maintient d'un [storybook](https://storybook.js.org/) pour certain composant visuel du front

### Utilisation des identifiants Salesforce plutôt que des codes

Lors de la création d'une action, l'utilisateur doit renseigner un `campaign_code` afin de faire la liaison en cette action et Salesforce. (voir [la documentation sur Salesforce](/docs/salesforce/))

Mais lors de nos échanges avec l'équipe en charge du Salesforce d'Amnesty, il apparait que ce code peut être modifié par l'utilisateur. C'est donc un risque pour la cohérence d'une campagne d'alerte.

**Nous proposons de mettre à jour le code afin que les références à Saleforce soient faites depuis un identifiant (id) stable plutôt que depuis un code modifiable du côté Salesforce.**
