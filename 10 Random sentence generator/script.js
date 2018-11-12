{
  console.log(`Random sentence generator made by falbor45 (https://github.com/falbor45)`)

  const randomizeStrLength = (perc, string) => {
    "use strict";
    let rand = Math.random();
    let str = string;
    if (rand < perc) {
      str += string;
      return randomizeStrLength(perc, str);
    }
    return str;
  };
  const generateSentenceTemplate = () => {
    "use strict";
    let template = "";
    let temp = final => {
      template += randomizeStrLength(0.2, "%adj ");
      template += randomizeStrLength(0, "%noun ");
      if (final) {
        return null;
      }
      template += randomizeStrLength(0, "%verb ");
    };

    temp();
    temp(true);

    return template;
  };
  const generateRandomSentence = () => {
    "use strict";
    let nouns = words.nouns;
    let verbs = words.verbs;
    let adjectives = words.adjectives;
    let sentenceTemplate = generateSentenceTemplate().split(' ');

    for (let i = 0; i < sentenceTemplate.length - 1; i++) {
      let keymap = {
        '%noun': nouns[Math.floor(Math.random() * nouns.length)],
        '%adj': adjectives[Math.floor(Math.random() * adjectives.length)],
        '%verb': verbs[Math.floor(Math.random() * verbs.length)]
      }
      sentenceTemplate[i] = sentenceTemplate[i].replace(new RegExp(sentenceTemplate[i], 'g'), keymap[sentenceTemplate[i]])
    }

    sentenceTemplate[0] = sentenceTemplate[0].charAt(0).toUpperCase() + sentenceTemplate[0].slice(1);
    return sentenceTemplate.join(' ');
  }

  document.getElementById('generate').onclick = () => document.getElementById('result').innerHTML = generateRandomSentence();
}
