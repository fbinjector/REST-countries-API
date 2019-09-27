const name = document.querySelector(".country__value");
const submit = document.querySelector(".submit");
const form = document.querySelector(".input__container");
const region = document.querySelector(".region");

const loader = document.querySelector(".loader");
const container = document.querySelector(".countries");

// document.addEventListener("DOMContentLoaded", function() {
//   fetchi("https://restcountries.eu/rest/v2/all");
// });

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const url = `https://restcountries.eu/rest/v2/name/${name.value}`;
  // eslint-disable-next-line no-cond-assign
  if (name.value === "" || name.value === " ") {
    console.log("error");
  } else {
    fetching(url);
    name.value = "";
  }
});

region.addEventListener("change", function() {
  fetchi(`https://restcountries.eu/rest/v2/${region.value}`);
});

function fetching(url) {
  loader.classList.add("showItem");
  fetch(url)
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => console.log(error));
}

function fetchi(url) {
  loader.classList.add("showItem");
  fetch(url)
    .then(response => response.json())
    .then(data => displayAll(data))
    .catch(error => console.log(error));
}

function display(data) {
  loader.classList.remove("showItem");
  console.log(data[0]);
  const { name, flag, population, region, capital } = data[0];

  const info = `<article class="country">
    <img
      class="country__img"
      src="${flag}"
      alt="${name} flag"
    />
    <div class="country__info">
      <h3 class="country__name">${name}</h3>
      <h3>population: <span class="country__population">${population}</span></h3>
      <h3>region: <span class="country__region">${region}</span></h3>
      <h3>capital: <span class="country__capital">${capital}</span></h3>
    </div>
  </article>`;
  container.innerHTML = info;
}

function displayAll(result) {
  loader.classList.remove("showItem");
  let info = "";
  result.forEach(data => {
    const { name, flag, population, region, capital } = data;

    info += `<article class="country">
      <img
        class="country__img"
        src="${flag}"
        alt="${name} flag"
      />
      <div class="country__info">
        <h3 class="country__name">${name}</h3>
        <h3>population: <span class="country__population">${population}</span></h3>
        <h3>region: <span class="country__region">${region}</span></h3>
        <h3>capital: <span class="country__capital">${capital}</span></h3>
      </div>
    </article>`;
    container.innerHTML = info;
  });
}
