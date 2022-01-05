it("should walk the happy path correctly", () => {
  window.localStorage.setItem(
    "todos",
    '{"1641378707799":{"text":"Aufräumen","id":"1641378707799","complete":false,"createdAt":"2022-01-05T10:31:47.799Z"},"1641378880537":{"text":"Oma anrufen","id":"1641378880537","complete":true,"createdAt":"2022-01-05T10:34:40.537Z"}}'
  );

  //   cy.visit("http://localhost:3000");
  cy.visit("/");

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Oma anrufen/i);

  cy.findByPlaceholderText(/what needs to be done?/i).type(
    "Tests schreiben{enter}"
  );

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Oma anrufen/i);
  cy.findByText(/Tests schreiben/i);

  cy.findByRole("button", { name: /active/i }).click();
  cy.findByText(/2 todos/i);

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Tests schreiben/i);

  cy.findByRole("button", { name: /^completed$/i }).click();
  cy.findByText(/1 todos/i);

  cy.findByText(/Oma anrufen/i);

  cy.findByRole("button", { name: /view all/i }).click();
  cy.findByText(/3 todos/i);

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Oma anrufen/i);
  cy.findByText(/Tests schreiben/i);

  // check one off the list
  cy.findByLabelText(/toggle 'aufräumen' completed/i).click(); // by labelText

  cy.findByRole("button", { name: /active/i }).click();
  cy.findByText(/1 todos/i);

  cy.findByText(/Tests schreiben/i);

  cy.findByRole("button", { name: /^completed$/i }).click();
  cy.findByText(/2 todos/i);

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Oma anrufen/i);

  cy.findByRole("button", { name: /view all/i }).click();
  cy.findByText(/3 todos/i);

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Oma anrufen/i);
  cy.findByText(/Tests schreiben/i);

  // edit one todo
  cy.findByRole("button", { name: /edit 'Tests schreiben'/i }).click(); // by name
  cy.findByDisplayValue(/tests schreiben/i)
    .clear()
    .type("Joggen gehen{enter}");

  cy.findByText(/Joggen gehen/i);
  cy.findByText(/Tests schreiben/i).should("not.exist");

  // delete one
  cy.findByRole("button", { name: /Delete 'Joggen gehen'/i }).click(); // by name

  cy.findByRole("button", { name: /active/i }).click();
  cy.findByText(/0 todos/i);

  cy.findByRole("button", { name: /^completed$/i }).click();
  cy.findByText(/2 todos/i);

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Oma anrufen/i);

  cy.findByRole("button", { name: /view all/i }).click();
  cy.findByText(/2 todos/i);

  cy.findByText(/Aufräumen/i);
  cy.findByText(/Oma anrufen/i);

  // delete more
  cy.findByRole("button", { name: /Delete 'Oma anrufen'/i }).click(); // by name
  cy.findByText(/Aufräumen/i).then(() => {
    expect(localStorage.getItem("todos")).to.eq(
      '{"1641378707799":{"text":"Aufräumen","id":"1641378707799","complete":true,"createdAt":"2022-01-05T10:31:47.799Z"}}'
    );
  });

  cy.findByRole("button", { name: /Delete 'Aufräumen'/i }).click(); // by name
  cy.findByText(/0 Todos/i).then(() => {
    expect(localStorage.getItem("todos")).to.eq("{}");
  });
});
