const weightInput = document.querySelector('#weight');
const trainingType = document.querySelector('#training-type');
const calculateButton = document.querySelector('#calculate');
const proteinResult = document.querySelector('#protein-result');
const proteinSource = document.querySelector('#protein-source');
const generateButton = document.querySelector('#generate');
const dishCard = document.querySelector('#dish-card');
const mealChoice = document.querySelector('#meal-choice');
const chooseMealButton = document.querySelector('#choose-meal');
const mealSelectionHint = document.querySelector('#meal-selection-hint');
const resultsSection = document.querySelector('#results');
const mealOptions = document.querySelector('#meal-options');
const shoppingList = document.querySelector('#shopping-list');
const recipe = document.querySelector('#recipe');

let currentProteinInfo = null;

const proteinMeals = {
  broileri: {
    meals: [
      { name: 'Broileri-kvinoapannu paahdetuilla vihanneksilla', protein: '28 g' },
      { name: 'Kana-ceasarsalaatti täysjyväleivällä', protein: '32 g' },
      { name: 'Broilerinugetit uunissa ja bataattiranskalaiset', protein: '30 g' },
      { name: 'Broilerifajita tortillojen kanssa', protein: '29 g' },
      { name: 'Kana-grekosalaatti fetajuustolla', protein: '27 g' },
      { name: 'Kana-kasviswokki', protein: '31 g' },
      { name: 'Broileri-kikhernecurry', protein: '26 g' },
      { name: 'Kana-avokadosalaatti', protein: '25 g' },
      { name: 'Paistettu kana-riisiannos', protein: '33 g' },
      { name: 'Kanaa ja parsakaalia kerrosvuoassa', protein: '30 g' }
    ],
    shopping: ['Broilerin rintafileet', 'Kvinoa', 'Paprika', 'Parsakaali', 'Punasipuli', 'Valkosipuli', 'Oliiviöljy', 'Sitruuna', 'Täysjyväleipä'],
    recipe: {
      title: 'Broileri-kvinoapannu paahdetuilla vihanneksilla',
      ingredients: [
        '400 g broilerin rintafileetä',
        '2 dl kvinoaa',
        '1 parsakaali',
        '1 paprika',
        '1 punasipuli',
        '2 valkosipulinkynttä',
        '2 rkl oliiviöljyä',
        '1 sitruuna',
        'suolaa ja pippuria maun mukaan'
      ],
      steps: [
        'Keitä kvinoa 2 dl vedessä noin 15 minuuttia.',
        'Pilko parsakaali, paprika ja punasipuli.',
        'Sekoita vihannekset oliiviöljyn, suolan ja pippurin kanssa.',
        'Aseta broilerin palat peltille ja purista päälle sitruunamehua.',
        'Paahda uunissa 200 °C noin 20 minuuttia.',
        'Tarjoile yhdessä kvinoan kanssa.'
      ]
    }
  },
  lohi: {
    meals: [
      { name: 'Uunilohi sitruuna-tillikastikkeella', protein: '34 g' },
      { name: 'Lohi-kvinoasalaatti', protein: '29 g' },
      { name: 'Lohi-kasviswokki', protein: '31 g' },
      { name: 'Lohikeitto perunoilla', protein: '27 g' },
      { name: 'Lohi-nuudeliannos', protein: '30 g' },
      { name: 'Paistettu lohi ja parsakaali', protein: '33 g' },
      { name: 'Lohirulla fetalla ja pinaatilla', protein: '28 g' },
      { name: 'Lohi-avokadopasta', protein: '26 g' },
      { name: 'Lohi-tomaattipasta', protein: '27 g' },
      { name: 'Lohi-salaatti seesamkastikkeella', protein: '25 g' }
    ],
    shopping: ['Lohifileet', 'Kvinoa', 'Parsakaali', 'Sitruuna', 'Tuore tilli', 'Kirsikkatomaatit', 'Pinaatti', 'Valkosipuli', 'Oliiviöljy'],
    recipe: {
      title: 'Uunilohi sitruuna-tillikastikkeella',
      ingredients: [
        '500 g lohifileetä',
        '1 sitruuna',
        '2 rkl oliiviöljyä',
        '1 rkl silputtua tuoretta tilliä',
        '1 pieni parsakaali',
        '2 valkosipulinkynttä',
        'suolaa ja pippuria'
      ],
      steps: [
        'Lämmitä uuni 200 °C.',
        'Aseta lohifileet uunipellille.',
        'Purista päälle sitruunamehua ja mausta suolalla ja pippurilla.',
        'Paahda 18–20 minuuttia.',
        'Sekoita tarjoiluun tuoretta tilliä ja paahdettuja vihanneksia.'
      ]
    }
  },
  nauta: {
    meals: [
      { name: 'Härkäpapupata riisin kanssa', protein: '28 g' },
      { name: 'Jauheliha-kasviswokki', protein: '32 g' },
      { name: 'Naudanliha-tacos', protein: '30 g' },
      { name: 'Paistettua naudanlihaa ja parsakaalia', protein: '34 g' },
      { name: 'Pihvi ja uunijuurekset', protein: '36 g' },
      { name: 'Naudanliha-kikhernecurry', protein: '29 g' },
      { name: 'Härkäsalaatti fetalla', protein: '27 g' },
      { name: 'Jauheliha-pasta bolognese', protein: '31 g' },
      { name: 'Naudanliha-bulgur', protein: '28 g' },
      { name: 'Stroganoff täysjyväriisillä', protein: '30 g' }
    ],
    shopping: ['Jauheliha', 'Täysjyväriisi', 'Sipuli', 'Valkosipuli', 'Paprika', 'Tomaattimurska', 'Sienet', 'Kerma', 'Mausteet'],
    recipe: {
      title: 'Jauheliha-kasviswokki täysjyväriisillä',
      ingredients: [
        '400 g naudan jauhelihaa',
        '2 dl täysjyväriisiä',
        '1 sipuli',
        '2 valkosipulinkynttä',
        '1 paprika',
        '1 porkkana',
        '2 rkl öljyä',
        'suolaa, pippuria ja paprikajauhetta'
      ],
      steps: [
        'Keitä täysjyväriisi pakkauksen ohjeen mukaan.',
        'Paista jauheliha pannulla ja mausta.',
        'Lisää pilkotut vihannekset ja paista kypsäksi.',
        'Sekoita kaikki yhteen ja tarjoile riisin kanssa.'
      ]
    }
  },
  tofu: {
    meals: [
      { name: 'Tofu-kikhernewokki', protein: '24 g' },
      { name: 'Paistettu tofu kvinoalla', protein: '26 g' },
      { name: 'Tofu-kasviscurrykulho', protein: '25 g' },
      { name: 'Tofu-salaatti cashew-pähkinöillä', protein: '22 g' },
      { name: 'Paistettu tofu ja parsakaali', protein: '28 g' },
      { name: 'Tofu-nuudeliannos', protein: '25 g' },
      { name: 'Tofu-buddha bowl', protein: '24 g' },
      { name: 'Tofu-täytetyt paprikat', protein: '23 g' },
      { name: 'Tofu-kasvispasta', protein: '24 g' },
      { name: 'Tofu-kasviskeitto', protein: '21 g' }
    ],
    shopping: ['Tofu', 'Kikherneet', 'Kvinoa', 'Parsakaali', 'Paprikan', 'Pinaatin', 'Cashew-pähkinät', 'Soijakastike', 'Inkivääri'],
    recipe: {
      title: 'Tofu-kikhernewokki cashew-pähkinöillä',
      ingredients: [
        '400 g kiinteää tofua',
        '200 g keitettyjä kikherneitä',
        '1 paprika',
        '1 pieni parsakaali',
        '2 dl cashew-pähkinöitä',
        '3 rkl soijakastiketta',
        '1 rkl raastettua inkivääriä',
        '2 valkosipulinkynttä',
        '2 rkl öljyä'
      ],
      steps: [
        'Kuivaa tofu ja leikkaa kuutioiksi.',
        'Paista tofu pannulla rapeaksi.',
        'Lisää keitetyt kikherneet ja pilkotut vihannekset.',
        'Mausta soijalla ja inkiväärillä.',
        'Koristele cashew-pähkinöillä ja tarjoile.'
      ]
    }
  },
  pavut: {
    meals: [
      { name: 'Linssitomaattipata', protein: '22 g' },
      { name: 'Kikherne-kasviscurry', protein: '23 g' },
      { name: 'Papu-bowl täysjyväriisillä', protein: '24 g' },
      { name: 'Punainen linssikeitto', protein: '20 g' },
      { name: 'Täytetyt paprikat paahtoleivällä', protein: '21 g' },
      { name: 'Papu-kasviswrapit', protein: '22 g' },
      { name: 'Chili sin carne', protein: '25 g' },
      { name: 'Linssejä ja avokadoa', protein: '19 g' },
      { name: 'Papu-tomaattisalaatti', protein: '18 g' },
      { name: 'Pavupihvit ja perunamuusi', protein: '24 g' }
    ],
    shopping: ['Linssit', 'Kikherneet', 'Tomaattimurska', 'Sipuli', 'Valkosipuli', 'Paprika', 'Täysjyväriisi', 'Mausteet', 'Avokado'],
    recipe: {
      title: 'Linssi-tomaattipata bataatilla',
      ingredients: [
        '2 dl punaisia linssejä',
        '1 päällyspaketti bataattia (n. 300 g)',
        '1 sipuli',
        '2 valkosipulinkynttä',
        '400 g tomaattimurskaa',
        '2 rkl öljyä',
        '5 dl kasvislientä',
        'suolaa, pippuria ja savupaprikajauhetta'
      ],
      steps: [
        'Pilko sipuli ja valkosipuli.',
        'Kuullota ne kattilassa.',
        'Lisää linssit, tomaattimurska ja pilkottu bataatti.',
        'Hauduta noin 20 minuuttia, kunnes bataatti on pehmeää.',
        'Mausta ja tarjoile.'
      ]
    }
  },
  kananmunat: {
    meals: [
      { name: 'Omeletti pinaatilla ja sieniä', protein: '26 g' },
      { name: 'Munakas vihanneksilla', protein: '25 g' },
      { name: 'Paistetut munat täysjyväleivällä', protein: '22 g' },
      { name: 'Kananmunasalaatti', protein: '24 g' },
      { name: 'Munakasjuustotortilla', protein: '27 g' },
      { name: 'Kananmuna-avokadoleipä', protein: '20 g' },
      { name: 'Munakas kasvipadalla', protein: '25 g' },
      { name: 'Frittata parsakaalilla', protein: '28 g' },
      { name: 'Munakas tomaatti-basilikalla', protein: '23 g' },
      { name: 'Paistetut munat ja quinoa', protein: '22 g' }
    ],
    shopping: ['Kananmunat', 'Pinaatti', 'Sieniä', 'Fetajuusto', 'Täysjyväleipä', 'Avokado', 'Tomaatti', 'Sipuli', 'Yrtit'],
    recipe: {
      title: 'Omeletti pinaatilla, sienillä ja fetajuustolla',
      ingredients: [
        '4 kananmunaa',
        '100 g tuoretta pinaattia',
        '150 g sieniä',
        '50 g fetajuustoa',
        '2 rkl voita tai öljyä',
        'suolaa ja pippuria maun mukaan'
      ],
      steps: [
        'Riko munat kulhoon ja vatkaa ne kevyesti.',
        'Paista sienet ja pinaatti pannulla.',
        'Kaada munaseos pannulle ja lisää murustettu feta.',
        'Paista kunnes omeletti on hyytynyt.',
        'Taita ja tarjoile.'
      ]
    }
  },
  maitotuotteet: {
    meals: [
      { name: 'Rahka-marjasmoothie', protein: '18 g' },
      { name: 'Kreikkalainen jogurtti granolalla', protein: '20 g' },
      { name: 'Raejuusto-kasvissalaatti', protein: '22 g' },
      { name: 'Rahka-mysliannos', protein: '19 g' },
      { name: 'Juustoinen kasviskeitto', protein: '21 g' },
      { name: 'Maitoproteiinipannarit', protein: '24 g' },
      { name: 'Jogurttikastike salaatille', protein: '15 g' },
      { name: 'Raakasalaatti raejuustolla', protein: '18 g' },
      { name: 'Kreikkalainen jogurttibowl', protein: '19 g' },
      { name: 'Kasviskeitto parmesaanilla', protein: '17 g' }
    ],
    shopping: ['Rahka', 'Kreikkalainen jogurtti', 'Raejuusto', 'Marjat', 'Täysjyvämurot', 'Pähkinät', 'Hunaja', 'Vihannekset', 'Sitruuna'],
    recipe: {
      title: 'Rahka-marjasmoothie',
      ingredients: [
        '200 g maitorahkaa',
        '1 banaani',
        '150 g pakastemarjoja',
        '1 dl maitoa tai kasvimaitoa',
        '1 rkl hunajaa',
        '1 rkl chia-siemeniä tai pellavansiemeniä'
      ],
      steps: [
        'Sekoita blenderissä rahka, marjat ja banaani.',
        'Lisää vettä tai maitoa sopiva määrä.',
        'Blendaa tasaiseksi.',
        'Tarjoile siemenillä ja marjoilla.'
      ]
    }
  },
  seitan: {
    meals: [
      { name: 'Seitan-kasviswokki', protein: '30 g' },
      { name: 'Vegaani-tofu bowl', protein: '24 g' },
      { name: 'Seitan-tortillat', protein: '28 g' },
      { name: 'Kasvispihvit ja salaatti', protein: '22 g' },
      { name: 'Seitan-burner', protein: '29 g' },
      { name: 'Kasviscurry seitanilla', protein: '26 g' },
      { name: 'Vegaani-bolognese', protein: '23 g' },
      { name: 'Seitan-salaatti', protein: '25 g' },
      { name: 'Seitan-nuudelit', protein: '27 g' },
      { name: 'Paistettu seitan ja parsakaali', protein: '28 g' }
    ],
    shopping: ['Seitan', 'Tofu', 'Kvinoa', 'Paprika', 'Parsakaali', 'Kikherneet', 'Soijakastike', 'Inkivääri', 'Valkosipuli'],
    recipe: {
      title: 'Seitan-kasviswokki',
      ingredients: [
        '300 g seitania',
        '1 paprika',
        '1 pieni parsakaali',
        '1 sipuli',
        '2 valkosipulinkynttä',
        '2 rkl soijakastiketta',
        '1 rkl seesamiöljyä',
        '2 dl vihanneksia (esim. porkkana, herneet)',
        'suolaa ja pippuria maun mukaan'
      ],
      steps: [
        'Leikkaa seitan suikaleiksi.',
        'Paista seitan pannulla seesamiöljyssä.',
        'Lisää pilkottu sipuli, valkosipuli ja vihannekset.',
        'Mausta soijakastikkeella, suolalla ja pippurilla.',
        'Paista kunnes vihannekset ovat pehmeitä ja seitan saanut väriä.'
      ]
    }
  }
};

