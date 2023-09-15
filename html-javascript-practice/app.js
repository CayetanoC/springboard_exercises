// let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
// let {numPlanets, yearNeptuneDiscovered} = facts;

// let planetFacts = {
//     numPlanets: 8,
//     yearNeptuneDiscovered: 1846,
//     yearMarsDiscovered: 1659
//   };

//   let [first, second, third] = ["Maya", "Marisa", "Chi"];

//   let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
//     "Raindrops on roses",
//     "whiskers on kittens",
//     "Bright copper kettles",
//     "warm woolen mittens",
//     "Brown paper packages tied up with strings"
//   ]

const raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest})

function vowelCount(string) {
    const vowelCounts = new Map();
    const vowels = 'a,e,i,o,u';
    string = string.toLowerCase();

    for(const char of string) {
        if(vowels.includes(char)) {
            vowelCounts.set(char, (vowelCounts.get(char) || 0) + 1);
        }
    }
return vowelCounts;
}