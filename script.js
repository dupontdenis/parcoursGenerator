// Generator function to perform depth-first traversal of the DOM tree
function* search(node, depth = 0) {
  if (!node) return; // If the node is null or undefined, return
  yield { node, depth }; // Yield the current node along with its depth
  yield* search(node.firstElementChild, depth + 1); // Recursively search the first child with increased depth
  yield* search(node.nextElementSibling, depth); // Recursively search the next sibling with the same depth
}

try {
  // Check if document.body exists
  if (!document.body) {
    throw new Error("document.body is not available");
  }

  // Create a container to hold the hierarchy
  const container = document.createElement("div");
  container.textContent = "------------------ Hierarchy ------------------";
  container.style.padding = "10px";
  container.style.border = "1px solid #ccc";
  container.style.backgroundColor = "#f9f9f9";

  // Iterate over all nodes yielded by the search function starting from document.body
  for (let { node, depth } of search(document.body)) {
    if (node.localName) {
      // Create an element to represent the current node
      const nodeElement = document.createElement("div");
      nodeElement.textContent = node.localName;

      // Add a class based on the depth
      const className = `indent-${depth}`;
      if (!document.styleSheets[0].cssRules[className]) {
        const rule = `.${className} { background-color: rgba(0, 128, 0, ${
          0.1 * depth
        }); margin-left: ${20 * depth}px; }`;
        document.styleSheets[0].insertRule(
          rule,
          document.styleSheets[0].cssRules.length
        );
      }
      nodeElement.classList.add(className);

      // Append the element to the container
      container.appendChild(nodeElement);
    }
  }

  // Append the container to the document body
  document.body.appendChild(container);
} catch (error) {
  console.error("An error occurred:", error.message);
}
