const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);

const nativeOnlyModules = new Set([
  "@powersync/react-native",
  "@powersync/op-sqlite",
  "@op-engineering/op-sqlite",
  "react-native-mmkv",
  "react-native-nitro-modules",
]);

const webOnlyModules = new Set(["@powersync/web", "@react-native-async-storage/async-storage"]);

const webModuleMappings = {
  "react-native": "react-native-web",
  "@powersync/web": "@powersync/web/umd",
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web") {
    // Ignore native-only modules on web
    if (nativeOnlyModules.has(moduleName)) {
      return { type: "empty" };
    }

    // Map modules for web
    const mappedModule = webModuleMappings[moduleName];
    if (mappedModule) {
      return context.resolveRequest(context, mappedModule, platform);
    }
  } else {
    // Ignore web-only modules on native
    if (webOnlyModules.has(moduleName)) {
      return { type: "empty" };
    }
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./src/global.css",
});
