const clearElement = (element, excludeSelector = '') => {
  Array.from(element.children).forEach((child) => {
    if (!child.matches(excludeSelector)) {
      child.remove();
    }
  });
};

export { clearElement };
