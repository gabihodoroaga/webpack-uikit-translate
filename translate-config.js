module.exports =
{
    normalizeContent: true,
    prefixIdsInContentFiles: true,
    baseFilePath: "./src",
    allowDirectAnnotation: true,
    exportFilePath: "./src/translation/export/translate.json",
    importFilePath: "./src/translation/import/{locale}.json",
    includedFilePaths: [
        "./src/**/*.html",
     ],
    excludedFilePaths:[
    ]
};
