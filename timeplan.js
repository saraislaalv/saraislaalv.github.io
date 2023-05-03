// Hent date-elementet fra html-dokumentet (DOM)
const datePicker = document.getElementById("datePicker");

// Sett verdien av date-elementet til dagens dato i formatet yyyy-mm-dd
const today = new Date();
datePicker.value = today.toISOString().slice(0, 10);



// Funksjon som kalles når datovelgeren endrer verdi
function getDay(){
    let inputDate = new Date(datePicker.value); // Opprett et nytt Date-objekt basert på datovelgerens verdi
    let weekday = inputDate.getDay(); // Finn ukedagen basert på det nye Date-objektet

    if (weekday === 1) {
        document.getElementById("ukedag").innerHTML = "Mandagens timeplan";
    } else if (weekday === 2) {
        document.getElementById("ukedag").innerHTML = "Tirsdagens timeplan";
    } else if (weekday === 3) {
        document.getElementById("ukedag").innerHTML = "Onsdagens timeplan";
    } else if (weekday === 4) {
        document.getElementById("ukedag").innerHTML = "Torsdagens timeplan";
    } else if (weekday === 5) {
        document.getElementById("ukedag").innerHTML = "Fredagens timeplan";
    } else {
        document.getElementById("ukedag").innerHTML = "Ingen timeplan denne dagen";
    }


}

// Kall funksjonen når siden lastes inn for å vise ukedagen for dagens dato
    getDay();

function getWeek(date) {
    // Kopierer datoen for å unngå endring av originaldatoen
  var d = new Date(date);
  // Setter tiden til midnatt for å unngå tidsproblemer
  d.setHours(0,0,0,0);
  // Setter dagen til torsdag for å få den korrekte ukenummeret ifølge ISO-standard
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  // Henter årstallet
  var year = d.getFullYear();
  // Henter antall dager siden starten av året
  var dayOfYear = Math.floor((d - new Date(year, 0, 1)) / 86400000);
  // Henter ukenummeret ved å dele antall dager med 7 og legge til 1
  var weekNumber = Math.ceil((dayOfYear + 1) / 7);
  return weekNumber;

}
  

  //Definerer de ulike fagene, lærerne og rommene til de ulike øktene

    let økt1fag
    let økt1lærer
    let økt1rom

    let økt2fag
    let økt2lærer
    let økt2rom

    let økt3fag 
    let økt3lærer
    let økt3rom

    let økt4fag
    let økt4lærer
    let økt4rom



