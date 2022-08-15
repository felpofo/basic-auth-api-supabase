import request from "supertest";
import axios from "axios";
import { server } from "../src/server";
import { LoginResponse } from "../src/services";

describe("Api", () => {
  afterAll(() => { server.close(); });

  describe("Logged Out", () => {
    it("Should login", (done) => {
      request(server)
        .post("/login")
        .send({ email: "user@user.com", password: "user123" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).toBe("Successfully Logged In");
          expect(res.body.user).not.toBeUndefined();
          expect(res.body.session).not.toBeUndefined();

          done();
        });
    });

    it("Should not access user content", (done) => {
      request(server)
        .get("/user-content")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.error).toBe("Missing Authorization Token");

          done();
        });
    });

    it("Should not access admin content", (done) => {
      request(server)
        .get("/admin-content")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.error).toBe("Missing Authorization Token");

          done();
        });
    });
  });

  describe("Logged in as User", () => {
    let token: string;

    beforeAll(async () => {
      const response = await axios.post<LoginResponse>("http://localhost:3000/login", { email: "user@user.com", password: "user123" });
      token = response.data.session.access_token;
    });

    it("Should access user content", (done) => {
      request(server)
        .get("/user-content")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).toBe("Viewing User Content");

          done();
        });
    });

    it("Should not access admin content", (done) => {
      request(server)
        .get("/admin-content")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.error).toBe("Unauthorized");

          done();
        });
    });
  });

  describe("Logged in as Admin", () => {
    let token: string;

    beforeAll(async () => {
      const response = await axios.post<LoginResponse>("http://localhost:3000/login", { email: "admin@admin.com", password: "admin123" });
      token = response.data.session.access_token;
    });

    it("Should access user content", (done) => {
      request(server)
        .get("/user-content")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).toBe("Viewing User Content");

          done();
        });
    });

    it("Should access admin content", (done) => {
      request(server)
        .get("/admin-content")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).toBe("Viewing Admin Content");

          done();
        });
    });
  });
});
