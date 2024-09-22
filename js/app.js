// VARIABLES

const brand = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimum = document.querySelector('#minimo');
const maximum = document.querySelector('#maximo');
const doors = document.querySelector('#puertas');
const transmission = document.querySelector('#transmision');
const color = document.querySelector('#color');
// contenedor para los resultados
const result = document.querySelector('#result');
// var aux para llenar dropdownlist
const maxYear = new Date().getFullYear();
const mintYear = maxYear - 10;

// para filtrar datos de busqueda
const dataSearch = {
    brand: '',
    year: '',
    minimum: '',
    maximum: '',
    doors: '',
    transmission: '',
    color: '',
}

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    showAutomobilesHTML(autos);//muestra los automoviles en el HTML
    fillDropDownList();//llena la lista despegable de año
});

// eventos para los seleccionadores (dropdownlists) de busqueda
brand.addEventListener('change', (event) => {
    dataSearch.brand = event.target.value;
    automobileFilter();
});

year.addEventListener('change', (event) => {
    dataSearch.year = parseInt(event.target.value);
    automobileFilter();
});

minimum.addEventListener('change', (event) => {
    dataSearch.minimum = parseInt(event.target.value);
    automobileFilter();
});

maximum.addEventListener('change', (event) => {
    dataSearch.maximum = parseInt(event.target.value);
    automobileFilter();
});

doors.addEventListener('change', (event) => {
    dataSearch.doors = parseInt(event.target.value);
    automobileFilter();
});

transmission.addEventListener('change', (event) => {
    dataSearch.transmission = event.target.value;
    automobileFilter();

});

color.addEventListener('change', (event) => {
    dataSearch.color = event.target.value;
    automobileFilter();

});

// FUNCIONES
function showAutomobilesHTML(autos) {
    updateAutomobilesHTML();//limpia los autos del html previo al filtro
    autos.forEach(auto => {
        // crea un parrafo para cada automovil
        const automobileHTML = document.createElement('p');
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        automobileHTML.textContent = `
        ${marca} ${modelo} ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        // inserta el HTML
        result.appendChild(automobileHTML);
    });
}

function updateAutomobilesHTML() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

function fillDropDownList() {
    for (let i = maxYear; i >= mintYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        // adiciona las opciones del año a la lista despegable (drowdownlist)
        year.appendChild(option);

    }
}

// Filtra en base a la búsqueda
function automobileFilter() {
    // encadenamiento del filter
    const result = autos.filter(brandFilter).filter(yearFilter).filter(minimumFilter).filter(maximumFilter).filter(doorsFilter)
        .filter(transmissionFilter).filter(colorFilter);

    if (result.length) {
        showAutomobilesHTML(result);

    } else {
        errorMessage();
    }
}

function errorMessage() {
    updateAutomobilesHTML();
    const withoutResults = document.createElement('div');
    withoutResults.classList.add('alerta', 'error');
    withoutResults.textContent = 'There are not result, Try again';
    result.appendChild(withoutResults);
}

function brandFilter(auto) {
    const { brand } = dataSearch;
    if (brand) {
        return auto.marca === brand;
    }
    return auto;
}

function yearFilter(auto) {
    const { year } = dataSearch;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function minimumFilter(auto) {
    const { minimum } = dataSearch;
    if (minimum) {
        return auto.precio >= minimum;
    }
    return auto;
}

function maximumFilter(auto) {
    const { maximum } = dataSearch;
    if (maximum) {
        return auto.precio <= maximum;
    }
    return auto;
}

function doorsFilter(auto) {
    const { doors } = dataSearch;
    if (doors) {
        return auto.puertas === doors;
    }
    return auto;
}

function transmissionFilter(auto) {
    const { transmission } = dataSearch;
    if (transmission) {
        return auto.transmision === transmission;
    }
    return auto;
}

function colorFilter(auto) {
    const { color } = dataSearch;
    if (color) {
        return auto.color === color;
    }
    return auto;
}
