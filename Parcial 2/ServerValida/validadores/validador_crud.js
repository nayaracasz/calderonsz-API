const { check } = require('express-validator');

function validaCharacter() {
    return [  check('name', 'El nombre del personaje sólo debe contener letras.').isAlpha(),
              check('family', 'El nombre de la familia sólo debe contener letras.').isAlpha(),
              check('role', 'El rol sólo debe contener letras.').isAlpha()
            ]
}

module.exports.validaCharacter = validaCharacter;