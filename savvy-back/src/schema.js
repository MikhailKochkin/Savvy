const path = require("path");
const { makeSchema } = require("nexus");
const types = require("./models"); // Import all types from index.js

// Extract type names and check for duplicates
const allTypes = Object.values(types);
const typeNames = allTypes.map((type) => type.name);
const duplicates = typeNames.filter(
  (name, index) => typeNames.indexOf(name) !== index
);
if (duplicates.length > 0) {
  console.error("Duplicate type names found:", duplicates);
  throw new Error(`Duplicate type names detected: ${duplicates.join(", ")}`);
}

const schema = makeSchema({
  types: allTypes,
  outputs: {
    schema: path.join(__dirname, "..", "schema.graphql"),
    typegen: path.join(__dirname, "generated", "nexus.ts"),
  },
});

module.exports = {
  schema,
};
