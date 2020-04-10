
function canBeBalanced(expression, maxRepAllowed) {
  if (!possibleToBalance(expression)) return false;

  let replacements = 0;
  expression = removeBalancedBrackets(expression);

  while (expression.indexOf('>') > -1) {
    expression = expression.replace('>', '');
    replacements++;
  }

  return replacements <= maxRepAllowed && expression === '';
}

function removeBalancedBrackets(expression) {
  let exp = expression;
  while (exp.indexOf('<>') > -1) {
    exp = exp.replace('<>', '');
  }
  return exp;
}

function replaceClosingBrackets(expression) {
  while (expression.indexOf('>') > -1) {
    expression = expression.replace('>', '<>');
  }
  return expression;
}

function possibleToBalance(expression) {
  const lastChar = expression[expression.length - 1];
  return lastChar !== '<';
}

/// Write your code into this function
function BalancedOrNot(expressions, maxReplacements) {
  let results = [];

  for (let i = 0; i < expressions.length; i++) {
    const exp = expressions[i];
    const maxRepAllowed = maxReplacements[i];
    if (canBeBalanced(exp, maxRepAllowed))
      results[i] = 1
    else
      results[i] = 0
  }

  return results;//it must return an array of integers.
}
/////////////// Do not modify anything below this line ////////////////////

process.stdin.resume();
process.stdin.setEncoding('ascii');

let raw_input = '';

process.stdin.on('data', function (data) {
  raw_input += data;
});

process.stdin.on('end', () => {
  return BalancedOrNot.apply(null, preparedData())
    .forEach(function (r) {
      process.stdout.write(r + "\n");
    });
});


function preparedData() {
  const
    input              = raw_input.split('\n'),
    worlds_count       = parseInt(input.shift(), 10);

  return [
    input.slice(0, worlds_count),
    input.splice(
      worlds_count + 1,
      input.indexOf( worlds_count.toString() )
    )
  ];
}
