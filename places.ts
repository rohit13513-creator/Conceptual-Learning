// The countries and cities a student can choose in their profile. Shared by the app (drop-down lists) and the server
// (which accepts only these). To add a country or a city, add it here -- keep each list in alphabetical order.
export const PLACES: Record<string, string[]> = {
  India: [
    "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad (Prayagraj)", "Amritsar", "Aurangabad", "Bareilly", "Bengaluru", "Bhopal",
    "Bhubaneswar", "Bulandshahr", "Chandigarh", "Chennai", "Coimbatore", "Dehradun", "Delhi", "Dhanbad", "Faridabad", "Ghaziabad",
    "Greater Noida", "Gurugram", "Guwahati", "Gwalior", "Haridwar", "Hapur", "Hyderabad", "Indore", "Jabalpur", "Jaipur",
    "Jalandhar", "Jammu", "Jamshedpur", "Jodhpur", "Kanpur", "Kochi", "Kolkata", "Kota", "Lucknow", "Ludhiana",
    "Madurai", "Mathura", "Meerut", "Moradabad", "Mumbai", "Muzaffarnagar", "Mysuru", "Nagpur", "Nashik", "Navi Mumbai",
    "Noida", "Panipat", "Patna", "Pune", "Raipur", "Rajkot", "Ranchi", "Saharanpur", "Shimla", "Sonipat",
    "Surat", "Thane", "Thiruvananthapuram", "Udaipur", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam",
  ],
  Canada: [
    "Barrie", "Brampton", "Burlington", "Burnaby", "Calgary", "Cambridge", "Chatham-Kent", "Edmonton", "Fredericton", "Guelph",
    "Halifax", "Hamilton", "Kingston", "Kitchener", "Lethbridge", "London", "Markham", "Mississauga", "Moncton", "Montreal",
    "Niagara Falls", "Oakville", "Oshawa", "Ottawa", "Quebec City", "Red Deer", "Regina", "Richmond Hill", "Saint John", "Saskatoon",
    "St. Catharines", "St. John's", "Sudbury", "Surrey", "Thunder Bay", "Toronto", "Vancouver", "Vaughan", "Victoria", "Waterloo",
    "Windsor", "Winnipeg",
  ],
};

export const COUNTRIES = Object.keys(PLACES);

export const citiesOf = (country: string): string[] => PLACES[country] || [];
