reorderLogFiles = function(logs) {
  numlines = []
  alphalines = []

  for (const line of logs) {
    split = line.split(' ')
    isdigit = !isNaN(split[1])
    isdigit ? numlines.push(line) : alphalines.push(line)
  }

  alphalines = alphalines.sort((s1, s2) => {
    split1 = s1.split(' ')
    split2 = s2.split(' ')
    rest1 = split1.slice(1).join(' ')
    rest2 = split2.slice(1).join(' ')

    // compare line content for equality
    if (rest1 === rest2) {
      // use id to solve the tie
      return split1[0] > split2[0] ? 1 : -1
    }

    return rest1 > rest2 ? 1 : -1
  })

  return alphalines.concat(numlines)
}

logs = [
  "q 1893219 538166 847",
  "etz 256211322 4 011",
  "5jo cfb thznt ouuf e",
  "ci apsxrohjpuj jqbc",
  "4l01 lffvrkmeznb wi",
  "c1wq ubghhryp mmsr m",
  "l 441680621620785765",
  "tka 347027603519160",
  "f1 2696043606002872",
  "j 07689868625 21 2 5",
  "d8e 090 6573 002817",
  "8djc1 xpzr d j xbky",
  "k6em nbeqvcy ubjm zn",
  "86m5l 6978487342 333",
  "k3y 32 383 8 501343",
  "8pgq kzjdyss fsh cl",
  "twiq fq pjaswaqikt o",
  "xrtx m ynrxcdmohk no",
  "vqggs wkvtvipq e sbm",
  "p18 tjgpnyzuwrunslx"
]
console.log(reorderLogFiles(logs))
