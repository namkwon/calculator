#!/usr/bin/env node

function calculation(exp){
  let sub_expr = exp.match(/\((.*)\)/)
  let operator = exp.split(' ').slice(0,1).pop()
  let index = (operator === 'add') ? 4 : 9
  if(sub_expr){
    let num1 = (sub_expr.index === index) ? exp.split(' ').slice(-1).pop() : exp.slice(0,sub_expr.index-1).split(' ').pop()
    let num2 = sub_expr.pop()

    if(operator === 'add'){
      return parseInt(num1) + calculation(num2)
    } else if(operator === 'multiply') {
      return parseInt(num1) * calculation(num2)
    }
  } else {
    let num = exp.split(' ')
    if(num[0] === 'add'){
      return parseInt(num[1]) + parseInt(num[2])
    } else if(num[0] === 'multiply') {
      return parseInt(num[1]) * parseInt(num[2])
    }
  }
}


var args = require('minimist')(process.argv.slice(2));

if (args._.length === 1) {
  let argv = args._[0]
  if (typeof argv === 'number') {
    console.log(`${argv}`)
  } else if (typeof argv === 'string') {
    argv = argv.match(/\((.*)\)/).pop()
    console.log(`=> ${calculation(argv)}`)
  } else {
    console.error('Check usage. argument can be integer or string.')
    process.exit(-1)
  }
} else {
  console.error('Check usage. only one argument can be used.')
  process.exit(-1)
}
