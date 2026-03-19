const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Nate Se",
        username: "nate",
        password: "DomeZa",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "User Test",
        username: "test",
        password: "test",
      },
    });
    await page.goto("/");
  });

  describe("Login form validation", () => {
    test("Login form is shown", async ({ page }) => {
      const loginButton = page.getByRole("button", { name: "login" });

      await expect(loginButton).toBeVisible();
      await loginButton.click();

      await expect(page.getByText("log in to application")).toBeVisible();
      await expect(page.getByLabel("username")).toBeVisible();
      await expect(page.getByLabel("password")).toBeVisible();
    });

    describe("Login", () => {
      test("login with correct credential", async ({ page }) => {
        await loginWith(page, "nate", "DomeZa");
        await expect(page.getByText("Nate Se is logged in")).toBeVisible();
      });

      test("login with wrong credential", async ({ page }) => {
        await loginWith(page, "nate", "wrong");
        await expect(
          page.getByText("wrong username or password"),
        ).toBeVisible();
      });
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "nate", "DomeZa");
    });

    test("a new blog can be created", async ({ page }) => {
      const title = "Test title";
      await createBlog(page, title, "Test author", "Test url");
      await expect(page.getByText("Test title Test author")).toBeVisible();
    });

    test("the blog can be liked", async ({ page }) => {
      const title = "Test title";
      await createBlog(page, title, "Test author", "Test url");
      const blogElement = page.locator(".blog").filter({ hasText: title });
      await blogElement.getByRole("button", { name: "view" }).click();
      await expect(blogElement.getByText("likes 0")).toBeVisible();
      await blogElement.getByRole("button", { name: "like" }).click();
      await expect(blogElement.getByText("likes 1")).toBeVisible();
    });

    test("blog can be deleted", async ({ page }) => {
      const title = "Test title";
      await createBlog(page, title, "Test author", "Test url");
      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "remove" }).click();
      const blogElement = page.locator(".blog").filter({ hasText: title });
      await expect(blogElement).not.toBeVisible();
    });

    test("only the user who added the blog sees the blog's delete button", async ({
      page,
    }) => {
      const title = "Test title";
      await createBlog(page, title, "Test author", "Test url");
      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "test", "test");
      const blogElement = page.locator(".blog").filter({ hasText: title });
      await blogElement.getByRole("button", { name: "view" }).click();
      const removeButton = blogElement.getByRole("button", { name: "remove" });
      await expect(removeButton).not.toBeVisible();
    });
  });
});
