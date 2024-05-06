const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Pruebas al CRUD', () => {
    it('debería devolver un estado 200 (que regrese todos los personajes)', (done) => {
        chai.request('http://localhost:3000')
            .get('/characters/')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });
});