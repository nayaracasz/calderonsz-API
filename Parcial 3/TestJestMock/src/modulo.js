export var ternurines = ['Freya Chocolate', 
                'Sharon Fennec', 
                'Kippie Waddle', 
                'Ginger Snowdrift', 
                'Kate Perlwinkle', 
                'Avril Husky', 
                'Nancy Brightfield', 
                'Bran Highbranch', 
                'Lona Dale', 
                'Saffron Walnut'];

/**
 * Función que retorna un ternurin en la lista. (funcion no determinista)
 */

export function randomTernurin() {
    let random = Math.floor(Math.random() * ternurines.length);
    return ternurines[random];
}