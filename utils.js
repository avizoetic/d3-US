const stateTopoJson = {
  "01": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/AL-01-alabama-counties.json",
  "02": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/AK-02-alaska-counties.json",
  "04": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/AZ-04-arizona-counties.json",
  "05": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/AR-05-arkansas-counties.json",
  "06": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/CA-06-california-counties.json",
  "08": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/CO-08-colorado-counties.json",
  "09": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/CT-09-connecticut-counties.json",
  10: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/DE-10-delaware-counties.json",
  12: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/FL-12-florida-counties.json",
  13: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json",
  15: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/HI-15-hawaii-counties.json",
  16: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/ID-16-idaho-counties.json",
  17: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/IL-17-illinois-counties.json",
  18: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/IN-18-indiana-counties.json",
  19: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/IA-19-iowa-counties.json",
  20: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/KS-20-kansas-counties.json",
  21: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/KY-21-kentucky-counties.json",
  22: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/LA-22-louisiana-parishes.json",
  23: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/ME-23-maine-counties.json",
  24: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/MD-24-maryland-counties.json",
  25: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/MA-25-massachusetts-counties.json",
  26: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/MI-26-michigan-counties.json",
  27: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/MN-27-minnesota-counties.json",
  28: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/MS-28-mississippi-counties.json",
  29: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/MO-29-missouri-counties.json",
  30: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/MT-30-montana-counties.json",
  31: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NE-31-nebraska-counties.json",
  32: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NV-32-nevada-counties.json",
  33: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NH-33-new-hampshire-counties.json",
  34: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NJ-34-new-jersey-counties.json",
  35: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NM-35-new-mexico-counties.json",
  36: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NY-36-new-york-counties.json",
  37: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NC-37-north-carolina-counties.json",
  38: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/ND-38-north-dakota-counties.json",
  39: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/OH-39-ohio-counties.json",
  40: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/OK-40-oklahoma-counties.json",
  41: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/OR-41-oregon-counties.json",
  42: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/PA-42-pennsylvania-counties.json",
  44: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/RI-44-rhode-island-counties.json",
  45: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/SC-45-south-carolina-counties.json",
  46: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/SD-46-south-dakota-counties.json",
  47: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/TN-47-tennessee-state-senate-districts-2015.json",
  48: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/TX-48-texas-counties.json",
  49: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/UT-49-utah-counties.json",
  50: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/VT-50-vermont-counties.json",
  51: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/VA-51-virginia-counties.json",
  53: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WA-53-washington-counties.json",
  54: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WV-54-west-virginia-counties.json",
  55: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WI-55-wisconsin-counties.json",
  56: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WY-56-wyoming-counties.json",
  72: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/PR-72-puerto-rico-municipios.json",
};

