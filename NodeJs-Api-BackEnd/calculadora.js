'use strict'

var params = process.argv.slice(2);

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla1 = `La Suma es: ${numero1 + numero2}`;
var plantilla2 = `La Resta es: ${numero1 - numero2}`;
var plantilla3 = `La Division es: ${numero1 / numero2}`;
var plantilla4 = `La Multiplicacion es: ${numero1 * numero2}`;

console.log(plantilla1);
console.log(plantilla2);
console.log(plantilla3);
console.log(plantilla4);

/*
console.log(numero1);
console.log(numero2);

console.log(plantilla);
console.log("Hola Mundo con Node JS");
*/
