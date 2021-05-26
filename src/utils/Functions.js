export const cities = (event)=>{
    console.log(event);
    let listCities=[];
    // console.log(listCities);
    event.map(({ city}) => (
      listCities.includes(city) ? null : listCities.push(city)
    ))

    // console.log(listCities);
    return listCities;
}
export const countries = (event)=>{
    console.log(event);
    let listCountries=[];
    // console.log(listCountries);
    event.map(({ country}) => (
      listCountries.includes(country) ? null : listCountries.push(country )
    ))

    // console.log(listCountries);
    return listCountries;
}




export const companies = (event)=>{
    // console.log(event);
    let listCompanies=[];
    event.map(({ company }) => (
        listCompanies.includes(company) ? null : listCompanies.push(company)
    ))
    // console.log(listCompanies);

    return listCompanies;
   
}
