  //Henter elemtene fra html-dokumentet
  const kalender = document.querySelector(".kalender"),
  dato = document.querySelector(".dato"),
  dagerContainer = document.querySelector(".dager"),
  forrige = document.querySelector(".forrige"),
  neste = document.querySelector(".neste"),
  idagBtn = document.querySelector(".idag-btn"),
  eventDag = document.querySelector(".event-dag"),
  eventDato = document.querySelector(".event-dato"),
  eventsContainer = document.querySelector(".events"),
  leggTilEventBtn = document.querySelector(".leggTil-event"),
  leggTilEventWrapper = document.querySelector(".leggTil-event-wrapper "),
  leggTilEventLukkBtn = document.querySelector(".lukk "),
  leggTilEventTittel = document.querySelector(".event-navn "),
  leggTilEventFra = document.querySelector(".event-tid-fra "),
  leggTilEventTil = document.querySelector(".event-tid-til "),
  leggTilEventSubmit = document.querySelector(".leggTil-event-btn ");

// definerer dagens dato og dagen som trykkes på i kalenderen.
let today = new Date();
let aktivDag;
let month = today.getMonth();
let year = today.getFullYear();

// definerer alle månedene
const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// lager et array med hendelser og kaller funksjonen som henter hendelsene, som er skrevet lengre nede i dokumentet
const eventsArr = [];
getEvents();

function initKalender() {
  // Oppretter dato-objekter for den første dagen i måneden, den siste dagen i måneden,
  // og den siste dagen i forrige måned (for å vise dager fra forrige måned i kalenderen)
  const firstDag = new Date(year, month, 1);
  const lastDag = new Date(year, month + 1, 0);
  const forrigeLastDag = new Date(year, month, 0);

  // Finner antall dager i forrige måned og antall dager i denne måneden
  const forrigeDager = forrigeLastDag.getDate();
  const lastDato = lastDag.getDate();

  // Finner hvilken dag i uken den første dagen i denne måneden er (0 = søndag, 1 = mandag, osv.)
  const dag = firstDag.getDay();

  // Finner hvor mange dager fra neste måned som skal vises i denne månedens kalender
  const nesteDager = 7 - lastDag.getDay() - 1;

  // Setter datoen i HTML-elementet til måneden og året som vises i kalenderen
  dato.innerHTML = months[month] + " " + year;

  let dager = "";

  // Legger til dager fra forrige måned som skal vises i denne månedens kalender
  for (let x = dag; x > 0; x--) {
    dager += `<div class="dag forrige-dato">${forrigeDager - x + 1}</div>`;
  }

  // Legger til dager fra denne måneden i kalenderen
  for (let i = 1; i <= lastDato; i++) {
    // Sjekker om det finnes en hendelse på denne dagen
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.dag === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    // Hvis dagen er i dag, setter jeg aktivDag-variabelen, og oppdater hendelsene for denne dagen
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      aktivDag = i;
      getAktivDag(i);
      updateEvents(i);

      // Hvis det finnes en hendelse på denne dagen, legger jeg til klassen "event" og "active"
      if (event) {
        dager += `<div class="dag today active event">${i}</div>`;
      } else {
        dager += `<div class="dag today active">${i}</div>`;
      }
    } else {
      // Hvis dagen ikke er i dag, og det finnes en hendelse på denne dagen, legg til klassen "event"
      if (event) {
        dager += `<div class="dag event">${i}</div>`;
      } else {
        dager += `<div class="dag ">${i}</div>`;
      }
    }
  }

  // Legger til dager fra neste måned som skal vises i denne månedens kalender
  for (let j = 1; j <= nesteDager; j++) {
    dager +=
 `<div class="dag neste-dato">${j}</div>`;
  }
  dagerContainer.innerHTML = dager;
  addListner();
}

//funksjon som bytter til forrige måned
function forrigeMonth() {
  // reduserer måned med 1
  month--;
  // hvis måned blir mindre enn 0, betyr det at det har blitt et nytt år
  if (month < 0) {
    // reduserer år med 1 og setter måned til desember (11)
    month = 11;
    year--;
  }
  // oppdaterer kalenderen med den nye måneden
  initKalender();
}
// funskjon som bytter til neste måned på samme måte som forrige måned
function nesteMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initKalender();
}

// legger til eventlister til forrige måned og neste måned knappene som kjører funksjonene over
forrige.addEventListener("click", forrigeMonth);
neste.addEventListener("click", nesteMonth);

initKalender();

