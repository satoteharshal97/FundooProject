import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import app from '../../src/index';

//global varaiable for token
let jwtToken;
let noteToken;
let noteToken1;
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  //Registration
  describe('POST', () => {
    it('given new user when added should return status 201', (done) => {
      const userDetails = {
        firstName: "Mohak",
        lastName: "Jain",
        email: "morokah275@jo6s.com",
        password: "mohak@123"
      };
      request(app)
        .post('/api/v1/users/registration')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });


  //Login
  describe('POST', () => {
    it('should return token and status should be 200', (done) => {
      const loginDetails = {
        email: "morokah275@jo6s.com",
        password: "mohak@123"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          noteToken = res.body.token;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


  //Create new note
  describe('POST', () => {
    it('should return 201 when new note is created', (done) => {
      const newNote = {
        Title: "Mohak note 1",
        Description: "note 1"
      };
      request(app)
        .post('/api/v1/note')
        .set('Authorization', `Bearer ${noteToken}`)
        .send(newNote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  //Get all notes by objectId
  describe('GET', () => {
    it('should return 201 when new note is created', (done) => {
    
      request(app)
        .post('/api/v1/note')
        .set('Authorization', `Bearer ${noteToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });


});








//--------------------------------

/*  describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  //Registration
  describe('POST', () => {
    it('given new user when added should return status 201', (done) => {
      const userDetails = {
        firstName: "Mohak",
        lastName: "Jain",
        email: "morokah275@jo6s.com",
        password: "mohak@123"
      };
      request(app)
        .post('/api/v1/users/registration')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });

    /* describe('POST', () => {
      it('given new invalid user when added should return status 400', (done) => {
        const userDetails = {
          firstName: 456546,
          lastName: "Jain",
          email: "morokah275@jo6s.com",
          password: "mohak@123"
        };
        request(app)
          .post('/api/v1/users/registration')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(500);
            done();
          });
      });
    }); */

//Login
/* describe('POST', () => {
  it('should return token and status should be 200', (done) => {
    const loginDetails = {
      email: "morokah275@jo6s.com",
      password: "mohak@123"
    };
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });
}); */

//Forget Password

/* describe('POST', () => {
  it('should return token in body', (done) => {
    const uniqueDetails = {
      email: "morokah275@jo6s.com",
    };
    request(app)
      .post('/api/v1/users/forgetPassword')
      .send(uniqueDetails)
      .end((err, res) => {
        jwtToken = res.body.token;
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        // expect(res.token).to.be.an(jwtToken);
        done();
      });
  });
}); */
/* describe('PUT', () => {
  it('when password is reset shoul give success message  and get status 101', (done) => {
    const newPassword = {
      password: "bob@123"
    };
    request(app)
      .put('/api/v1/users/resetPassword')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newPassword)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });
}); */
/* describe('POST', () => {
  it('should return 201 when new note is created', (done) => {
    const newNote = {
      Title: "Mohak note 1",
      Description: "note 1"
    };
    request(app)
      .post('/api/v1/note')
      .set('Authorization', `Bearer ${noteToken}`)
      .send(newNote)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();
      });
  });
}); */
/* describe('GET', () => {
  it('should return 201 when new note is created', (done) => {
    request(app)
      .get('/api/v1/note')
      .set('Authorization', `Bearer ${noteToken1}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });
}); */
  // });
// });  */
