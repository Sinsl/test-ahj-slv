import defPaySystem from "../defPaySystem";

test.each([
  ["with 4", "4", [0]],
  ["with 2", "2", [1, 2]],
  ["with 3", "3", [3, 4, 5]],
  ["with 5", "5", [1, 5]],
  ["with 4", "6", [6, 1]],
  ["with 4", "1", ["Платежная система не определена"]],
])("testing 1 symbol %s", (_, str, expected) => {
  const result = defPaySystem(str);
  expect(result).toEqual(expected);
});

test.each([
  ["with 4", "458", [0]],
  ["with 60", "6025", [6]],
  ["with 22", "2256", [2]],
  ["with 34", "3458", [3]],
  ["with 35", "3524", [4]],
  ["with 53", "5361", [1]],
  ["with 27", "271", [1]],
  ["with 58", "5843", [1]],
  ["with 67", "679", [1]],
  ["with 30", "3021", [5]],
  ["with 36", "368", [5]],
  ["with 54", "5412", [5]],
  ["with 55", "5516", [5]],
  ["with 20", "201", ["Платежная система не определена"]],
])("testing > 1 symbol %s", (_, str, expected) => {
  const result = defPaySystem(str);
  expect(result).toEqual(expected);
});
