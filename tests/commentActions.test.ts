import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

const user = {
  email: "testing@user.ee",
  password: "test",
};

const newComment = {
  content: "this comment was created for testing purposes",
};

describe("Comment actions test", () => {
  describe("GET /api/v1/comments", () => {
    it("shows all comments and returns 200", async () => {
      const login = await request(app).post("/api/v1/login").send(user);
      const token = login.body.token;
      const response = await request(app)
        .get("/api/v1/comments")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
    });
    describe("GET api/v1/comments/3", () => {
      it("gets comment with an id of 1 and returns 200", async () => {
        const login = await request(app).post("/api/v1/login").send(user);
        const token = login.body.token;
        const response = await request(app)
          .get("/api/v1/comments/3")
          .set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal("Comment");
      });
      describe("POST api/v1/comments", () => {
        it("creates a comment and returns 200", async () => {
          const login = await request(app).post("/api/v1/login").send(user);
          const token = login.body.token;
          const response = await request(app)
            .post("/api/v1/comments")
            .send(newComment)
            .set("Authorization", `Bearer ${token}`);
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(200);
          expect(response.body.success).to.be.true;
        });
        describe("DELETE api/v1/comments/6", () => {
          it("deletes the comment and returns 200", async () => {
            const login = await request(app).post("/api/v1/login").send(user);
            const token = login.body.token;
            const response = await request(app)
              .delete("/api/v1/projects/6")
              .set("Authorization", `Bearer ${token}`);
            expect(response.body).to.be.a("object");
            expect(response.statusCode).to.equal(200);
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.equal("Comment deleted");
          });
        });
      });
    });
  });
});
