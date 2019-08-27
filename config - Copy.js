const config = {};

// config.host = process.env.HOST || "https://hcliot.documents.azure.com:443";
// config.authKey =
// process.env.AUTH_KEY || "cCxmyvaQKs6ahWPoWmejZdPBrujpfZTymfoKdY9fiNIZmoodMiooN3WoD6Yfl1GaUXkxV791BXhoYNelpmCi3g==";
// config.databaseId = "products";
// config.containerId = "product";

// if (config.host.includes("https://localhost:")) {
// console.log("Local environment detected");
// console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
// }

config.host = process.env.HOST || "https://pepsicosmartshelf.documents.azure.com:443";
config.authKey =
    process.env.AUTH_KEY || "97XJKttuQ29azFbjkIQO46gFoxuuO0F3uQmJM28TGXlwhlIIWq50LLzpcwgfjXthVoNiXsnHWTlgLT7nbqZk2w==";
config.databaseId = "products";
config.containerId = "product";

if (config.host.includes("https://localhost:")) {
    console.log("Local environment detected");
    console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

// config.host = process.env.HOST || "https://pepsicodb.documents.azure.com:443";
// config.authKey =
//     process.env.AUTH_KEY || "Y3EGEDPIzUsgcwlJUoui5wqUFXcTxubUPidK73UgITgh7NAv1Z5WYQ3oR99c5pcis0AAbtVBukeYDST6LDXDeQ==";
// config.databaseId = "products";
// config.containerId = "product";

// if (config.host.includes("https://localhost:")) {
//     console.log("Local environment detected");
//     console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//     console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
// }


module.exports = config;