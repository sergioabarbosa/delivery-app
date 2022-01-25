const chai = require('chai');
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const { userMock } = require('../mocks');
const userService = require('../../services/user');

chai.use(chaiHttp);

const { expect } = chai;

describe('PUT/users/:id', () => {  
  let token;
  before(async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
    });
    token = response.body.token;
  });

  describe('Em caso de erro interno', () => {
    let response;
    before(async () => {
      stub(userService, 'update').rejects();
      response = await chai.request(app)
        .put('/users/4')
        .set('Authorization', token)
        .send(userMock.updatedUser);

      await userService.update.restore();
    });

    it('retorna o código de status 500', () => {
      expect(response).to.have.status(500);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Internal Error"', () => {
      expect(response.body.message).to.be.equal('Internal Error');
    });
  });

  describe('Não é possível atualizar usuário', () => {
    describe('com algum dado inválido', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .put('/users/4')
          .set('Authorization', token)
          .send(userMock.invalidUser);
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid fields"', () => {
        expect(response.body.message).to.be.equal('Invalid fields');
      });
    });

    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .put('/users/3')
          .send(userMock.invalidUser);
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Token not found"', () => {
        expect(response.body.message).to.be.equal('Token not found');
      });
    });

    describe('com um token de autenticação inválido ou expirado', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .put('/users/3')
          .set('Authorization', 'tokenIvalido')
          .send(userMock.newUser);
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Expired or invalid token"', () => {
        expect(response.body.message).to.be.equal('Expired or invalid token');
      });
    });

    describe('com um usuário que não pode atualizar usuários', () => {
      let response;
      before(async () => {
        const { body: { token: customerToken } } = await chai.request(app)
          .post('/login')
          .send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
          });

        response = await chai.request(app)
          .put('/users/4')
          .set('Authorization', customerToken)
          .send(userMock.newUser);
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Unauthorized user"', () => {
        expect(response.body.message).to.be.equal('Unauthorized user');
      });
    });
    
    describe('que não exista no banco de dados', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .put('/users/999')
          .set('Authorization', token)
          .send(userMock.updatedUser);
      });

      it('retorna o código de status 404', () => {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "User does not exist"', () => {
        expect(response.body.message).to.be.equal('User does not exist');
      });
    });
  });

  describe('É possível atualizar usuário com dados corretos e token válido', () => {
    let response;
    before(async () => {
      response = await chai.request(app)
      .put('/users/4')
      .set('Authorization', token)
      .send(userMock.updatedUser);
    });
    
    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "message", "status"', () => {
      expect(response.body).to.have.all.keys('id', 'message', 'status');
    });

    it('a propriedade "message" possui o texto "User updated"', () => {
      expect(response.body.message).to.be.equal('User updated');
    });
  });
});
