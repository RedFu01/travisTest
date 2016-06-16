const resources ={
  de_DE:{
    START_LOCATION: 'Ort der Anmietung',
    START_LOCATION_DEFAULT:'Abhol-Station wählen',
    END_LOCATION_DEFAULT:'Rückgabe-Station wählen',
    START_DATE: 'Ausleihe',
    DIFFERENT_END_LOCATION:'Abweichender Rückgabeort',
    END_DATE:'Rückgabe',
    FIND_RENTAL_CAR:'Mietwagen finden',
    EXECUTE_SEARCH: 'Suchen'
  }
}

export function getLanguage(language){
  return resources[language] || resources['de_DE']
}
