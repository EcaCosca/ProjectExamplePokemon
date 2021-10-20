const pokemons = localStorage.getItem("pokemons");

if (!!pokemons) {
  console.log("Getting pokemons from local storage");
  displayPokemons(JSON.parse(pokemons));
  console.log(JSON.parse(pokemons))
} else {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log("THEN RESPONSE" + json);
      localStorage.setItem("pokemons", JSON.stringify(json.results));
      displayPokemons(json.results);
    });
}

function displayPokemons(array) {
  const pokemonsContainer = document.querySelector("#pokemons");

  array.forEach(function (element, index) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("p");
    const button = document.createElement("button");

    console.log("element")
    console.log(element)

    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`;
    name.innerText = "#"+index+1 + ". " + element.name[0].toUpperCase() + element.name.slice(1);
    button.innerText = "Details";

    console.log(element)

    div.className = "card";
    // button.classList = "btn btn-primary";

    div.addEventListener("click", function () {
      getPokemon(element.url, function (pokemon) {
        displayPokemon(pokemon);
      });
    });

    div.append(name, img);

    pokemonsContainer.append(div);
  });
}

function getPokemon(url, cb) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      cb(json);
    });
}

function displayPokemon(pokemon) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";

  const div = document.createElement("div");
  const left = document.createElement("div");
  const right = document.createElement("div");
  const button = document.createElement("button");

  const img = document.createElement("img");
  const name = document.createElement("p");
  const weight = document.createElement("p");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  name.innerText = `NAME: ${pokemon.name.toUpperCase()}`;
  weight.innerText = `WEIGHT: ${pokemon.weight}`;
  button.innerText = "X";

  const types = displayTypes(pokemon.types);
  const stats = displayStats(pokemon.stats);

  button.addEventListener("click", function () {
    popup.style.display = "none";
  });

  popup.append(div);

  right.append(stats);
  left.append(img, name, weight, types);
  div.append(left, right, button);

  console.log(pokemon);
}

function displayTypes(types) {
  const div = document.createElement("div");
  const select = document.createElement("select");
  const title = document.createElement("p");

  types.forEach(function (element) {
    const option = document.createElement("option");
    option.innerText = element.type.name;
    select.append(option);
  });

  div.style.display = "flex";
  div.style.gap = "0.5rem";
  title.innerText = "TYPES: ";

  div.append(title, select);

  return div;
}

function displayStats(stats) {
  const container = document.createElement("container");

  stats.forEach(function (element) {
    const stat = document.createElement("p");
    stat.innerText = `${element.stat.name.toUpperCase()}: ${element.base_stat}`;
    container.append(stat);
  });

  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.paddingTop = "2rem";
  container.style.gap = "0.5rem";

  return container;
}
