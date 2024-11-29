fetch("https://dog.ceo/api/breeds/image/random")
  .then((response) => response.json())
  .then((dog) => console.log(dog));
