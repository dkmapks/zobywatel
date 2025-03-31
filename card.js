(() => {
  const confirmElement = document.querySelector(".confirm");

  const closePage = () => {
    clearClassList();
  }

  const openPage = (page) => {
    clearClassList();
    const classList = confirmElement.classList;
    classList.add("page_open");
    classList.add(`page_${page}_open`);
  }

  const clearClassList = () => {
    const classList = confirmElement.classList;
    classList.remove("page_open");
    classList.remove("page_1_open");
    classList.remove("page_2_open");
    classList.remove("page_3_open");
  }

  const time = document.getElementById("time");
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  if (!localStorage.getItem("update")) {
    localStorage.setItem("update", "24.12.2024");
  }

  const date = new Date();
  const updateText = document.querySelector(".bottom_update_value");
  updateText.innerHTML = localStorage.getItem("update");

  const update = document.querySelector(".update");
  update.addEventListener('click', () => {
    const newDate = date.toLocaleDateString("pl-PL", options);
    localStorage.setItem("update", newDate);
    updateText.innerHTML = newDate;

    scroll(0, 0);
  });

  const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

  const setClock = async () => {
    const date = new Date();
    time.innerHTML = `Czas: ${date.toLocaleTimeString()} ${date.toLocaleDateString("pl-PL", options)}`;
    await delay(1000);
    setClock();
  }

  setClock();

  const unfold = document.querySelector(".info_holder");
  unfold.addEventListener('click', () => {
    unfold.classList.toggle("unfolded");
  });

  const data = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of params.keys()) {
    data[key] = params.get(key);
  }

  document.querySelector(".id_own_image").style.backgroundImage = `url(${data['image']})`;

  let birthday = data['birthday'];
  const [day, month, year] = birthday.split(".").map(Number);
  const birthdayDate = new Date();
  birthdayDate.setDate(day);
  birthdayDate.setMonth(month - 1);
  birthdayDate.setFullYear(year);
  birthday = birthdayDate.toLocaleDateString("pl-PL", options);

  let sex = data['sex'];
  sex = sex === "m" ? "Mężczyzna" : sex === "k" ? "Kobieta" : sex;

  setData("name", data['name'].toUpperCase());
  setData("surname", data['surname'].toUpperCase());
  setData("nationality", data['nationality'].toUpperCase());
  setData("birthday", birthday);
  setData("familyName", data['familyName']);
  setData("sex", sex);
  setData("fathersFamilyName", data['fathersFamilyName']);
  setData("mothersFamilyName", data['mothersFamilyName']);
  setData("birthPlace", data['birthPlace']);
  setData("countryOfBirth", data['countryOfBirth']);
  setData("adress", `ul. ${data['adress1']}<br>${data['adress2']} ${data['city']}`);

  if (!localStorage.getItem("homeDate")) {
    const homeDay = getRandom(1, 25);
    const homeMonth = getRandom(0, 12);
    const homeYear = getRandom(2012, 2019);

    const homeDate = new Date();
    homeDate.setDate(homeDay);
    homeDate.setMonth(homeMonth);
    homeDate.setFullYear(homeYear);

    localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options));
  }

  document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate");

  const updatedMonth = year >= 2000 ? 20 + month : month;

  const later = sex.toLowerCase() === "mężczyzna" ? "0295" : "0382";

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = updatedMonth < 10 ? `0${updatedMonth}` : updatedMonth;

  const pesel = `${year.toString().substring(2)}${formattedMonth}${formattedDay}${later}7`;
  setData("pesel", pesel);

  function setData(id, value) {
    document.getElementById(id).innerHTML = value;
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
})();