// funksjon som legger til en lytter på hver dag i kalenderen
function addListner() {
  // Velger alle elementene med klassenavn "dag" og legger til en klikk-lytter på hvert enkelt element
  const dager = document.querySelectorAll(".dag");
  dager.forEach((dag) => {
    dag.addEventListener("click", (e) => {
      // Oppdaterer aktivDag til å være lik verdien som er klikket på, oppdaterer også events for aktivDag
      getAktivDag(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      aktivDag = Number(e.target.innerHTML);

      // Fjerner "active" klassen fra alle dager
      dager.forEach((dag) => {
        dag.classList.remove("active");
      });

      // Hvis den klikkede dagen tilhører forrige måned, går vi til forrige måned og markerer riktig dag
      if (e.target.classList.contains("forrige-dato")) {
        forrigeMonth();

        // Vent 100 millisekunder før å markere riktig dag for å gi funksjonen tid til å oppdatere kalenderen
        setTimeout(() => {
          const dager = document.querySelectorAll(".dag");
          dager.forEach((dag) => {
            if (
              !dag.classList.contains("forrige-dato") &&
              dag.innerHTML === e.target.innerHTML
            ) {
              dag.classList.add("active");
            }
          });
        }, 100);
      } 
      // Hvis den klikkede dagen tilhører neste måned, går vi til neste måned og markerer riktig dag
      else if (e.target.classList.contains("neste-dato")) {
        nesteMonth();

        // Vent 100 millisekunder før å markere riktig dag for å gi funksjonen tid til å oppdatere kalenderen
        setTimeout(() => {
          const dager = document.querySelectorAll(".dag");
          dager.forEach((dag) => {
            if (
              !dag.classList.contains("neste-dato") &&
              dag.innerHTML === e.target.innerHTML
            ) {
              dag.classList.add("active");
            }
          });
        }, 100);
      } 
      // Hvis den klikkede dagen tilhører gjeldende måned, markerer vi den som aktiv
      else {
        e.target.classList.add("active");
      }
    });
  });
}

// legger til en eventlistener på I dag knappen som tar deg tilbake til dagens dato
idagBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initKalender();
});


//function som henter dagen som er klikket på og oppretter et datoopjekt 
function getAktivDag(dato) {
  // Oppretter et nytt datobjekt med dato-argumentet, og angir år og måned med global variabler
  const dag = new Date(year, month, dato);
  // Henter navnet på dagen fra datobjektet og legger det i en variabel
  const dagNavn = "";
  // Setter teksten i HTML-elementet med ID "eventDag" til dagens navn
  eventDag.innerHTML = dagNavn;
  // Setter teksten i HTML-elementet med ID "eventDato" til datoformatet DD MM ÅÅÅÅ, hentet fra variablene "dato", "month" og "year"
  eventDato.innerHTML = dato + " " + months[month] + " " + year;
}


//funskjon som opptdaterer hendelsene i den falgte dagen og viser teksten "ingen hendelser" hvis det ikke er noen hendelser i den valgte dagen
function updateEvents(dato) {
  let events = "";

  // Ser gjennom alle hendelsene i hendelseslisten
  eventsArr.forEach((event) => {
    // Sjekk om hendelsen skjer på den valgte datoen
    if (
      dato === event.dag &&
      month + 1 === event.month &&
      year === event.year
    ) {
      // Ser gjennom alle hendelsene som skjer på datoen
      event.events.forEach((event) => {
        // Legg til HTML-kode for hendelsen i variabelen 'events'
        events += `<div class="event">
            <div class="tittel">
              <i class="fas fa-circle"></i>
              <h3 class="event-tittel">${event.tittel}</h3>
            </div>
            <div class="event-tid">
              <span class="event-tid">${event.tid}</span>
            </div>
        </div>`;
      });
    }
  });

  // Hvis det ikke er noen hendelser på den valgte datoen, legg til en "ingen hendelser"-melding
  if (events === "") {
    events = `<div class="no-event">
            <h3>Ingen hendelser</h3>
        </div>`;
  }

  // Oppdater HTML-elementet for hendelser med variabelen 'events'
  eventsContainer.innerHTML = events;

  // Lagre hendelseslisten i localStorage
  saveEvents();
}
//knapp som legger til en ny hendelse når trykket på
leggTilEventBtn.addEventListener("click", () => {
  leggTilEventWrapper.classList.toggle("active");
});

//knapp som fjerner hendelse når trykket på
leggTilEventLukkBtn.addEventListener("click", () => {
  leggTilEventWrapper.classList.remove("active");
});

//hvis man trykker et sted på dokumentet som er utenfor eventWrapper, så vil den fjernes.
document.addEventListener("click", (e) => {
  if (e.target !== leggTilEventBtn && !leggTilEventWrapper.contains(e.target)) {
    leggTilEventWrapper.classList.remove("active");
  }
});

// Legger til en lytter på "input"-hendelsen på addEventTittel-elementet
  leggTilEventTittel.addEventListener("input", (e) => {
    // Begrenser teksten som brukeren skriver inn til maksimalt 60 tegn
    leggTilEventTittel.value = leggTilEventTittel.value.slice(0, 60);
  });

//legger til en lytter på input-feltet med ID "leggTilEventFra".
addEventListener("input", (e) => {
  // Fjerner alle tegn som ikke er tall eller kolon
  leggTilEventFra.value = leggTilEventFra.value.replace(/[^0-9:]/g, "");
  leggTilEventTil.value = leggTilEventTil.value.replace(/[^0-9:]/g, "");
  
  // Legger til kolon etter to tall hvis det ikke finnes allerede
  if (leggTilEventFra.value.length === 2) {
    leggTilEventFra.value += ":";
  }
  if (leggTilEventTil.value.length === 2) {
    leggTilEventTil.value += ":";
  }
  
  // Begrenser lengden på input-feltene til 5 tegn
  if (leggTilEventFra.value.length > 5) {
    leggTilEventFra.value = leggTilEventFra.value.slice(0, 5);
  }
  if (leggTilEventTil.value.length > 5) {
    leggTilEventTil.value = leggTilEventTil.value.slice(0, 5);
  }
});