//source: https://raw.githubusercontent.com/CivilServiceUSA/us-states/master/data/states.json
const stateWebsites = [
  {
    code: "AL",
    state: "Alabama",
    website: "http://www.alabama.gov",
  },
  {
    code: "AK",
    state: "Alaska",
    website: "http://alaska.gov",
  },
  {
    code: "AZ",
    state: "Arizona",
    website: "https://az.gov",
  },
  {
    code: "AR",
    state: "Arkansas",
    website: "http://arkansas.gov",
  },
  {
    code: "CA",
    state: "California",
    website: "http://www.ca.gov",
  },
  {
    code: "CO",
    state: "Colorado",
    website: "https://www.colorado.gov",
  },
  {
    code: "CT",
    state: "Connecticut",
    website: "http://www.ct.gov",
  },
  {
    code: "DE",
    state: "Delaware",
    website: "http://delaware.gov",
  },
  {
    code: "FL",
    state: "Florida",
    website: "http://www.myflorida.com",
  },
  {
    code: "GA",
    state: "Georgia",
    website: "http://georgia.gov",
  },
  {
    code: "HI",
    state: "Hawaii",
    website: "https://www.ehawaii.gov",
  },
  {
    code: "ID",
    state: "Idaho",
    website: "https://www.idaho.gov",
  },
  {
    code: "IL",
    state: "Illinois",
    website: "https://www.illinois.gov",
  },
  {
    code: "IN",
    state: "Indiana",
    website: "http://www.in.gov",
  },
  {
    code: "IA",
    state: "Iowa",
    website: "https://www.iowa.gov",
  },
  {
    code: "KS",
    state: "Kansas",
    website: "https://www.kansas.gov",
  },
  {
    code: "KY",
    state: "Kentucky",
    website: "http://kentucky.gov",
  },
  {
    code: "LA",
    state: "Louisiana",
    website: "http://louisiana.gov",
  },
  {
    code: "ME",
    state: "Maine",
    website: "http://www.maine.gov",
  },
  {
    code: "MD",
    state: "Maryland",
    website: "http://www.maryland.gov",
  },
  {
    code: "MA",
    state: "Massachusetts",
    website: "http://www.mass.gov",
  },
  {
    code: "MI",
    state: "Michigan",
    website: "http://www.michigan.gov",
  },
  {
    code: "MN",
    state: "Minnesota",
    website: "https://mn.gov",
  },
  {
    code: "MS",
    state: "Mississippi",
    website: "http://www.ms.gov",
  },
  {
    code: "MO",
    state: "Missouri",
    website: "https://www.mo.gov",
  },
  {
    code: "MT",
    state: "Montana",
    website: "http://mt.gov",
  },
  {
    code: "NE",
    state: "Nebraska",
    website: "http://www.nebraska.gov",
  },
  {
    code: "NV",
    state: "Nevada",
    website: "http://nv.gov",
  },
  {
    code: "NH",
    state: "New Hampshire",
    website: "https://www.nh.gov",
  },
  {
    code: "NJ",
    state: "New Jersey",
    website: "http://www.state.nj.us",
  },
  {
    code: "NM",
    state: "New Mexico",
    website: "http://www.newmexico.gov",
  },
  {
    code: "NY",
    state: "New York",
    website: "http://www.ny.gov",
  },
  {
    code: "NC",
    state: "North Carolina",
    website: "http://www.nc.gov",
  },
  {
    code: "ND",
    state: "North Dakota",
    website: "http://www.nd.gov",
  },
  {
    code: "OH",
    state: "Ohio",
    website: "https://ohio.gov",
  },
  {
    code: "OK",
    state: "Oklahoma",
    website: "https://www.ok.gov",
  },
  {
    code: "OR",
    state: "Oregon",
    website: "http://www.oregon.gov",
  },
  {
    code: "PA",
    state: "Pennsylvania",
    website: "http://www.pa.gov",
  },
  {
    code: "RI",
    state: "Rhode Island",
    website: "https://www.ri.gov",
  },
  {
    code: "SC",
    state: "South Carolina",
    website: "http://www.sc.gov",
  },
  {
    code: "SD",
    state: "South Dakota",
    website: "http://sd.gov",
  },
  {
    code: "TN",
    state: "Tennessee",
    website: "https://www.tn.gov",
  },
  {
    code: "TX",
    state: "Texas",
    website: "https://www.texas.gov",
  },
  {
    code: "UT",
    state: "Utah",
    website: "https://utah.gov",
  },
  {
    code: "VT",
    state: "Vermont",
    website: "http://vermont.gov",
  },
  {
    code: "VA",
    state: "Virginia",
    website: "https://www.virginia.gov",
  },
  {
    code: "WA",
    state: "Washington",
    website: "http://www.wa.gov",
  },
  {
    code: "WV",
    state: "West Virginia",
    website: "http://www.wv.gov",
  },
  {
    code: "WI",
    state: "Wisconsin",
    website: "https://www.wisconsin.gov",
  },
  {
    code: "WY",
    state: "Wyoming",
    website: "http://www.wyo.gov",
  },
];

const getStateUrl = (id) => {
  //   console.log({ id });
  return stateTopoJson[id] || null;
};

const correctedCountyName = (countyName, state) => {
  // console.log(countyName, state)
  let name = countyName
    .replace("Saint Marys", "St. Mary's")
    .replace("Saint ", "St. ")
    .replace("Sainte ", "Ste. ")
    .replace("Debaca", "De Baca")
    .replace("Dona Ana", "Do�a Ana")
    .replace("Queen Annes", "Queen Anne's")
    .replace("Mc Kean", "McKean");

  if (state !== "Texas") {
    name = name.replace("La Salle", "LaSalle"); // if not Texas
  }
  if (state === "South Dakota") {
    name = name.replace("Shannon ", "Oglala Lakota "); // renamed
  }
  return name.toLowerCase();
};

const openStateSite = (stateCode) => {
  // console.log(stateCode)
  const { website } = stateWebsites.find((data) => data.code === stateCode);
  window.open(website, "_blank");
};
