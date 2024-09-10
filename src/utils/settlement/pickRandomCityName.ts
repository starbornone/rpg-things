import { cityNames } from '@/data';

function pickRandom(array: any[]) {
  let length = array.length,
    index = Math.floor(Math.random() * length);
  return array[index];
}

export function pickRandomCityName(options?: { country?: string }) {
  let countryKeys = Object.keys(cityNames),
    country,
    city;

  if (options && options.country) {
    country = options.country;
  } else {
    country = pickRandom(countryKeys);
  }

  if (country) {
    const nameList = cityNames[country as keyof typeof cityNames];
    city = pickRandom(nameList);
  } else {
    throw 'No such city';
  }

  return city;
}
