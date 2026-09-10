import {L,localize} from './content/common.mjs';
// Short customer-facing copy. Research and source URLs stay in design/content/.
const profiles={
 kitepulsion:{
  intro:L('Du premier bord au freestyle. Le vent fait le reste.','From your first ride to freestyle. Let the wind do the rest.','Vom ersten Meter bis zum Freestyle. Der Wind macht den Rest.','De tu primer bordo al freestyle. El viento hace el resto.'),
  about:L('À La Franqui, Thomas Kraemer vous accompagne en petit groupe ou en cours privé. Du matériel, une radio et de l’espace pour progresser.','Join Thomas Kraemer at La Franqui for small-group or private lessons. Equipment, radio coaching and room to progress.','Kleine Gruppen oder Privatunterricht mit Thomas Kraemer in La Franqui. Ausrüstung, Funkbetreuung und Platz zum Lernen.','Aprende con Thomas Kraemer en La Franqui, en grupos pequeños o clases privadas. Equipo, radio y espacio para progresar.'),
  chips:['3 max','3 h','FR · EN · DE'],
  arrival:L('Les Coussoules, La Franqui. Rendez-vous communiqué la veille à 20 h selon le vent.','Les Coussoules, La Franqui. Meeting details arrive at 20:00 the evening before, depending on the wind.','Les Coussoules, La Franqui. Treffpunkt je nach Wind am Vorabend um 20 Uhr.','Les Coussoules, La Franqui. Encuentro comunicado a las 20 h del día anterior según el viento.'),
  prepare:L('Chaussons, protection solaire, eau. Combinaison sur demande. Licence/assurance FFVL obligatoire, en supplément.','Bring neoprene boots, sunscreen and water. Wetsuit on request. Compulsory FFVL licence/insurance costs extra.','Neoprenschuhe, Sonnenschutz und Wasser mitbringen. Anzug auf Anfrage. FFVL-Lizenz/Versicherung zusätzlich erforderlich.','Escarpines, protección solar y agua. Neopreno a petición. Licencia/seguro FFVL obligatorio, aparte.'),
  conditions:L('130 € hors juillet–août, 150 € en juillet–août. Report ou remboursement selon la météo et les conditions du stage.','€130 outside July–August; €150 in July–August. Weather postponements or refunds follow the course conditions.','130 € außerhalb Juli–August, sonst 150 €. Wetterbedingte Verschiebung oder Erstattung gemäß Kursbedingungen.','130 € fuera de julio–agosto; 150 € en julio–agosto. Aplazamiento o reembolso según meteorología y condiciones del curso.'),
 },
 'narbonne-kite-passion':{
  intro:L('Un lagon, votre aile, vos premiers vrais bords.','A lagoon, your own kite, your first real rides.','Eine Lagune, dein Kite, deine ersten Fahrten.','Una laguna, tu cometa, tus primeros bordos.'),
  about:L('Quatre élèves maximum, chacun son aile et sa radio. Accès en bateau sur l’étang de Bages, puis douche chaude à la base.','Four students at most, each with a kite and radio. Reach Étang de Bages by boat, then warm up with a hot shower.','Höchstens vier Schüler, eigener Kite und Funkgerät. Per Boot zum Étang de Bages, danach eine warme Dusche an der Basis.','Máximo cuatro alumnos, cada uno con cometa y radio. Acceso en barco al estanque de Bages y ducha caliente al volver.'),
  chips:['4 max','4 h','La Nautique'],
  arrival:L('La Nautique, rue des Nautiquards. Rendez-vous à 8h45 ou 13h45. Confirmez le point exact avec l’équipe.','La Nautique, rue des Nautiquards. Meet at 08:45 or 13:45. Confirm the exact meeting point with the team.','La Nautique, rue des Nautiquards. Treffen um 8:45 oder 13:45 Uhr. Genauen Treffpunkt mit dem Team klären.','La Nautique, rue des Nautiquards. Encuentro a las 8:45 o 13:45. Confirma el punto exacto con el equipo.'),
  prepare:L('Matériel et radio inclus. Assurance kitesurf obligatoire, en supplément. Prévoyez eau, protection solaire et tenue de bain.','Equipment and radio included. Compulsory kite insurance costs extra. Bring water, sunscreen and swimwear.','Material und Funk inklusive. Kiteversicherung zusätzlich erforderlich. Wasser, Sonnenschutz und Badebekleidung mitbringen.','Material y radio incluidos. Seguro de kite obligatorio, aparte. Trae agua, protección solar y bañador.'),
  conditions:L('Créneaux 9–13 h ou 14–18 h, préparation comprise : environ 2–2h30 sur l’eau. Haute saison en juillet–août.','Sessions run 09:00–13:00 or 14:00–18:00 including setup: around 2–2.5 hours on the water. High season is July–August.','Kurse 9–13 oder 14–18 Uhr inklusive Vorbereitung: etwa 2–2,5 Stunden im Wasser. Hauptsaison Juli–August.','Sesiones 9–13 o 14–18 h, preparación incluida: unas 2–2,5 h en el agua. Temporada alta en julio–agosto.'),
 },
 addicted2kite:{
  intro:L('Du kite, du wing et l’envie d’y retourner.','Kite, wing, and the urge to go again.','Kite, Wing und Lust auf die nächste Session.','Kite, wing y ganas de repetir.'),
  about:L('Julien et Laurent vous retrouvent à Narbonne-Plage. Petits groupes, radios individuelles et deux bateaux pour accompagner votre progression.','Meet Julien and Laurent at Narbonne-Plage. Small groups, individual radios and two boats support your progression.','Julien und Laurent begrüßen dich in Narbonne-Plage. Kleine Gruppen, eigene Funkgeräte und zwei Begleitboote.','Julien y Laurent te esperan en Narbonne-Plage. Grupos pequeños, radios individuales y dos embarcaciones de apoyo.'),
  chips:['4 max','Kite · Wing','Narbonne-Plage'],
  arrival:L('Le Créneau Naturel, D332 face à Aquajet. Selon le vent : La Vieille Nouvelle. Parking et espace de rinçage à la base.','Le Créneau Naturel, D332 opposite Aquajet. La Vieille Nouvelle depending on the wind. Parking and rinsing facilities at the base.','Le Créneau Naturel, D332 gegenüber Aquajet. Je nach Wind La Vieille Nouvelle. Parkplatz und Spülbereich an der Basis.','Le Créneau Naturel, D332 frente a Aquajet. La Vieille Nouvelle según el viento. Aparcamiento y zona de aclarado en la base.'),
  prepare:L('Savoir nager. Poids minimum annoncé : 40 kg, à confirmer selon le profil. Autorisation parentale pour les mineurs ; assurance kite/wing obligatoire.','Swimming required. Stated minimum weight: 40 kg, subject to individual confirmation. Parental permission for minors; kite/wing insurance required.','Schwimmen erforderlich. Genanntes Mindestgewicht: 40 kg, individuell abklären. Elterliche Erlaubnis für Minderjährige; Kite-/Wingversicherung erforderlich.','Es necesario saber nadar. Peso mínimo indicado: 40 kg, a confirmar según el perfil. Autorización parental para menores y seguro kite/wing obligatorio.'),
  conditions:L('Tarifs sur demande selon la formule et la saison. Matériel adapté à votre niveau ; conditions confirmées avec l’équipe.','Prices on request by session and season. Equipment suited to your level; confirm arrangements with the team.','Preise nach Kurs und Saison auf Anfrage. Passendes Material für dein Niveau; Details mit dem Team abstimmen.','Precios a consultar según fórmula y temporada. Material adaptado a tu nivel; condiciones a confirmar con el equipo.'),
 },
 'osmose-kite':{
  intro:L('Moins de monde. Plus de sensations.','Fewer people. More feeling.','Kleine Gruppen. Großes Gefühl.','Menos gente. Más sensaciones.'),
  about:L('Trois élèves maximum, une radio et un bateau pour vous guider. À La Franqui, chaque séance suit votre niveau et le vent.','Three students at most, with radio coaching and boat support. At La Franqui, each session follows your level and the wind.','Höchstens drei Schüler, Funkbetreuung und Begleitboot. In La Franqui richtet sich jede Session nach deinem Niveau und dem Wind.','Máximo tres alumnos, radio y embarcación de apoyo. En La Franqui, cada sesión se adapta a tu nivel y al viento.'),
  chips:['3 max','4 h','Kite · Foil'],
  arrival:L('Base aux Coussoules Basses, La Franqui. Le spot et l’horaire sont confirmés selon les conditions.','Based at Les Coussoules Basses, La Franqui. Spot and time are confirmed according to conditions.','Basis an den Coussoules Basses, La Franqui. Spot und Uhrzeit werden nach Bedingungen bestätigt.','Base en Les Coussoules Basses, La Franqui. Spot y horario se confirman según las condiciones.'),
  prepare:L('Assurance FFVL obligatoire, en supplément. Matériel compris en cours. L’inscription comprend un acompte de 60 € par chèque.','Compulsory FFVL insurance costs extra. Lesson equipment included. Registration requires a €60 cheque deposit.','FFVL-Versicherung zusätzlich erforderlich. Kursmaterial inklusive. Anmeldung mit 60 € Anzahlung per Scheck.','Seguro FFVL obligatorio, aparte. Material incluido en los cursos. Inscripción con anticipo de 60 € por cheque.'),
  conditions:L('Basse saison : 15 mars–30 juin et septembre–15 novembre. Haute : juillet–août. Hiver : décembre–15 mars. Temps pratiqué facturé selon les conditions.','Low season: 15 March–30 June and September–15 November. High: July–August. Winter: December–15 March. Teaching time charged according to conditions.','Nebensaison: 15. März–30. Juni und September–15. November. Hauptsaison Juli–August. Winter Dezember–15. März. Abrechnung nach durchgeführtem Unterricht.','Baja: 15 marzo–30 junio y septiembre–15 noviembre. Alta: julio–agosto. Invierno: diciembre–15 marzo. Se factura el tiempo practicado según condiciones.'),
 },
 chinook:{
  intro:L('Le plaisir du kite. L’expérience du shop.','The joy of kite. The know-how of the shop.','Freude am Kiten. Erfahrung aus dem Shop.','La emoción del kite. La experiencia de la tienda.'),
  about:L('La Palme pour apprendre, Leucate pour s’équiper. Découvrez les cours avec Philippe Blondé et les conseils de l’équipe Chinook.','Learn at La Palme, gear up in Leucate. Explore lessons with Philippe Blondé and advice from the Chinook team.','Lernen in La Palme, Ausrüstung in Leucate. Entdecke Kurse mit Philippe Blondé und Beratung vom Chinook-Team.','Aprende en La Palme y equípate en Leucate. Descubre los cursos con Philippe Blondé y los consejos del equipo Chinook.'),
  chips:['La Palme','Kitesurf','Shop'],
  arrival:L('Cours sur l’étang de La Palme, sur demande. Shop : 195 avenue du Général de Gaulle, Leucate. Confirmez le rendez-vous avant de venir.','Lessons at Étang de La Palme, on enquiry. Shop: 195 avenue du Général de Gaulle, Leucate. Confirm your meeting before travelling.','Kurse am Étang de La Palme auf Anfrage. Shop: 195 avenue du Général de Gaulle, Leucate. Treffpunkt vor Anreise bestätigen.','Cursos en el estanque de La Palme, a consultar. Tienda: 195 avenue du Général de Gaulle, Leucate. Confirma el encuentro antes de venir.'),
  prepare:L('Programme, matériel, assurance et prérequis à convenir avec l’équipe avant le cours.','Agree your programme, equipment, insurance and prerequisites with the team before the lesson.','Programm, Material, Versicherung und Voraussetzungen vor dem Kurs mit dem Team klären.','Acuerda programa, material, seguro y requisitos con el equipo antes del curso.'),
  conditions:L('Shop : mardi–samedi 9h30–13h et 15h30–19h ; dimanche 9h30–13h. Lundi fermé. Cours et tarifs à confirmer.','Shop: Tuesday–Saturday 09:30–13:00 and 15:30–19:00; Sunday 09:30–13:00. Closed Monday. Lessons and prices to be confirmed.','Shop: Dienstag–Samstag 9:30–13 und 15:30–19 Uhr; Sonntag 9:30–13 Uhr. Montag geschlossen. Kurse und Preise auf Anfrage.','Tienda: martes–sábado 9:30–13 y 15:30–19; domingo 9:30–13. Lunes cerrado. Cursos y precios a confirmar.'),
 },
 skyfly:{
  intro:L('Un bateau. Une île. Votre prochaine session.','A boat. An island. Your next session.','Ein Boot. Eine Insel. Deine nächste Session.','Un barco. Una isla. Tu próxima sesión.','Een boot. Een eiland. Jouw volgende sessie.'),
  about:L('Sylvain Colson vous emmène sur l’île de la Rascasse. Eau peu profonde, coaching radio et matériel inclus : trouvez votre formule, seul ou en famille.','Join Sylvain Colson on Île de la Rascasse. Shallow water, radio coaching and equipment included. Find your session, solo or with family.','Mit Sylvain Colson zur Île de la Rascasse. Flaches Wasser, Funkbetreuung und Material inklusive. Deine Session, allein oder mit Familie.','Únete a Sylvain Colson en la Île de la Rascasse. Aguas poco profundas, radio y material incluidos. Solo o en familia.','Met Sylvain Colson naar Île de la Rascasse. Ondiep water, radiobegeleiding en materiaal inbegrepen. Alleen of met het gezin.'),
  chips:['Kite · Wing · Foil','3 h','Port Leucate'],
  arrival:L('Départ de Port Adhoc Port Leucate, rue Dali. Confirmez l’heure et le point d’embarquement avant votre séance.','Depart from Port Adhoc Port Leucate, Rue Dali. Confirm the time and boarding point before your session.','Abfahrt ab Port Adhoc Port Leucate, Rue Dali. Uhrzeit und Einstiegspunkt vor der Session bestätigen.','Salida desde Port Adhoc Port Leucate, rue Dali. Confirma hora y punto de embarque antes de la sesión.','Vertrek vanaf Port Adhoc Port Leucate, Rue Dali. Bevestig tijd en opstapplaats vóór je sessie.'),
  prepare:L('Combinaison, harnais, gilet, casque radio et bateau inclus. Prévoir des chaussons néoprène ; assurance à prévoir avec l’équipe.','Wetsuit, harness, vest, radio helmet and boat included. Bring neoprene boots; arrange insurance with the team.','Anzug, Trapez, Weste, Funkhelm und Boot inklusive. Neoprenschuhe mitbringen; Versicherung mit dem Team klären.','Neopreno, arnés, chaleco, casco con radio y barco incluidos. Trae escarpines; acuerda el seguro con el equipo.','Wetsuit, trapeze, vest, radiohelm en boot inbegrepen. Neem neopreenschoenen mee; regel verzekering met het team.'),
  conditions:L('Ouvert tous les jours de 10 à 19 h. Prix à partir de. Famille : forfait de 1 à 4 personnes ; découverte à deux : prix par personne.','Open daily 10:00–19:00. Starting prices shown. Family: package for 1–4 people; discovery for two: price per person.','Täglich 10–19 Uhr geöffnet. Ab-Preise. Familie: Paket für 1–4 Personen; Einstieg zu zweit: Preis pro Person.','Abierto todos los días 10–19 h. Precios desde. Familia: paquete para 1–4 personas; descubrimiento para dos: por persona.','Dagelijks open 10–19 uur. Vanafprijzen. Familie: pakket voor 1–4 personen; kennismaking voor twee: per persoon.'),
 },
 coriolis:{
  intro:L('Vos premiers vols commencent ici.','Your first flights start here.','Deine ersten Flüge beginnen hier.','Tus primeros vuelos empiezan aquí.'),
  about:L('Avec Luc Graulou, passez du simulateur au wingfoil ou au kitefoil. Une progression étape par étape sur les spots de Port Leucate.','Join Luc Graulou, from simulator to wingfoil or kitefoil. Progress one step at a time on the spots of Port Leucate.','Mit Luc Graulou vom Simulator zum Wingfoil oder Kitefoil. Schritt für Schritt auf den Spots von Port Leucate.','Con Luc Graulou, pasa del simulador al wingfoil o kitefoil. Progresa paso a paso en los spots de Port Leucate.'),
  chips:['45 min','Wing · Kitefoil','Port Leucate'],
  arrival:L('Le Petit Pêcheur pour le simulateur et le vent marin ; La Mine pour le wing par tramontane. Rendez-vous confirmé avec l’équipe.','Le Petit Pêcheur for simulator and sea winds; La Mine for wing in tramontane. Confirm your meeting point with the team.','Le Petit Pêcheur für Simulator und Seewind; La Mine für Wing bei Tramontane. Treffpunkt mit dem Team bestätigen.','Le Petit Pêcheur para simulador y viento de mar; La Mine para wing con tramontana. Confirma el encuentro con el equipo.'),
  prepare:L('À partir de 10 ans. Niveau, taille et poids permettent de préparer votre matériel. Licence et assurance à prévoir.','From age 10. Your level, height and weight help prepare suitable equipment. Licence and insurance required.','Ab 10 Jahren. Niveau, Größe und Gewicht helfen bei der Materialwahl. Lizenz und Versicherung erforderlich.','A partir de 10 años. Nivel, altura y peso ayudan a preparar el material. Licencia y seguro necesarios.'),
  conditions:L('Du 1er avril au 30 novembre. Simulateur : 45 minutes, trois élèves maximum. Tarifs selon formule, sur demande.','1 April–30 November. Simulator: 45 minutes, three students at most. Prices on request for your chosen option.','1. April–30. November. Simulator: 45 Minuten, höchstens drei Schüler. Preise nach Angebot auf Anfrage.','Del 1 de abril al 30 de noviembre. Simulador: 45 minutos, máximo tres alumnos. Precios a consultar según fórmula.'),
 },
 'tendance-kite':{
  intro:L('Le calme du lagon. L’énergie du kite.','The calm of the lagoon. The energy of kite.','Die Ruhe der Lagune. Die Energie des Kites.','La calma de la laguna. La energía del kite.'),
  about:L('Avec Xavier Dumas, apprenez à Port Mahon en groupe de quatre maximum. Une aile, une radio par personne et un bateau pour rejoindre le spot.','Learn with Xavier Dumas at Port Mahon in groups of four or fewer. Your own kite and radio, with boat access to the spot.','Lerne mit Xavier Dumas in Port Mahon, mit höchstens vier Schülern. Eigener Kite, Funkgerät und Bootstransfer zum Spot.','Aprende con Xavier Dumas en Port Mahon en grupos de cuatro como máximo. Cometa y radio individuales, con acceso en barco.'),
  chips:['4 max','4 h','Port Mahon'],
  arrival:L('1089 Port Mahon, Sigean. Parking, vestiaires et douche chaude. Rendez-vous confirmé avant la séance.','1089 Port Mahon, Sigean. Parking, changing rooms and a hot shower. Meeting confirmed before the session.','1089 Port Mahon, Sigean. Parkplatz, Umkleiden und warme Dusche. Treffpunkt vor der Session bestätigen.','1089 Port Mahon, Sigean. Aparcamiento, vestuarios y ducha caliente. Encuentro confirmado antes de la sesión.'),
  prepare:L('Matériel inclus dans les cours. Assurance kitesurf obligatoire. Savoir nager ; prévoir tenue de bain et protection solaire.','Lesson equipment included. Kitesurf insurance and swimming ability required. Bring swimwear and sun protection.','Kursmaterial inklusive. Kiteversicherung und Schwimmkenntnisse erforderlich. Badebekleidung und Sonnenschutz mitbringen.','Material incluido en los cursos. Seguro de kite y saber nadar obligatorios. Trae bañador y protección solar.'),
  conditions:L('4 h, préparation et bateau compris. Juillet–août : haute saison. Cours privés : 1 h sur l’eau, 2 h au total. Report ou remboursement selon conditions météo.','4 hours including setup and boat. July–August is high season. Private lessons: 1 hour on water, 2 hours total. Weather postponement/refund conditions apply.','4 Stunden inklusive Vorbereitung und Boot. Hauptsaison Juli–August. Privat: 1 Stunde im Wasser, 2 Stunden insgesamt. Wetterbedingte Verschiebung/Erstattung nach Bedingungen.','4 h incluyendo preparación y barco. Alta temporada en julio–agosto. Privado: 1 h en el agua, 2 h en total. Aplazamiento/reembolso según condiciones meteorológicas.'),
 },
 ksl:{
  intro:L('Apprendre, rider, se retrouver.','Learn, ride, belong.','Lernen, Kiten, Zusammenkommen.','Aprender, navegar, compartir.'),
  about:L('Aux Coussoules, l’école vous apprend le kite et le wing. Le club prolonge l’aventure : location, sécurité et équipes jeunes.','At Les Coussoules, learn kite and wing with the school. Keep riding with the club: rental, safety support and youth teams.','An den Coussoules lernst du Kite und Wing. Der Club bietet Verleih, Sicherheitsbetreuung und Jugendteams.','En Les Coussoules, aprende kite y wing en la escuela. Continúa en el club: alquiler, apoyo de seguridad y equipos juveniles.'),
  chips:['Kite · Wing','La Franqui','2004'],
  arrival:L('Plage des Coussoules, La Franqui. Pour rider en autonomie, renseignez-vous sur la zone et les horaires de sécurité du club.','Plage des Coussoules, La Franqui. For independent riding, check the club’s safety area and operating hours.','Plage des Coussoules, La Franqui. Für selbstständiges Kiten Sicherheitszone und Clubzeiten beachten.','Plage des Coussoules, La Franqui. Para navegar por tu cuenta, consulta zona y horarios de seguridad del club.'),
  prepare:L('École : cours et stages. Club : location et sécurité. Assurance, équipement et prérequis à confirmer selon votre pratique.','School: lessons and courses. Club: rental and safety. Confirm insurance, equipment and prerequisites for your activity.','Schule: Kurse. Club: Verleih und Sicherheit. Versicherung, Material und Voraussetzungen passend zur Aktivität klären.','Escuela: clases y cursos. Club: alquiler y seguridad. Confirma seguro, material y requisitos según actividad.'),
  conditions:L('École sur réservation, fermeture du 15 décembre au 15 janvier. Sécurité par tramontane, avril–octobre : 9–17 h, week-ends jusqu’à 19 h, juillet–août jusqu’à 20 h.','School by reservation; closed 15 December–15 January. Tramontane safety, April–October: 09:00–17:00, weekends to 19:00, July–August to 20:00.','Schule nach Vereinbarung; 15. Dezember–15. Januar geschlossen. Tramontane-Sicherheit April–Oktober: 9–17 Uhr, Wochenenden bis 19, Juli–August bis 20 Uhr.','Escuela con reserva; cerrada 15 diciembre–15 enero. Seguridad con tramontana, abril–octubre: 9–17 h, fines de semana hasta 19 h, julio–agosto hasta 20 h.'),
 },
 'akila-gruissan':{
  intro:L('Votre dose de grand air, à Gruissan.','Your dose of open air, in Gruissan.','Deine Portion Freiheit, in Gruissan.','Tu dosis de aire libre, en Gruissan.'),
  about:L('Kite, wing, coaching ou navigation surveillée : choisissez votre rythme. À la base, tout est là pour prolonger la journée, de la douche au bar.','Kite, wing, coaching or supervised riding: find your pace. Back at the base, showers, a shop and a bar keep the day going.','Kite, Wing, Coaching oder betreutes Kiten: finde dein Tempo. Zurück an der Basis warten Duschen, Shop und Bar.','Kite, wing, entrenamiento o navegación supervisada: elige tu ritmo. En la base te esperan duchas, tienda y bar.'),
  chips:['Kite · Wing','Plage des Chalets','Gruissan'],
  arrival:L('Pôle Mer : entrée de la plage des Chalets, accès kite en bateau vers La Vieille Nouvelle. Premiers vols en wing et activités famille à Mateille.','Pôle Mer: entrance to Plage des Chalets, boat access towards La Vieille Nouvelle. Beginner wing and family activities at Mateille.','Pôle Mer: Eingang Plage des Chalets, per Boot Richtung La Vieille Nouvelle. Wing-Einstieg und Familienangebote in Mateille.','Pôle Mer: entrada de Plage des Chalets, acceso en barco hacia La Vieille Nouvelle. Iniciación wing y actividades familiares en Mateille.'),
  prepare:L('Navigation surveillée obligatoire pour le kite sur ce spot. Niveau, matériel et assurance à confirmer. Parking, vestiaires, douches et rinçage à la base.','Supervised riding required for kite on this spot. Confirm level, equipment and insurance. Parking, changing rooms, showers and rinsing at the base.','Betreutes Kiten an diesem Spot erforderlich. Niveau, Material und Versicherung klären. Parkplatz, Umkleiden, Duschen und Spülbereich an der Basis.','Navegación supervisada obligatoria para kite en este spot. Confirma nivel, material y seguro. Aparcamiento, vestuarios, duchas y aclarado en la base.'),
  conditions:L('Tarifs selon activité, niveau et durée. Familles à Mateille dès 5 ans. Groupes jusqu’à 40 personnes sur demande.','Prices depend on activity, level and duration. Family activities at Mateille from age 5. Groups up to 40 on enquiry.','Preise nach Aktivität, Niveau und Dauer. Familienangebote in Mateille ab 5 Jahren. Gruppen bis 40 Personen auf Anfrage.','Precios según actividad, nivel y duración. Familias en Mateille desde 5 años. Grupos de hasta 40 personas a consultar.'),
 }
};

