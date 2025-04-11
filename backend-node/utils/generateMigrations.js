// 📁 generateMigrations.js
const fs = require("fs");
const path = require("path");
const pluralize = require("pluralize");

const modelsDir = path.join(__dirname, "models"); // Adjust if needed
const migrationsDir = path.join(__dirname, "migrations");

if (!fs.existsSync(migrationsDir)) fs.mkdirSync(migrationsDir);

const getFieldType = (field) => {
  if (!field || typeof field !== "object") return "Sequelize.STRING";

  let base = "Sequelize." + (field.type?.key || "STRING");
  if (field.unique) base += ", unique: true";
  if (field.allowNull === false) base += ", allowNull: false";

  return base;
};

const parseModel = (modelContent, modelName) => {
  const lines = modelContent.split("\n");
  const fields = {};
  let capturing = false;

  for (let line of lines) {
    if (line.includes("sequelize.define") || line.includes("init("))
      capturing = true;
    if (capturing && line.includes("},")) break;

    const match = line.match(/(\w+):\s*{(.+)?}/);
    if (match) {
      const key = match[1];
      const body = match[2];
      fields[key] = body.includes("DataTypes")
        ? body.trim()
        : "Sequelize.STRING";
    }
  }

  return fields;
};

const generateMigration = (modelName, fields) => {
  const tableName = pluralize(modelName);
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);
  const filename = `${timestamp}-create-${tableName.toLowerCase()}.js`;
  const filepath = path.join(migrationsDir, filename);

  const upFields = Object.entries(fields)
    .map(([key, type]) => `        ${key}: { type: ${type} },`)
    .join("\n");

  const content = `\n'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('${tableName}', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
${upFields}
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('${tableName}');
  }
};
`;

  fs.writeFileSync(filepath, content);
  console.log(`✅ Migration generated for ${modelName}: ${filename}`);
};

fs.readdirSync(modelsDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const content = fs.readFileSync(path.join(modelsDir, file), "utf-8");
    const modelName = path.basename(file, ".js");
    const fields = parseModel(content, modelName);
    generateMigration(modelName, fields);
  }
});