function getProteinNeed() {
  const weight = Number(weightInput.value);
  const multiplier = Number(trainingType.value);
  if (!weight || weight <= 0) {
    return null;
  }
  return Math.round(weight * multiplier);
}

function renderList(title, items) {
  return `
    <h3>${title}</h3>
    <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
  `;
}

function renderMealOptions(title, meals) {
  return `
    <h3>${title}</h3>
    <ul>${meals.map(meal => `<li><span>${meal.name}</span><span class="protein-label">${meal.protein}</span></li>`).join('')}</ul>
  `;
}

function renderRecipe(info) {
  return `
    <h3>Resepti: ${info.title}</h3>
    ${info.ingredients ? `<div><h4>Ainekset</h4><ul>${info.ingredients.map(item => `<li>${item}</li>`).join('')}</ul></div>` : ''}
    <div><h4>Ohjeet</h4><ol>${info.steps.map(step => `<li>${step}</li>`).join('')}</ol></div>
  `;
}

function populateMealChoices(info) {
  mealChoice.innerHTML = `
    <option value="">Valitse ehdotus</option>
    ${info.meals.map(meal => `<option value="${meal.name}">${meal.name} (${meal.protein})</option>`).join('')}
  `;
}

function findMealByName(info, name) {
  return info.meals.find(meal => meal.name === name);
}

