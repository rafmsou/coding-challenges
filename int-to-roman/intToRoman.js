/**
 * @param {number} num
 * @return {string}
 */

const dict = {
  '1': 'I',
  '4': 'IV',
  '5': 'V',
  '9': 'IX',
  '10': 'X',
  '40': 'XL',
  '50': 'L',
  '90': 'XC',
  '100': 'C',
  '400': 'CD',
  '500': 'D',
  '900': 'CM',
  '1000': 'M',
}

var intToRoman = function(num, acc = "") {
  
  if (num <= 0) return acc
  if (dict[num]) return acc + dict[num]
    
  if (num < 5) {
    if (num == 4) return intToRoman(num - 4, acc + 'IV')
    
    return intToRoman(num - 1, acc + 'I')
  }
  
  if (num < 10) {
    if (num == 9) return intToRoman(num - 9, acc + 'IX')
    
    return intToRoman(num - 5, acc + 'V')
  }
  
  if (num < 50) {
    if (num > 40) return intToRoman(num - 40, acc + 'XL')
    
    return intToRoman(num - 10, acc + 'X')
  }
  
  if (num < 100) {
    if (num > 90) return intToRoman(num - 90, acc + 'XC')
    
    return intToRoman(num - 50, acc + 'L')
  }

  if (num < 500) {
    if (num > 400) return intToRoman(num - 400, acc + 'CD')
    
    return intToRoman(num - 100, acc + 'C')
  }
  
  if (num < 1000) {
    if (num > 900) return intToRoman(num - 900, acc + 'CM')
    
    return intToRoman(num - 500, acc + 'D')
  }
  
  return intToRoman(num - 1000, acc + 'M')
};

