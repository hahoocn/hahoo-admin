import config from '../../config';

const moduleConfig = {
  moduleName: '单分类多条目',
  module: 'scml',
  pageSize: 10,
  listRefreshTime: 5 * 60 * 1000,
  detailsRefreshTime: 2 * 60 * 1000,
  api: {
    resource: 'scmls'
  }
};

moduleConfig.pageTitle = `${moduleConfig.moduleName} - ${config.app.title}`;

export default moduleConfig;
