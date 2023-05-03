// Henter inn knappen og innskrivingsfeltet
const oppgaveInput = document.getElementById("oppgaveInput");
const leggTilOppgaveBtn = document.getElementById("leggTil-event-btn");

// Henter oppgavelisten med local storage
let oppgaveListe = JSON.parse(localStorage.getItem("oppgaveListe")) || [];

// Lager en funksjon som legger inn oppgavene jeg skrier inn
function lagOppgave(oppgave) {
	// Lager en ny liste
	const li = document.createElement("li");
	li.innerText = oppgave;

	// Lager en knapp som sletter oppgavene
	const deleteBtn = document.createElement("span"); 
    //Span brukes til å gruppere og stilisere tekst eller andre elementer innenfor en tekstblokk.
	deleteBtn.classList.add("delete");
	deleteBtn.innerText = "X";
	deleteBtn.addEventListener("click", () => {
		// Fjerner oppgaven fra listen og fra local storage
		oppgaveListe = oppgaveListe.filter(item => item !== oppgave);
		localStorage.setItem("oppgaveListe", JSON.stringify(oppgaveListe));
		li.remove();
	});

	// legger til slett-knappen til objektene i listen
	li.appendChild(deleteBtn);

	// legger til objektene i listen til listen i html-dokumentet 
	document.getElementById("oppgaveListe").appendChild(li);
}

// Funksjon som lager en ny oppgave
function nyOppgave() {
	// Henter oppgavetekst fra inputfeltet
	const oppgave = oppgaveInput.value.trim();

	// Hvis oppgaven ikke er tom
	if (oppgave !== "") {
		// Legger til oppgaven til listen og local storage
		oppgaveListe.push(oppgave);
		localStorage.setItem("oppgaveListe", JSON.stringify(oppgaveListe));

		// Lager et nytt oppgaveobjekt og legger det til i listen
		lagOppgave(oppgave);

		// Tømmer input-feltet
		oppgaveInput.value = "";
	}
}

// legger til en event listener til knappen og legger til en ny oppgave
leggTilOppgaveBtn.addEventListener("click", nyOppgave);

// legger til en event listener til input feltet og legger til en ny oppgave når enter-knappen trykkes på
oppgaveInput.addEventListener("keydown", event => {
	if (event.key === "Enter") {
		event.preventDefault();
		nyOppgave();
	}
});

// Laster de eksisterende oppgavene fra local storage
oppgaveListe.forEach(oppgave => lagOppgave(oppgave));
