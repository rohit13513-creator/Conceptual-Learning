// The countries, states and cities a student can choose in their profile. Shared by the app (drop-down lists) and the
// server (which accepts only these). To add a city, add it under its state; to add a state or country, add a new entry.
// Keep every list in alphabetical order.
export const PLACES: Record<string, Record<string, string[]>> = {
  India: {
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Andhra Pradesh": ["Anantapur", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Nellore", "Rajahmundry", "Tirupati", "Vijayawada", "Visakhapatnam"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
    "Assam": ["Dibrugarh", "Guwahati", "Jorhat", "Silchar", "Tezpur"],
    "Bihar": ["Bhagalpur", "Darbhanga", "Gaya", "Muzaffarpur", "Patna", "Purnia"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Bhilai", "Bilaspur", "Korba", "Raipur"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Delhi": ["Delhi", "New Delhi"],
    "Goa": ["Margao", "Panaji", "Vasco da Gama"],
    "Gujarat": ["Ahmedabad", "Bhavnagar", "Gandhinagar", "Jamnagar", "Rajkot", "Surat", "Vadodara"],
    "Haryana": ["Ambala", "Bahadurgarh", "Faridabad", "Gurugram", "Hisar", "Karnal", "Kurukshetra", "Panipat", "Rewari", "Rohtak", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Dharamshala", "Kullu", "Manali", "Mandi", "Shimla", "Solan"],
    "Jammu and Kashmir": ["Anantnag", "Baramulla", "Jammu", "Srinagar"],
    "Jharkhand": ["Bokaro", "Dhanbad", "Jamshedpur", "Ranchi"],
    "Karnataka": ["Belagavi", "Bengaluru", "Hubballi-Dharwad", "Kalaburagi", "Mangaluru", "Mysuru", "Shivamogga"],
    "Kerala": ["Kannur", "Kochi", "Kollam", "Kozhikode", "Thiruvananthapuram", "Thrissur"],
    "Ladakh": ["Kargil", "Leh"],
    "Lakshadweep": ["Kavaratti"],
    "Madhya Pradesh": ["Bhopal", "Gwalior", "Indore", "Jabalpur", "Rewa", "Sagar", "Ujjain"],
    "Maharashtra": ["Amravati", "Aurangabad (Chhatrapati Sambhajinagar)", "Kolhapur", "Mumbai", "Nagpur", "Nashik", "Navi Mumbai", "Pune", "Solapur", "Thane"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong", "Tura"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Dimapur", "Kohima"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"],
    "Puducherry": ["Karaikal", "Puducherry"],
    "Punjab": ["Amritsar", "Bathinda", "Jalandhar", "Ludhiana", "Mohali", "Pathankot", "Patiala"],
    "Rajasthan": ["Ajmer", "Alwar", "Bhilwara", "Bikaner", "Jaipur", "Jodhpur", "Kota", "Sikar", "Udaipur"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli", "Vellore"],
    "Telangana": ["Hyderabad", "Karimnagar", "Nizamabad", "Secunderabad", "Warangal"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": [
      "Agra", "Aligarh", "Ayodhya", "Azamgarh", "Baghpat", "Bareilly", "Bulandshahr", "Firozabad", "Ghaziabad", "Gorakhpur",
      "Greater Noida", "Hapur", "Jhansi", "Kanpur", "Lucknow", "Mathura", "Meerut", "Moradabad", "Muzaffarnagar", "Noida",
      "Prayagraj (Allahabad)", "Saharanpur", "Varanasi",
    ],
    "Uttarakhand": ["Dehradun", "Haldwani", "Haridwar", "Roorkee", "Rudrapur", "Rishikesh"],
    "West Bengal": ["Asansol", "Durgapur", "Howrah", "Kolkata", "Siliguri"],
  },
  Canada: {
    "Alberta": ["Calgary", "Edmonton", "Lethbridge", "Medicine Hat", "Red Deer"],
    "British Columbia": ["Burnaby", "Kelowna", "Nanaimo", "Richmond", "Surrey", "Vancouver", "Victoria"],
    "Manitoba": ["Brandon", "Winnipeg"],
    "New Brunswick": ["Fredericton", "Moncton", "Saint John"],
    "Newfoundland and Labrador": ["Corner Brook", "Mount Pearl", "St. John's"],
    "Northwest Territories": ["Yellowknife"],
    "Nova Scotia": ["Dartmouth", "Halifax", "Sydney"],
    "Nunavut": ["Iqaluit"],
    "Ontario": [
      "Barrie", "Brampton", "Burlington", "Cambridge", "Chatham-Kent", "Guelph", "Hamilton", "Kingston", "Kitchener", "London",
      "Markham", "Mississauga", "Niagara Falls", "Oakville", "Oshawa", "Ottawa", "Richmond Hill", "St. Catharines", "Sudbury",
      "Thunder Bay", "Toronto", "Vaughan", "Waterloo", "Windsor",
    ],
    "Prince Edward Island": ["Charlottetown", "Summerside"],
    "Quebec": ["Gatineau", "Laval", "Longueuil", "Montreal", "Quebec City", "Sherbrooke"],
    "Saskatchewan": ["Moose Jaw", "Regina", "Saskatoon"],
    "Yukon": ["Whitehorse"],
  },
};

export const COUNTRIES = Object.keys(PLACES);

export const statesOf = (country: string): string[] => Object.keys(PLACES[country] || {});

export const citiesOf = (country: string, state: string): string[] => (PLACES[country] || {})[state] || [];

// Called "State" for India and "Province / Territory" for Canada.
export const stateWord = (country: string): string => (country === "Canada" ? "Province / Territory" : "State");
