import validateCardNum from "../validateCardNum";

test.each([
  ["with 4916623148974656", "4916623148974656", true],
  ["with 30435070934296", "30435070934296", true],
  ["with 3545426007036844", "3545426007036844", true],
  ["with 11111111", "11111111", false],
  ["with 30435070934296456", "30435070934296456", false],
])("testing valid card num %s", (_, str, expected) => {
  const result = validateCardNum(str);
  expect(result).toBe(expected);
});
