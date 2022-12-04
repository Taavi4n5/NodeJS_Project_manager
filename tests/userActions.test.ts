import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

const newUser = {
  firstName: "Mait",
  lastName: "Kaal",
  email: "mati@kaal.ee",
  password: "mati",
};

const loginUser = {
  email: "mati@kaal.ee",
  password: "mati",
};

const updatedUser = {
  firstName: "Mati",
  lastName: "Kaal",
  email: "mati@kaal.ee",
  password: "mati",
};

describe("User actions test", () => {
  describe("POST /api/v1/users", () => {
    it("registers new user and returns 200", async () => {
      const response = await request(app).post("/api/v1/users").send(newUser);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal("User with id ${id} created");
    });
    describe("PATCH api/v1/users/:id", () => {
      it("updates the user with new data and returns 200", async () => {
        const login = await request(app).post("/api/v1/login").send(loginUser);
        const response = await request(app)
          .patch("/api/v1/users/:id")
          .send(updatedUser);
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal("User updated successfully");
      });
      describe("GET api/v1/users", () => {
        it("gives user info about his user and returns 200", async () => {
          const login = await request(app)
            .post("/api/v1/login")
            .send(loginUser);
          const response = await request(app).get("api/v1/users");
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(200);
          expect(response.body.success).to.be.true;
          expect(response.body.message).to.a("string");
        });
        describe("DELETE api/v1/users/:id", () => {
          it("deletes the user and returns 200", async () => {
            const login = await request(app)
              .post("/api/v1/login")
              .send(loginUser);
            const response = await request(app).delete("api/v1/users/:id");
            expect(response.body).to.be.a("object");
            expect(response.statusCode).to.equal(200);
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.equal("User deleted");
          });
        });
      });
    });
  });
});
