var words = [
    "अतुल्यकालिक","टूट","क़ायम","घटना","पकड़ो","स्थिर","श्रेणी","त्रुटिखोज","पूर्वनिर्धारित","मिटाओ","करना","अन्यथा","अन्यथा","निर्यात","विस्तारित","असत्य","अंतत","केलिए","क्रिया","अगर","आयात","में","उदाहरणस्वरूप","चलो","नवीन","अमान्य","सन्दूक","वापस","चाहिए","बदले","ये","फेंके","सत्य","प्रयत्न","प्रकार","इस्तेमाल","घर","रिक्त","जबकि","द्वारा",
]
var hindi_characters = [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'ऋ',
    'क', 'ख', 'ग', 'घ', 'ङ',
    'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म',
    'य', 'र', 'ल', 'व',
    'श', 'ष', 'स', 'ह',
    'क्ष', 'त्र', 'ज्ञ', 'श्र', 'ढ़', 'ड़'
]
// var hindi_numerals = [०,१,२,३,४,५,६,७,८,९]

var HjsParse = [
  /^\(\((\0|[\u0900-\u097F])\)=>\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}\)+(;|\n)$/mu,
  /^अतुल्यकालिक\s\([\u0900-\u097F]|\0\)\{([\u0900-\u097F]|\0||\r)+(;|\n)$\}+(;|\n)$/mu,
  /^अतुल्यकालिक\sक्रिया\s[\u0900-\u097F]\(\)\{([\u0900-\u097F]|\0|\r)+(;|\n)$\}+(;|\n)$/mu,
  /^क्रिया\s[\u0900-\u097F]\((\0|[\u0900-\u097F])\)\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}+(;|\n)$/mu,
  /^(घर)?(स्थिर)?(चलो)\s[\u0900-\u097F]=\[\]|\{\}|[\u0900-\u097F]|\((\0|[\u0900-\u097F])\)=>\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}+(;|\n)$/mu,

]
var Hjs = 
  /^\(\((\0|[\u0900-\u097F])\)=>\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}\)+(;|\n)$|अतुल्यकालिक\\s?=\([\u0900-\u097F]|\0\)\{([\u0900-\u097F]|\0||\r)+(;|\n)$\}+(;|\n)$|अतुल्यकालिक\\s\bक्रिया\s[\u0900-\u097F]\(\)\{([\u0900-\u097F]|\0|\r)+(;|\n)$\}+(;|\n)$|\bक्रिया\s[\u0900-\u097F]\((\0|[\u0900-\u097F])\)\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}+(;|\n)$|\b(घर)?\b(स्थिर)?\b(चलो)\s[\u0900-\u097F]=\[\]|\{\}|[\u0900-\u097F]|\((\0|[\u0900-\u097F])\)=>\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}+(;|\n)$/mu

var Hj = 
  /^\(\((\0|[\u0900-\u097F])\)=>\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}\)+(;|\n)$|(\s|\t)[\u0900-\u097F](\s|\t)[\u0900-\u097F](\s|\t)[\u0900-\u097F](\s|\t)\([\u0900-\u097F]\)\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}\)+(;|\n)$|(\s|\t)[\u0900-\u097F](\s|\t)[\u0900-\u097F](\s|\t)=(\s|\t)\([\u0900-\u097F]\)(\s|\t)=>\{(\0|[\u0900-\u097F]|\r)+(;|\n)$\}\)+(;|\n)$/mu
var s = /(\s|\t)/
const HINDI_LETTERS = '[\u0900-\u097F]';
const IDENTIFIER = `${HINDI_LETTERS}+`;
const FUNCTION_DECLARATION = `क्रिया\\s${IDENTIFIER}\\(\\)\\{[\\s\\S]*\\}`;
const ASYNC_FUNCTION = `अतुल्यकालिक\\sक्रिया\\s${IDENTIFIER}\\(\\)\\{[\\s\\S]*\\}`;
const VARIABLE_DECLARATION = `(घर\\s)?(स्थिर\\s)?चलो\\s${IDENTIFIER}\\s*=\\s*.*;?`;



const fullRegex = new RegExp(
  `^(${FUNCTION_DECLARATION}|${ASYNC_FUNCTION}|${VARIABLE_DECLARATION})$`,
  'mu'
);
var dd = 'sss'
var w = /[a-z]/
const input = "अतुल्यकालिक क्रिया नमस्ते() { चलो क = ५; }";
const input1 = "क्रिया नमस्ते() { चलो क = ५; }";
const input2 = "चलो क = ५;";
const input3 = "अतुल्यकालिक";
console.log(w.test(dd))
console.log(`ChatGPT: `,fullRegex.test(input)); // true or false ; Returning False
console.log(`ChatGPT: `,fullRegex.test(input1)); // true or false ; Returning False
console.log(`ChatGPT: `,fullRegex.test(input2)); // true or false ; Returning False
console.log(`ChatGPT: `,fullRegex.test(input3)); // true or false ; Returning False
console.log(`Akash :`,Hjs.test(input)); // true or false ; Returning True
console.log(`Akash :`,Hjs.test(input1)); // true or false ; Returning True
console.log(`Akash :`,Hjs.test(input2)); // true or false ; Returning True
console.log(`Akash :`,Hjs.test(input3)); // true or false ; Returning True
console.log(`Akash1 :`,Hj.test(input)); // true or false ; Returning True
console.log(`Akash1 :`,Hj.test(input1)); // true or false ; Returning True
console.log(`Akash1 :`,Hj.test(input2)); // true or false ; Returning True
console.log(`Akash1 :`,Hj.test(input3)); // true or false ; Returning True
// console.log(HjsParse.exec(input)); // true or false
// console.log(HjsParse.unicode = input); // true or false