export const copy={
 book:L('Réserver','Book a session','Session buchen','Reservar','Boek een sessie'),
 more:L('Toutes les sessions','All sessions','Alle Sessions','Todas las sesiones','Alle sessies'),
 details:L('Les détails','The details','Die Details','Los detalles','De details'),
 practical:L('Avant de venir.','Before you arrive.','Vor deiner Session.','Antes de venir.','Voor je sessie.'),
 arrival:L('Le rendez-vous','Meeting point','Treffpunkt','Punto de encuentro','Afspreekpunt'),
 prepare:L('À prévoir','What to bring','Was du brauchst','Qué preparar','Wat je nodig hebt'),
 conditions:L('Tarifs et horaires','Prices and hours','Preise und Zeiten','Precios y horarios','Prijzen en tijden'),
 team:L('L’équipe','The team','Das Team','El equipo','Het team'),
 quote:L('Sur demande','On request','Auf Anfrage','A consultar','Op aanvraag'),
 rates:L('Tarifs indicatifs, confirmés avec l’équipe.','Indicative prices, confirmed with the team.','Preise vorbehaltlich Bestätigung durch das Team.','Precios orientativos, a confirmar con el equipo.','Richtprijzen, te bevestigen met het team.'),
 seasonal:L('Basse saison / juillet–août','Low season / July–August','Nebensaison / Juli–August','Baja temporada / julio–agosto','Laagseizoen / juli–augustus'),
 bookingTitle:L('On se retrouve sur l’eau ?','See you on the water?','Sehen wir uns auf dem Wasser?','¿Nos vemos en el agua?','Tot op het water?'),
 bookingSub:L('Votre session commence ici.','Your session starts here.','Hier beginnt deine Session.','Tu sesión empieza aquí.','Hier begint je sessie.'),
 demo:L('Démo interactive','Interactive demo','Interaktive Demo','Demo interactiva','Interactieve demo'),
 noScript:L('Activez JavaScript pour essayer le formulaire.','Enable JavaScript to try the form.','Aktiviere JavaScript, um das Formular zu testen.','Activa JavaScript para probar el formulario.','Schakel JavaScript in om het formulier te proberen.'),
 demoNote:L('Essayez le parcours. Aucune demande ni donnée n’est envoyée.','Try the flow. No enquiry or personal data is sent.','Teste den Ablauf. Es werden keine Anfragen oder persönlichen Daten gesendet.','Prueba el proceso. No se envían solicitudes ni datos personales.','Probeer de stappen. Er worden geen aanvragen of persoonsgegevens verstuurd.'),
 stepSession:L('La session','Your session','Deine Session','Tu sesión','Je sessie'),
 stepYou:L('Vos infos','About you','Über dich','Tus datos','Over jou'),
 stepReview:L('Récapitulatif','Review','Übersicht','Resumen','Overzicht'),
 session:L('Votre formule','Choose a session','Deine Session','Elige tu sesión','Kies je sessie'),
 date:L('Date souhaitée','Preferred date','Wunschdatum','Fecha deseada','Gewenste datum'),
 previousMonth:L('Mois précédent','Previous month','Voriger Monat','Mes anterior','Vorige maand'),
 nextMonth:L('Mois suivant','Next month','Nächster Monat','Mes siguiente','Volgende maand'),
 period:L('Votre préférence','Preferred time','Wunschzeit','Horario preferido','Gewenste tijd'),
 morning:L('Matin','Morning','Vormittag','Mañana','Ochtend'),
 afternoon:L('Après-midi','Afternoon','Nachmittag','Tarde','Middag'),
 flexible:L('Flexible','Flexible','Flexibel','Flexible','Flexibel'),
 continue:L('Continuer','Continue','Weiter','Continuar','Verder'),
 back:L('Retour','Back','Zurück','Volver','Terug'),
 name:L('Nom','Name','Name','Nombre','Naam'),
 email:L('E-mail','Email','E-Mail','Correo','E-mail'),
 phone:L('Téléphone','Phone','Telefon','Teléfono','Telefoon'),
 people:L('Participants','Participants','Teilnehmer','Participantes','Deelnemers'),
 level:L('Votre niveau','Your level','Dein Niveau','Tu nivel','Je niveau'),
 beginner:L('Première fois','First time','Zum ersten Mal','Primera vez','Eerste keer'),
 intermediate:L('Je progresse','Improving','Ich lerne dazu','Progresando','Ik leer bij'),
 advanced:L('Autonome','Independent rider','Selbstständig','Autónomo','Zelfstandig'),
 message:L('Une précision ? (facultatif)','Anything else? (optional)','Noch etwas? (optional)','¿Algo más? (opcional)','Nog iets? (optioneel)'),
 measurements:L('Pour le matériel (facultatif)','For your equipment (optional)','Für dein Material (optional)','Para el material (opcional)','Voor je materiaal (optioneel)'),
 weight:L('Poids (kg)','Weight (kg)','Gewicht (kg)','Peso (kg)','Gewicht (kg)'),
 height:L('Taille (cm)','Height (cm)','Größe (cm)','Altura (cm)','Lengte (cm)'),
 finish:L('Tester la demande','Test the enquiry','Anfrage testen','Probar la solicitud','Aanvraag testen'),
 done:L('Votre session prend forme.','Your session is taking shape.','Deine Session nimmt Gestalt an.','Tu sesión toma forma.','Je sessie krijgt vorm.'),
 doneNote:L('Démo terminée. Aucune réservation créée, aucun message envoyé.','Demo complete. No booking was created and no message was sent.','Demo abgeschlossen. Keine Buchung erstellt, keine Nachricht gesendet.','Demo completada. No se ha creado ninguna reserva ni enviado ningún mensaje.','Demo voltooid. Geen boeking gemaakt en geen bericht verstuurd.'),
 reset:L('Recommencer','Start again','Neu beginnen','Empezar de nuevo','Opnieuw beginnen'),
 imageNote:L('Visuels d’ambiance IA','AI mood imagery','KI-Stimmungsbilder','Imágenes de ambiente IA','AI-sfeerbeelden'),
 contact:L('Contact','Contact','Kontakt','Contacto','Contact'),
 school:L('L’école','The school','Die Schule','La escuela','De school')
};

