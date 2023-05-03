const prøverListe = document.getElementById('prøver-liste');


function leggTilPrøve() {
	// Henter input-feltene
	const fagInput = document.getElementById('fag');
	const datoInput = document.getElementById('dato');

	// Lager et nytt liste-element med prøveinformasjonen
	const nyPrøve = document.createElement('li');
	nyPrøve.innerHTML = `
		<span>${fagInput.value}</span>
		<span>${datoInput.value}</span>
		<button type="button" onclick="slettPrøve(this)">Slett</button>
	`;

	// Legger til den nye prøven til prøver-liste
	prøverListe.appendChild(nyPrøve);

	// Lagrer prøveinformasjonen i localStorage
	const prøve = {
		fag: fagInput.value,
		dato: datoInput.value
	};
	const prøver = JSON.parse(localStorage.getItem('prøver')) || [];
	prøver.push(prøve);
	localStorage.setItem('prøver', JSON.stringify(prøver));

	// Tømmer input-feltene
	fagInput.value = '';
	datoInput.value = '';
}


function slettPrøve(prøveElement) {
	// Finner indeksen til prøven i listen
	const prøveIndex = Array.prototype.indexOf.call(prøverListe.children, prøveElement.parentNode);

	// Fjerner prøven fra prøver-listen
	prøverListe.removeChild(prøveElement.parentNode);

	// Fjerner prøven fra localStorage
	const prøver = JSON.parse(localStorage.getItem('prøver')) || [];
	prøver.splice(prøveIndex, 1);
	localStorage.setItem('prøver', JSON.stringify(prøver));
}


window.onload = function() {
	// Henter prøveinformasjon fra localStorage og viser den på siden
	const prøver = JSON.parse(localStorage.getItem('prøver')) || [];
	prøver.forEach(function(prøve) {
		const nyPrøve = document.createElement('li');
		nyPrøve.innerHTML = `
			<span>${prøve.fag}</span>
			<span>${prøve.dato}</span>
			<button type="button" onclick="slettPrøve(this)">Slett</button>
		`;
		prøverListe.appendChild(nyPrøve);
	});
};

