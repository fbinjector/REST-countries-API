const name = document.querySelector(".country__value");
const form = document.querySelector(".input__container");
const region = document.querySelector(".region");
const loader = document.querySelector(".loader");
const container = document.querySelector(".countries");
const mode = document.querySelector(".mode");

mode.addEventListener("change", function() {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    trans();
    document.querySelector(".modeLabel").innerHTML = "light mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    trans();
    document.querySelector(".modeLabel").innerHTML = "dark mode";
  }
});

const trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

document.addEventListener("DOMContentLoaded", function() {
  fetchi("https://restcountries.eu/rest/v2/all");
});

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
  const { name, flag, population, region, capital, topLevelDomain: domain } = data[0];
  const currencies = data[0].currencies[0].code;
  const languages = data[0].languages[0].name;

  const info = `<article class="country info">
  <img
    class="country__img"
    src="${flag}"
    alt="flag"
  />
  <div class="country__info">
    <h3 class="country__name">${name}</h3>
    <h3>
      population: <span class="country__population">${population}</span>
    </h3>
    <h3>region: <span class="country__region">${region}</span></h3>
    <h3>capital: <span class="country__capital">${capital}</span></h3>
    <button class="show-hide">see more</button>
  </div>
  <div class="country__info--hidden">
    <h3>
      currencie: <span class="country__currencie">${currencies}</span>
    </h3>
    <h3>
      language: <span class="country__languages">${languages}</span>
    </h3>
    <h3>
      top level domain: <span class="country__domain">${domain}</span>
    </h3>
    <h3>
      borders countries:
      <span>
        <ul class="border-countries">
        </ul>
      </span>
    </h3>
  </div>
</article>`;
  container.innerHTML = info;

  const { borders } = data[0];
  const borderCountries = [];
  borders.forEach(countrie => {
    borderCountries.push(countrie);
  });
  const border = document.querySelector(".border-countries");
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < borderCountries.length; i++) {
    const singleBorder = document.createElement("li");
    singleBorder.innerHTML = borderCountries[i];
    border.appendChild(singleBorder);
  }

  const showInfo = document.querySelector(".show-hide");
  const hiddenInfo = document.querySelector(".country__info--hidden");
  showInfo.addEventListener("click", () => {
    hiddenInfo.classList.add("showItem");
  });
}

// function displayAll(result) {
//   loader.classList.remove("showItem");
//   let info = "";
//   result.forEach(data => {
//     const { name, flag, population, region, capital } = data;

//     info += `<article class="country">
//       <img
//         class="country__img"
//         src="${flag}"
//         alt="${name} flag"
//       />
//       <div class="country__info">
//         <h3 class="country__name">${name}</h3>
//         <h3>population: <span class="country__population">${population}</span></h3>
//         <h3>region: <span class="country__region">${region}</span></h3>
//         <h3>capital: <span class="country__capital">${capital}</span></h3>
//       </div>
//     </article>`;
//     container.innerHTML = info;
//   });
// }

const search = document.querySelector(".input");
const list = document.querySelector(".match-list");

// Get states
const getStates = async () => {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  countries = await response.json();
};

// Filter states
const searchStates = input => {
  // Get matches to current text input
  let matches = countries.filter(country => {
    const regex = new RegExp(`^${input}`, "gi");
    return country.name.match(regex);
  });

  // Clear when input or matches are empty
  if (input.length === 0) {
    matches = [];
    list.innerHTML = "";
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(match => `<li class="name">${match.name}</li>`).join("");
    list.innerHTML = html;

    // add the country name to the input
    const countryNames = Array.from(document.querySelectorAll(".name"));
    countryNames.forEach(country => {
      country.addEventListener("click", () => {
        search.value = country.textContent;
        list.innerHTML = "";
        search.focus();
      });
    });
  }
};

window.addEventListener("DOMContentLoaded", getStates);
search.addEventListener("input", () => searchStates(search.value));

window.addEventListener("keypress", e => {
  console.log(e);
});
