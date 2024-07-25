const getData = (renderThumbFunction, setPicturesDataFunction) => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((picturesData) => {
      renderThumbFunction(picturesData);
      setPicturesDataFunction(picturesData);
    });
};

export { getData };
