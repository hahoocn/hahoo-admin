import config from '../../config';

const moduleConfig = {
  moduleName: '多分类多条目',
  module: 'mcml',
  pageSize: 10,
  listRefreshTime: 5 * 60 * 1000,
  detailsRefreshTime: 2 * 60 * 1000,
  api: {
    resource: 'mcmls',
    cateResource: 'cates?type=all'
  }
};

moduleConfig.pageTitle = `${moduleConfig.moduleName} - ${config.app.title}`;

export default moduleConfig;
