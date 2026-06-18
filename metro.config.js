const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web") {
    // Depending on `@powersync/web` for functionality, ignore mobile specific dependencies.
    if (
      ["@powersync/react-native", "@powersync/op-sqlite", "@op-engineering/op-sqlite"].includes(
        moduleName
      )
    ) {
      return { type: "empty" };
    }
    const mapping = {
      "react-native": "react-native-web",
      "@powersync/web": "@powersync/web/umd",
    };
    if (mapping[moduleName]) {
      return context.resolveRequest(context, mapping[moduleName], platform);
    }
  } else {
    // Depending on `@powersync/react-native` for functionality, ignore `@powersync/web` dependencies.
    if (["@powersync/web"].includes(moduleName)) {
      return { type: "empty" };
    }
  }

  // Ensure you call the default resolver.
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./src/global.css",
});
