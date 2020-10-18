const { expect } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

describe('Micro-service tests', () => {
    let token;
    let test_user = { username: "joshua", password: "pass" };
    let document = { firstName: "Albert", contactDetails: { phoneNumbers: [] } };
    let patch = [
        { op: "replace", path: "/firstName", value: "Joachim" },
        { op: "add", path: "/lastName", value: "Wester" },
        { op: "add", path: "/contactDetails/phoneNumbers/0", value: { number: "555-123" } }
    ]
    let patched_document = { firstName: "Joachim", lastName: "Wester", contactDetails: { phoneNumbers: [{ number: "555-123" }] } }

    describe('Authentication', () => {
        it('Failed login if username or password is missing', (done) => {
            chai.request(server)
                .post('/api/auth')
                .send({ username: "test", password: null })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    done();
                })

        })

        it('Return a JWT if username and password are both provided', (done) => {
            chai.request(server)
                .post('/api/auth')
                .send(test_user)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    // expect(res.body).to.have("token")
                    token = res.body.token;
                    done();
                })
        })
    })

    describe('Json Patch', () => {

        it('it should patch document', (done) => {
            chai.request(server)
                .patch('/api/json-patch')
                .set("bearer", token)
                .send({ document, patch })
                .end((err, res) => {
                    const { content } = res.body

                    expect(res.status).to.equal(200)
                    expect(content.firstName).to.equal(patched_document.firstName);
                    done();

                })
        })

        it('it should prevent patch if token is invalid', (done) => {
            chai.request(server)
                .patch('/api/json-patch')
                .set('bearer', "blahblahblah")
                .send({ document, patch })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    done()
                })
        })


    })

})


