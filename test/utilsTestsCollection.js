const responseHandlerSpec = require('./utils/ResponseHandler.spec');
const convertParamsToFilterSpec = require('./utils/ConvertParamsToFilters.spec');
const filteringHandlerSpec = require('./utils/FilteringHandlerSpec');
const emitterSpec = require('./utils/Emitter.spec');
const dataReadingSpec = require('./utils/DataReadingSpec');

//run utils tests
let responseHandlerTests = responseHandlerSpec;
let convertingParamsToFiltersTests =convertParamsToFilterSpec;
let filteringTests =filteringHandlerSpec;
const emitterTests =emitterSpec;
let dataReadingTests =dataReadingSpec;
