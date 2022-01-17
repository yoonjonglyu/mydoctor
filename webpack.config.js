const { merge } = require('webpack-merge');
const buildValidations = require('./build/build-validations');
const commonConfig = require('./build/webpack.common');

// 플러그인 추가
const addons = (addonsArg) => {
    let addons = [...[addonsArg]].filter(Boolean);

    return addons.map(addonsName => require(`./build/addons/webpack.${addonsName}.js`));
};

module.exports = (env) => {
    if(!env) {
        throw new Error(buildValidations.ERR_NO_ENV);
    }
    
    const envConfig = require(`./build/webpack.${env.env}.js`);
    const mergedConfig = merge(
        commonConfig,
        envConfig,
        ...addons(env.addons)
    );

    return mergedConfig;
}