//funksjon som legger til hendelser til eventsArr
leggTilEventSubmit.addEventListener("click", () => {
  const eventTittel = leggTilEventTittel.value;
  const eventTidFra = leggTilEventFra.value;
  const eventTidTil = leggTilEventTil.value;
  //hvis noen av feltene ikke er fylt ut
  if (eventTittel === "" || eventTidFra === "" || eventTidTil === "") {
    alert("Fyll ut alle feltene");
    return;
  }

const tidFraArr = eventTidFra.split(":"); 
// Deler tiden fra tekststrengen og legger den inn i en array
const tidTilArr = eventTidTil.split(":");  
// Deler tiden til tekststrengen og legger den inn i en array
if (
  tidFraArr.length !== 2 ||  
  // Sjekker om antall elementer i arrayet er forskjellig fra 2
  tidTilArr.length !== 2 ||  
  // Sjekker om antall elementer i arrayet er forskjellig fra 2
  tidFraArr[0] > 23 ||  
  // Sjekker om timene er over 23
  tidFraArr[1] > 59 ||  
  // Sjekker om minuttene er over 59
  tidTilArr[0] > 23 ||  
  // Sjekker om timene er over 23
  tidTilArr[1] > 59  
  // Sjekker om minuttene er over 59
) {
  alert("Ugyldig tidsformat");  // Viser en feilmelding hvis tidene er ugyldige
  return;  // Avslutter funksjonen
}

// Sjekker om hendelsen allerede er lagt til
let eventExist = false;
eventsArr.forEach((event) => {
  if (
    event.dag === aktivDag &&
    event.month === month + 1 &&
    event.year === year
  ) {
    event.events.forEach((event) => {
      if (event.tittel === eventTittel) {
        eventExist = true;  
        // Setter variabelen eventExist til true hvis hendelsen allerede finnes
      }
    });
  }
});
if (eventExist) {  
// Sjekker om hendelsen allerede finnes
  alert("Hendelse er allerede lagt til");  
  // Viser en feilmelding hvis hendelsen allerede finnes
  return;  
  // Avslutter funksjonen
}

const nyEvent = {
  tittel: eventTittel,  
  // Legger til tittelen til hendelsen i et nytt objekt
  tid: eventTidFra + " - " + eventTidTil,  
  // Legger til tidsintervallet til hendelsen i det nye objektet
};
console.log(nyEvent);
console.log(aktivDag);

let eventLagtTil = false;
if (eventsArr.length > 0) {
  eventsArr.forEach((item) => {
    if (
      item.dag === aktivDag &&
      item.month === month + 1 &&
      item.year === year
    ) {
      item.events.push(nyEvent);  
      // Legger til hendelsen i en eksisterende dag
      eventLagtTil = true;
    }
  });
}

if (!eventLagtTil) {  
  // Legger til en ny dag hvis hendelsen ikke ble lagt til i en eksisterende dag
  eventsArr.push({
    dag: aktivDag,
    month: month + 1,
    year: year,
    events: [nyEvent],
  });
}

leggTilEventWrapper.classList.remove("active");
//skjuler eventwrapper og tømmer input-feltene
leggTilEventTittel.value = "";
leggTilEventFra.value = "";
leggTilEventTil.value = "";
updateEvents(aktivDag);
// velger den aktive dagen og legger til hendelsesklasse hvis den ikke er lagt til 
const aktivDagEl = document.querySelector(".dag.active");
if (!aktivDagEl.classList.contains("event")) {
  aktivDagEl.classList.add("event");
}
});

//funksjon som sletter hendelsen når du trykker på eventsContainer
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    //varsel
    if (confirm("Er du sikker på at du vil slette denne hendelsen?")) {
      const eventTittel = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        //hvis eventdagen er lik den aktive dagen og hvis hendelsen på den dagen som blir lag til har samme navn som en hendelse
        // som allerede ligger der, vil den som allerede ligger der fjernes ved hjelp av splice
        if (
          event.dag === aktivDag &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.tittel === eventTittel) {
              event.events.splice(index, 1);
            }
          });
          //hvis det ikke er fler hendelser i en dag, så fjernes dagen fra eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //fjerner hendelses-klassen fra dagen
            const aktivDagEl = document.querySelector(".dag.active");
            if (aktivDagEl.classList.contains("event")) {
              aktivDagEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(aktivDag);
    }
  }
});

//funksjon som lagrer hendelsene i local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//funksjon som henter hendelsene fra local storage
function getEvents() {
  //sjekker om hendelsene allerede er lagret i local storage og returnerer hendelsen hvis den er der
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}
