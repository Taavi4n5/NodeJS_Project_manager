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

const user = {
  email: "mati@kaal.ee",
  password: "mati",
};

const updatedUser = {
  firstName: "Mati",
  lastName: "Kaal",
  password: "mati",
};

describe("User actions test", () => {
  describe("POST /api/v1/users", () => {
    it("registers new user and returns 200", async () => {
      const response = await request(app).post("/api/v1/users").send(newUser);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
    });
    describe("PATCH api/v1/users/2", () => {
      it("updates the user with new data and returns 200", async () => {
 const login = await request(app).post("/api/v1/login").send(user);
      const token = login.body.token;
        const response = await request(app)
          .patch("/api/v1/users/2")
          .send(updatedUser).set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal("User updated successfully");
      });
      describe("GET api/v1/users", () => {
        it("gives user info about his user and returns 200", async () => {
 const login = await request(app).post("/api/v1/login").send(user);
      const token = login.body.token;
          const response = await request(app).get("/api/v1/users").set("Authorization", `Bearer ${token}`);
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(200);
          expect(response.body.success).to.be.true;
          expect(response.body.message).to.a("string");
        });
        describe("DELETE api/v1/users/2", () => {
          it("deletes the user and returns 200", async () => {
 const login = await request(app).post("/api/v1/login").send(user);
      const token = login.body.token;
            const response = await request(app).delete("/api/v1/users/:id").set("Authorization", `Bearer ${token}`);
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