calculateButton.addEventListener('click', () => {
  const need = getProteinNeed();
  if (!need) {
    proteinResult.textContent = 'Anna kelvollinen paino.';
    return;
  }
  proteinResult.textContent = `Proteiinitarve noin ${need} g / päivä.`;
});

generateButton.addEventListener('click', () => {
  const source = proteinSource.value;
  const info = proteinMeals[source];
  if (!info) return;

  currentProteinInfo = info;
  populateMealChoices(info);
  mealSelectionHint.textContent = 'Valitse ehdotus listasta ja paina Näytä valittu ruokalaji.';
  dishCard.hidden = false;
  resultsSection.hidden = true;
});

chooseMealButton.addEventListener('click', () => {
  const selectedMealName = mealChoice.value;
  if (!selectedMealName) {
    mealSelectionHint.textContent = 'Valitse ensin ruokalaji.';
    return;
  }

  const selectedMeal = findMealByName(currentProteinInfo, selectedMealName);
  mealSelectionHint.textContent = '';
  if (!currentProteinInfo || !selectedMeal) return;

  mealOptions.innerHTML = `
    <h3>Valittu ruokalaji</h3>
    <p>${selectedMeal.name} — ${selectedMeal.protein}</p>
  `;
  shoppingList.innerHTML = renderList('Ostoslista', currentProteinInfo.shopping);
  recipe.innerHTML = renderRecipe(currentProteinInfo.recipe);
  resultsSection.hidden = false;
});
