
ternurines = ['Freya Chocolate', 
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
 * Función que retorna un ternurin en la lista.
 */

function randomTernurin() {
    let random = Math.floor(Math.random() * ternurines.length);
    return ternurines[random];
}

module.exports.randomTernurin = randomTernurin;