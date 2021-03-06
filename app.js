window.addEventListener("load", () => {
  let long;
  let lat;
  let tempratureDescription = document.querySelector(".temprature-description");
  let tempratureDegree = document.querySelector(".temprature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempratureSection = document.querySelector('.temprature');
  const tempratureSpan = document.querySelector('.temprature span')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // set dom elements from api
          tempratureDegree.textContent = temperature;
          tempratureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
        //   FORMULA FOR CELCIUS
        let celcius = (temperature-32)*(5/9);
                  // seticon
          setIcons(icon, document.querySelector(".icon"));

        //   changing to cels
            tempratureSection.addEventListener('click',()=>{
                if(tempratureSpan.textContent==='F'){
                    tempratureSpan.textContent='C';
                    tempratureDegree.textContent= Math.floor(celcius);
                }
                else{
                    tempratureSpan.textContent='F';
                    tempratureDegree.textContent = temperature;

                }
            })
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
