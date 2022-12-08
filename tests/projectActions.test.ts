import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

const user = {
  email: "testing@user.ee",
  password: "test",
};

const newProject = {
  title: "test",
  content: "this project was created for testing purposes",
  userId: 3,
  statusId: 1
};

const updatedProject = {
  title: "updated test",
  content: "this post was updated for a test",
  userId: 3,
  statusId: 1
};

describe("Project actions test", () => {
  describe("GET /api/v1/projects", () => {
    it("shows all projects and returns 200", async () => {
      const login = await request(app).post("/api/v1/login").send(user);
      const token = login.body.token;
      const response = await request(app)
        .get("/api/v1/projects")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.projects).to.a("array");
    });
    describe("GET /api/v1/projects/6", () => {
      it("gets project with an id of 6 and returns 200", async () => {
        const login = await request(app).post("/api/v1/login").send(user);
        const token = login.body.token;
        const response = await request(app)
          .get("/api/v1/projects/6")
          .set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal("Project");
      });
      describe("GET api/v1/projects/6/comments", () => {
        it("displays comments of the project with an id of 6 and returns 200", async () => {
          const login = await request(app).post("/api/v1/login").send(user);
          const token = login.body.token;
          const response = await request(app)
            .get("/api/v1/projects/6/comments")
            .set("Authorization", `Bearer ${token}`);
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(200);
          expect(response.body.success).to.be.true;
        });
        describe("POST api/v1/projects", () => {
          it("creates a post and returns 200", async () => {
            const login = await request(app).post("/api/v1/login").send(user);
            const token = login.body.token;
            const response = await request(app)
              .post("/api/v1/projects")
              .send(newProject)
              .set("Authorization", `Bearer ${token}`);
            expect(response.body).to.be.a("object");
            expect(response.statusCode).to.equal(200);
            expect(response.body.success).to.be.true;
          });
          describe("PATCH api/v1/projects/8", () => {
            it("updates the project with new data and returns 200", async () => {
              const login = await request(app).post("/api/v1/login").send(user);
              const token = login.body.token;
              const response = await request(app)
                .patch("/api/v1/projects/8")
                .send(updatedProject)
                .set("Authorization", `Bearer ${token}`);
              expect(response.body).to.be.a("object");
              expect(response.statusCode).to.equal(200);
              expect(response.body.success).to.be.true;
              expect(response.body.message).to.equal("Project updated");
            });
            describe("DELETE api/v1/projects/8", () => {
              it("deletes the project and returns 200", async () => {
                const login = await request(app)
                  .post("/api/v1/login")
                  .send(user);
                const token = login.body.token;
                const response = await request(app)
                  .delete("/api/v1/projects/8")
                  .set("Authorization", `Bearer ${token}`);
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
  });
});