// Short units remove research commentary while retaining offer distinctions.
const units={
 kitepulsion:['3 h','1 h / 2 h / 3 h',L('Programme personnalisé','Personal programme','Individuelles Programm','Programa personal'),L('4–6 riders autonomes','4–6 independent riders','4–6 selbstständige Kiter','4–6 riders autónomos')],
 'narbonne-kite-passion':['4 h','2 × 4 h','3 × 4 h','5 × 4 h','4 h','4 h','Kite · Foil · Downwind'],
 addicted2kite:['3 h','3 h','2 h','3 h','Kite · Foil'],
 'osmose-kite':['4 h','4 h','4 h','3 h','4 h',L('Selon matériel','By equipment','Nach Material','Según material')],
 chinook:[L('Premiers bords','First rides','Erste Fahrten','Primeros bordos'),L('À votre rythme','At your pace','In deinem Tempo','A tu ritmo'),L('Matériel & conseils','Equipment & advice','Material & Beratung','Material y consejos')],
 skyfly:[L('3 h · par personne','3 h · per person','3 h · pro Person','3 h · por persona','3 u · per persoon'),'3 h','3 × 3 h','1 h','1 h','1 h','3 h',L('3 h · forfait 1–4 personnes','3 h · package for 1–4','3 h · Paket für 1–4','3 h · paquete para 1–4','3 u · pakket voor 1–4')],
 coriolis:['45 min','3 × 45 min','2 h','Discovery · Rider · Sailor','2 h'],
 'tendance-kite':['4 h','2 × 4 h','3 × 4 h','4 × 4 h','5 × 4 h',L('1 h sur l’eau','1 h on the water','1 h im Wasser','1 h en el agua'),'4 h'],
 ksl:[L('Cours & stages','Lessons & courses','Kurse','Clases y cursos'),'Wing · Foil',L('Tracté · simulateur · terre','Towed · simulator · land','Gezogen · Simulator · Land','Remolcado · simulador · tierra'),L('Jeunes dès 8 ans','Youth from age 8','Jugend ab 8 Jahren','Jóvenes desde 8 años'),L('Location & sécurité','Rental & safety','Verleih & Sicherheit','Alquiler y seguridad')],
 'akila-gruissan':['Kite · Wing',L('Tous niveaux','All levels','Alle Niveaus','Todos los niveles'),L('Riders autonomes','Independent riders','Selbstständige Kiter','Riders autónomos'),L('Avec assistance bateau','With boat support','Mit Bootsbetreuung','Con apoyo de barco'),'Windsurf · SUP · Kayak',L('Mateille · dès 5 ans','Mateille · from age 5','Mateille · ab 5 Jahren','Mateille · desde 5 años')]
};
export function presentationFor(s,d,lang){
 const p=localize(profiles[s.slug],lang),v=localize(copy,lang);
 const compactUnits=localize(units[s.slug],lang);
 const courses=d.courses.map((c,i)=>({
  name:c.name,price:d.priceReferenceYear||!/[0-9]/.test(c.price)?v.quote:c.price,
  unit:compactUnits[i],
  // Dated tariffs are research-only, never shown as current offer details.
  features:d.priceReferenceYear?[]:c.features.filter(f=>!/(official|officiell|officiel|oficial|officiële|2022|2024|website|site web)/i.test(f)).slice(0,2)
 }));
 const contacts=d.contacts.map(c=>({phone:c.phone,email:c.email,whatsapp:c.whatsapp,label:s.slug==='chinook'?(c.phone==='+33468401717'?'Chinook Shop':'Philippe Blondé'):c.label}));
 return {...p,v,courses,contacts,mapUrl:d.mapUrl,team:d.team};
}
