import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

const user = {
  email: "testing@user.ee",
  password: "test"
}

const newComment = {
  content: "this comment was created for testing purposes",
};


describe("Comment actions test", () => {
  describe("GET /api/v1/comments", () => {
    it("shows all comments and returns 200", async () => {
      const login = await request(app).post('/api/v1/login').send(user);
      const response = await request(app).get("/api/v1/comments");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.projects).to.a("array");
    });
    describe("GET api/v1/comments/1", () => {
      it("gets comment with an id of 1 and returns 200", async () => {
        const login = await request(app).post('/api/v1/login').send(user);
        const response = await request(app).get("/api/v1/comments/1");
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal("Comments");
      });
      describe("POST api/v1/comments", () => {
        it("creates a comment and returns 200", async () => {
        const login = await request(app).post('/api/v1/login').send(user);
          const response = await await request(app)
            .post("api/v1/comments")
            .send(newComment);
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(200);
          expect(response.body.success).to.be.true;
          expect(response.body.message).to.equal(
            "Comment with id ${id} created"
          );
        });
          describe("DELETE api/v1/comments/:id", () => {
            it("deletes the comment and returns 200", async () => {
              const login = await request(app).post('/api/v1/login').send(user);
              const response = await request(app).delete("api/v1/projects/:id");
              expect(response.body).to.be.a("object");
              expect(response.statusCode).to.equal(200);
              expect(response.body.success).to.be.true;
              expect(response.body.message).to.equal("Project deleted");
            });
          });
        });
      });
    });
  });

