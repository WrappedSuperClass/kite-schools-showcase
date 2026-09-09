// Public source review: 2026-09-09. Strings are translated from the same facts.
export const L=(fr,en,de,es,nl)=>({fr,en,de,es,...(nl?{nl}:{})});
export const localize=(value,lang)=>{
 if(Array.isArray(value))return value.map(v=>localize(v,lang));
 if(value&&typeof value==='object'){
  if('fr'in value){if(!value[lang])throw Error(`Missing ${lang} translation: ${value.fr}`);return value[lang];}
  return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,localize(v,lang)]));
 }
 return value;
};
export const quote=L('Tarif à confirmer','Confirm price','Preis anfragen','Confirmar precio','Prijs navragen');
export const seasonal=L('Basse saison / juillet–août, par personne','Low season / July–August, per person','Nebensaison / Juli–August, pro Person','Temporada baja / julio–agosto, por persona','Laagseizoen / juli–augustus, per persoon');
export const from=L('À partir de','From','Ab','Desde','Vanaf');
export const hours=n=>L(`${n} h`,`${n} hours`,`${n} Stunden`,`${n} horas`,`${n} uur`);
export const sessions=(n,h)=>L(`${n} séances de ${h} h`,`${n} sessions of ${h} hours`,`${n} Einheiten à ${h} Stunden`,`${n} sesiones de ${h} horas`,`${n} sessies van ${h} uur`);
export const course=(name,price,unit,url,features=[],bookingUrl)=>({name,price,unit,url,features,...(bookingUrl?{bookingUrl}:{})});
export const fact=(title,text,url)=>({title,text,url});
export const ui={
 reviewed:L('Sources consultées le','Sources checked on','Quellen geprüft am','Fuentes consultadas el','Bronnen gecontroleerd op'),
 sources:L('Les informations à la source','Information from the source','Informationen aus erster Hand','Información en la fuente','Informatie bij de bron'),
 source:L('Source officielle','Official source','Offizielle Quelle','Fuente oficial','Officiële bron'),
 practical:L('Votre session, en pratique.','The details that matter.','Alles für deine Session.','Tu sesión, en la práctica.','Alles voor je sessie.'),
 practicalLabel:L('Informations pratiques','Practical information','Praktische Informationen','Información práctica','Praktische informatie'),
 bookingTitle:L('Réserver avec l’école.','Book with the school.','Bei der Schule buchen.','Reserva con la escuela.','Boek bij de school.'),
 bookingIntro:L('Suivez le parcours officiel de cette école.','Follow this school’s official booking process.','Nutze den offiziellen Buchungsweg dieser Schule.','Sigue el proceso oficial de esta escuela.','Volg het officiële boekingsproces van deze school.'),
 calendar:L('Voir les disponibilités','View availability','Verfügbarkeit ansehen','Ver disponibilidad','Beschikbaarheid bekijken'),
 form:L('Ouvrir le formulaire officiel','Open the official form','Offizielles Formular öffnen','Abrir el formulario oficial','Officieel formulier openen'),
 portal:L('Ouvrir la réservation officielle','Open official booking','Offizielle Buchung öffnen','Abrir reserva oficial','Officiële boeking openen'),
 phone:L('Appeler pour réserver','Call to book','Telefonisch buchen','Llamar para reservar','Bellen om te boeken'),
 email:L('Écrire pour réserver','Email to book','Per E-Mail anfragen','Reservar por correo','Boeken per e-mail'),
 arrival:L('Rendez-vous','Meeting point','Treffpunkt','Punto de encuentro','Afspreekpunt'),
 schedule:L('Horaires et saison','Hours and season','Zeiten und Saison','Horarios y temporada','Tijden en seizoen'),
 requirements:L('Avant de venir','Before you arrive','Vor deiner Anreise','Antes de venir','Voor je komst'),
 equipment:L('Matériel et services','Equipment and facilities','Ausrüstung und Ausstattung','Equipo e instalaciones','Materiaal en voorzieningen'),
 prices:L('Tarifs et conditions','Prices and conditions','Preise und Bedingungen','Precios y condiciones','Prijzen en voorwaarden'),
 team:L('L’équipe','The team','Das Team','El equipo','Het team'),
 weather:L('Météo du spot','Spot weather','Wetter am Spot','Tiempo en el spot','Weer op de spot'),
 photos:L('Photos et avis de l’école','School photos and reviews','Schulfotos und Bewertungen','Fotos y reseñas de la escuela','Schoolfoto’s en beoordelingen'),
 insurance:L('Assurance et documents','Insurance and documents','Versicherung und Dokumente','Seguro y documentos','Verzekering en documenten'),
 lodging:L('Hébergement','Accommodation','Unterkunft','Alojamiento','Accommodatie'),
 registration:L('Fiche d’inscription','Registration form','Anmeldeformular','Ficha de inscripción','Inschrijfformulier'),
 gift:L('Carte cadeau','Gift card','Geschenkgutschein','Tarjeta regalo','Cadeaubon'),
 payment:L('Paiement','Payment','Bezahlung','Pago','Betaling'),
 shop:L('Le shop','The shop','Der Shop','La tienda','De shop'),
 schoolContact:L('École','School','Schule','Escuela','School'),
 clubContact:L('Club — sécurité et location','Club — safety and rental','Club — Sicherheit und Verleih','Club — seguridad y alquiler','Club — veiligheid en verhuur'),
 shopContact:L('Shop — contact actuel','Shop — current contact','Shop — aktueller Kontakt','Tienda — contacto actual','Shop — huidig contact'),
 phoneContact:L('Téléphone','Telephone','Telefon','Teléfono','Telefoon'),
 emailContact:L('E-mail','Email','E-Mail','Correo','E-mail'),
 mobile:L('Mobile / WhatsApp','Mobile / WhatsApp','Mobil / WhatsApp','Móvil / WhatsApp','Mobiel / WhatsApp'),
 official:L('Site officiel','Official website','Offizielle Website','Web oficial','Officiële website'),
 ratesNote:L('Tarifs publiés par l’école, selon la saison et la formule. Les disponibilités et le prix final sont confirmés par l’école.','School-published rates depend on the season and option. The school confirms availability and the final price.','Die veröffentlichten Schulpreise hängen von Saison und Angebot ab. Verfügbarkeit und Endpreis bestätigt die Schule.','Las tarifas publicadas dependen de la temporada y la opción. La escuela confirma disponibilidad y precio final.','De gepubliceerde schoolprijzen hangen af van seizoen en formule. De school bevestigt beschikbaarheid en de uiteindelijke prijs.'),
 datedRates:L('La grille officielle est datée de 2022. Les montants ci-dessous sont une référence datée, pas un devis actuel. Demandez le tarif de votre séjour à l’école.','The official tariff sheet is dated 2022. The amounts below are a dated reference, not a current quote. Ask the school for your stay’s price.','Die offizielle Preisliste stammt aus 2022. Die folgenden Beträge sind historische Angaben, kein aktuelles Angebot. Frage den Preis für deinen Aufenthalt bei der Schule an.','La tabla oficial está fechada en 2022. Los importes siguientes son una referencia antigua, no un presupuesto actual. Consulta el precio de tu estancia con la escuela.'),
 reference2022:L('Référence publiée en 2022','Published 2022 reference','Veröffentlichte Preise von 2022','Referencia publicada en 2022'),
 referencePrice:L('Grille 2022 :','2022 tariff sheet:','Preisliste 2022:','Tabla de 2022:'),
 latestPrice:L('Demander le tarif actuel','Ask for the current price','Aktuellen Preis anfragen','Pedir el precio actual','Actuele prijs opvragen'),
 bookingQ:L('Comment réserver ?','How do I book?','Wie buche ich?','¿Cómo reservo?','Hoe boek ik?'),
 arrivalQ:L('Où retrouver l’équipe ?','Where do I meet the team?','Wo treffe ich das Team?','¿Dónde encuentro al equipo?','Waar ontmoet ik het team?'),
 prepareQ:L('Que faut-il préparer ?','What should I prepare?','Was muss ich vorbereiten?','¿Qué debo preparar?','Wat moet ik voorbereiden?'),
 imageLabel:L('Visuel d’ambiance IA · photos réelles sur le site officiel','AI mood image · actual photos on the official site','KI-Stimmungsbild · echte Fotos auf der offiziellen Website','Imagen de ambiente IA · fotos reales en la web oficial','AI-sfeerbeeld · echte foto’s op de officiële site'),
 draftTitle:L('Préparer mon e-mail','Prepare my email','E-Mail vorbereiten','Preparar mi correo','Mijn e-mail voorbereiden'),
 draftNote:L('Ce formulaire ouvre votre messagerie avec un brouillon. L’envoi et la confirmation se font avec l’école.','This form opens your email app with a draft. Send it to the school to arrange and confirm your session.','Dieses Formular öffnet einen Entwurf in deinem E-Mail-Programm. Sende ihn an die Schule, um deine Session zu vereinbaren.','Este formulario abre un borrador en tu correo. Envíalo a la escuela para organizar y confirmar tu sesión.','Dit formulier opent een concept in je mailprogramma. Stuur het naar de school om je sessie af te spreken.'),
 name:L('Votre nom','Your name','Dein Name','Tu nombre','Je naam'),
 dates:L('Dates souhaitées','Preferred dates','Wunschtermine','Fechas deseadas','Gewenste data'),
 message:L('Votre niveau et vos envies','Your level and interests','Dein Niveau und deine Wünsche','Tu nivel y tus intereses','Je niveau en wensen'),
 draftReady:L('Brouillon prêt. Vous pouvez aussi copier le texte ci-dessous.','Draft ready. You can also copy the text below.','Entwurf fertig. Du kannst den Text unten auch kopieren.','Borrador listo. También puedes copiar el texto de abajo.','Concept klaar. Je kunt de tekst hieronder ook kopiëren.'),
 draftSubject:L('Demande de session','Session enquiry','Kursanfrage','Consulta de sesión','Aanvraag voor een sessie'),
 seasons:seasonal,
 archivePhoto:L('Photo des archives de l’école','Photograph from the school archive','Foto aus dem Schularchiv','Foto del archivo de la escuela','Foto uit het schoolarchief')
};
ui.datedRates.nl='De officiële prijslijst is uit 2022. De bedragen zijn een gedateerde referentie, geen actuele offerte. Vraag de school naar de prijs voor je verblijf.';
ui.reference2022.nl='Gepubliceerde referentie uit 2022';
ui.referencePrice.nl='Prijslijst 2022:';