//Funksjon som finner timeplanen utfra hvilken ukedag det er og om det er partall eller oddetallsuke.
function dagensTimeplan(){
    let inputDate = new Date(datePicker.value);
    let weekday = inputDate.getDay(); 
    let weekNumber= getWeek(datePicker.value)

    if (weekday===1 && weekNumber % 2 === 0){
        økt1fag = "Fysikk"
        økt1lærer =  "Johanne"
        økt1rom =  "FYS"

        økt2fag = "IT"
        økt2lærer = "Didrik"
        økt2rom = "B203"

        økt3fag = "Matematikk"
        økt3lærer = "Anders"
        økt3rom = "E202"

        økt4fag = "Norsk";
        økt4lærer = "Morten";
        økt4rom = "D102";
        }
    else if(weekday===1 && weekNumber % 2 != 0){

        økt1fag = "Fri"
        økt1lærer= ""
        økt1rom= ""

        økt2fag= "IT"
        økt2lærer= "Didrik"
        økt2rom= "B203"

        økt3fag= "Matematikk"
        økt3lærer= "Anders"
        økt3rom= "E202"

        økt4fag = "Norsk";
        økt4lærer = "Morten";
        økt4rom = "D102";

    }
    else if(weekday===2){
        økt1fag = "Fri"
        økt1lærer =  ""
        økt1rom =  ""

        økt2fag = "Samfunnsøkonomi"
        økt2lærer = "Marit"
        økt2rom = "NAT"

        økt3fag = "Kroppsøving"
        økt3lærer = "Kjell petter"
        økt3rom = "Gjønneshallen"

        økt4fag = "Fri";
        økt4lærer = "";
        økt4rom = "";
    }
    else if(weekday===3){
        økt1fag = "IT"
        økt1lærer =  "Anders"
        økt1rom =  "B203"

        økt2fag = "Matematikk"
        økt2lærer = "Anders"
        økt2rom = "E202"

        økt3fag = "Fysikk"
        økt3lærer = "Johanne"
        økt3rom = "FYS"

        økt4fag = "Fri";
        økt4lærer = "";
        økt4rom = "";
    }
    else if(weekday===4 && weekNumber % 2 === 0){
        økt1fag = "Fri"
        økt1lærer =  ""
        økt1rom =  ""

        økt2fag = "Fri"
        økt2lærer = ""
        økt2rom = ""

        økt3fag = "Norsk"
        økt3lærer = "Morten"
        økt3rom = "B203"

        økt4fag = "Matematikk";
        økt4lærer = "Anders";
        økt4rom = "E202";
    }
    else if(weekday===4 && weekNumber % 2 != 0){
        økt1fag = "Fri"
        økt1lærer =  ""
        økt1rom =  ""

        økt2fag = "Fri"
        økt2lærer = ""
        økt2rom = ""

        økt3fag = "Norsk"
        økt3lærer = "Morten"
        økt3rom = "B203"

        økt4fag = "Samfunnsøkonomi";
        økt4lærer = "Marit";
        økt4rom = "NAT";
    }
    else if(weekday===5 && weekNumber % 2 === 0){
        økt1fag = "Samfunnsøkonomi"
        økt1lærer =  "Marit"
        økt1rom =  "NAT"

        økt2fag = "Fysikk"
        økt2lærer = "Johanne"
        økt2rom = "FYS"

        økt3fag = "Hitorie"
        økt3lærer = "Bjørn"
        økt3rom = "D102"

        økt4fag = "IT";
        økt4lærer = "Didrik/Anders";
        økt4rom = "B203";
    }
    else if(weekday===5 && weekNumber % 2 != 0){
        økt1fag = "Samfunnsøkonomi"
        økt1lærer =  "Marit"
        økt1rom =  "NAT"

        økt2fag = "Fysikk"
        økt2lærer = "Johanne"
        økt2rom = "FYS"

        økt3fag = "Hitorie"
        økt3lærer = "Bjørn"
        økt3rom = "D102"

        økt4fag = "Klassens time";
        økt4lærer = "Bjørn";
        økt4rom = "D102";
    }
    else if(weekday===6 || weekday===7){
        økt1fag = ""
        økt1lærer =  ""
        økt1rom =  ""

        økt2fag = ""
        økt2lærer = ""
        økt2rom = ""

        økt3fag = ""
        økt3lærer = ""
        økt3rom = ""

        økt4fag = " ";
        økt4lærer = "";
        økt4rom = "";
    }
}


    //kaller funskjonen som finner timeplanen utfra hvilken dag det er
    dagensTimeplan()

function visTimeplan(){

    // Henter de ulike øktene fra DOM
    let økt1_fag = document.querySelector(".økt1fag");
    let økt1_lærer = document.querySelector(".økt1lærer");
    let økt1_rom = document.querySelector(".økt1rom");
  
    let økt2_fag = document.querySelector(".økt2fag");
    let økt2_lærer = document.querySelector(".økt2lærer");
    let økt2_rom = document.querySelector(".økt2rom");
  
    let økt3_fag = document.querySelector(".økt3fag");
    let økt3_lærer = document.querySelector(".økt3lærer");
    let økt3_rom = document.querySelector(".økt3rom");
  
    let økt4_fag = document.querySelector(".økt4fag");
    let økt4_lærer = document.querySelector(".økt4lærer");
    let økt4_rom = document.querySelector(".økt4rom");
  
    // Setter inn informasjonen for hver økt i de respektive cellene
    økt1_fag.textContent = økt1fag;
    økt1_lærer.textContent = økt1lærer;
    økt1_rom.textContent = økt1rom;
  
    økt2_fag.textContent = økt2fag;
    økt2_lærer.textContent = økt2lærer;
    økt2_rom.textContent = økt2rom;
  
    økt3_fag.textContent = økt3fag;
    økt3_lærer.textContent = økt3lærer;
    økt3_rom.textContent = økt3rom;
  
    økt4_fag.textContent = økt4fag;
    økt4_lærer.textContent = økt4lærer;
    økt4_rom.textContent = økt4rom;
  }
  
  //kaller funskonen som viser timeplanen i nettsiden
visTimeplan()

function updateTimeplan(){
    getDay()
    dagensTimeplan()
    visTimeplan()
}

// Lytt etter endringer i datovelgeren og oppdater ukedagen når det skjer
datePicker.addEventListener("input", updateTimeplan);
