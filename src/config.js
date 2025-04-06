/**
 * Configuration module
 * Handles loading and parsing of the application config
 */
import fs from "fs";
import toml from "toml";

// Read and parse the config file
const config = toml.parse(fs.readFileSync("./config.toml", "utf-8"));

export default config;