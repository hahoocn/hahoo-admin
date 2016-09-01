export const data = {
  totalCount: 2395,
  itemCount: 10,
  items: [
    {
      id: 1,
      title: '这是内容标题的测试',
      updateTime: '2016-10-24',
      orderId: 100,
      isPublish: 1,
      cateName: '分类一分类一'
    },
    {
      id: 2,
      title: '这是内容标题的测试，标题长一点会换行，那么就测试看看标题长长的样子',
      updateTime: '2016-10-23',
      orderId: 99,
      isPublish: 1,
      cateName: '分类二'
    },
    {
      id: 3,
      title: '这是内容标题的测试，标题长一点会换行',
      updateTime: '2016-10-23',
      orderId: 98,
      isPublish: 0,
      cateName: '分类分类分类二'
    },
    {
      id: 4,
      title: '这是内容标题的测试',
      updateTime: '2016-10-24',
      orderId: 97,
      isPublish: 1,
      cateName: '分类三'
    },
    {
      id: 5,
      title: '这是内容标题的测试，标题长一点会换行，那么就测试看看标题长长的样子',
      updateTime: '2016-10-23',
      orderId: 96,
      isPublish: 1,
      cateName: '分类三'
    },
    {
      id: 6,
      title: '这是内容标题的测试，标题长一点会换行',
      updateTime: '2016-10-23',
      orderId: 95,
      isPublish: 0,
      cateName: '分类三'
    },
    {
      id: 7,
      title: '这是内容标题的测试',
      updateTime: '2016-10-24',
      orderId: 97,
      isPublish: 1,
      cateName: '分类三'
    },
    {
      id: 8,
      title: '这是内容标题的测试，标题长一点会换行，那么就测试看看标题长长的样子',
      updateTime: '2016-10-23',
      orderId: 96,
      isPublish: 1,
      cateName: '分类三'
    },
    {
      id: 9,
      title: '这是内容标题的测试，标题长一点会换行',
      updateTime: '2016-10-23',
      orderId: 95,
      isPublish: 0,
      cateName: '分类三'
    },
    {
      id: 10,
      title: '这是内容标题的测试',
      updateTime: '2016-10-24',
      orderId: 97,
      isPublish: 1,
      cateName: '分类三'
    }
  ]
};

export const cateData = {
  cates: [
    {
      id: 1,
      title: '分类1',
      orderId: 97,
      isPublish: 1,
      subItems: [
        {
          id: 11,
          title: '分类1-1',
          orderId: 97,
          isPublish: 1,
          subItems: [
            {
              id: 111,
              title: '分类1-1-1',
              orderId: 97,
              isPublish: 1,
              subItems: [
                {
                  id: 1111,
                  title: '分类1-1-1-1',
                  orderId: 97,
                  isPublish: 1,
                  subItems: []
                },
                {
                  id: 1112,
                  title: '分类1-1-1-2',
                  orderId: 97,
                  isPublish: 1,
                  subItems: []
                }
              ]
            },
            {
              id: 112,
              title: '分类1-1-2',
              orderId: 97,
              isPublish: 1,
              subItems: []
            }
          ]
        },
        {
          id: 12,
          title: '分类1-2',
          orderId: 98,
          isPublish: 1,
          subItems: []
        },
        {
          id: 13,
          title: '分类1-3',
          orderId: 99,
          isPublish: 1,
          subItems: []
        }
      ]
    },
    {
      id: 2,
      title: '分类2',
      orderId: 97,
      isPublish: 1,
      subItems: [
        {
          id: 21,
          title: '分类2-1',
          orderId: 97,
          isPublish: 1,
          subItems: []
        },
        {
          id: 22,
          title: '分类2-2',
          orderId: 97,
          isPublish: 1,
          subItems: []
        },
        {
          id: 23,
          title: '分类2-3',
          orderId: 97,
          isPublish: 1,
          subItems: []
        }
      ]
    },
    {
      id: 3,
      title: '分类3',
      orderId: 97,
      isPublish: 1,
      subItems: []
    }
  ]
};

export const cateData0 = {
  totalCount: 33,
  itemCount: 3,
  parentName: '',
  items: [
    {
      id: 1,
      title: '分类1',
      orderId: 97,
      isPublish: 1,
    },
    {
      id: 2,
      title: '分类2',
      orderId: 98,
      isPublish: 1,
    },
    {
      id: 3,
      title: '分类3',
      orderId: 99,
      isPublish: 1,
    }
  ]
};

export const cateData1 = {
  totalCount: 33,
  itemCount: 3,
  parentName: '分类1',
  parentLinkId: 0,
  items: [
    {
      id: 11,
      title: '分类1-1',
      orderId: 971,
      isPublish: 1,
    },
    {
      id: 12,
      title: '分类1-2',
      orderId: 982,
      isPublish: 0,
    }
  ]
};

export const cateData11 = {
  totalCount: 3,
  itemCount: 3,
  parentName: '分类1-1',
  parentLinkId: 1,
  items: [
    {
      id: 111,
      title: '分类1-1-1',
      orderId: 9711,
      isPublish: 1,
    },
    {
      id: 112,
      title: '分类1-1-2',
      orderId: 9822,
      isPublish: 1,
    }
  ]
};
