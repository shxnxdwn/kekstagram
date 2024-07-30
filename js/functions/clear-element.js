const clearElement = (element, excludeSelector = null) => {
  Array.from(element.children).forEach((child) => {
    if (!child.matches(excludeSelector)) {
      child.remove();
    }
  });
};

export { clearElement };
