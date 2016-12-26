export const waitAndClickButton = (buttonClass) => {
  client.waitForVisible(buttonClass, 2000);
  client.click(buttonClass);
};

export const waitAndSetValue = function(inputName, inputValue) {
  client.waitForVisible(inputName, 2000);
  client.setValue(inputName, inputValue);
};

export const waitAndGetValue = function(selectName) {
  client.waitForVisible(selectName, 2000);
  return client.getValue(selectName);
};

export const waitAndGetText = function(selectName) {
  client.waitForVisible(selectName, 2000);
  return client.getText(selectName);
};

export const waitAndSelect = function(selectName, selectValue) {
  client.waitForVisible(selectName, 2000);
  client.selectByValue(selectName, selectValue);
};

export const waitAndCheck = function(selectName) {
  client.waitForVisible(selectName, 2000);
  const isChecked = client.isSelected(selectName);
  if (!isChecked) {
    client.click(selectName);
  }
};
export const waitAndUncheck = function(selectName) {
  client.waitForVisible(selectName, 2000);
  const isChecked = client.isSelected(selectName);
  if (isChecked) {
    client.click(selectName);
  }
};

export const pressEnter = function() {
  client.keys('\uE007');
};
