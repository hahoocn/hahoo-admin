import config from '../../config';

const moduleConfig = {
  moduleName: '分类',
  module: 'cate',
  pageSize: 10,
  listRefreshTime: 5 * 60 * 1000,
  detailsRefreshTime: 2 * 60 * 1000,
  api: {
    resource: 'cates',
    cateResource: 'cates?type=all'
  }
};

moduleConfig.pageTitle = `${moduleConfig.moduleName} - ${config.app.title}`;

export default moduleConfig;
