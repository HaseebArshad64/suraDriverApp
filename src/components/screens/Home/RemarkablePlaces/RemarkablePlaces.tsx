import * as React from 'react';
import {Container} from '@src/components/elements';
import {FeaturedTab, NewestTab, TrendingTab} from './Tabs';
import {TabView} from '@src/components/elements';
import styles from './styles';
import {TabViewData} from '@src/components/elements/TabView/TabView';
import _ from 'lodash';

type RemarkablePlacesProps = {};

const tabData: TabViewData = [
  {key: '0', title: 'All Orders', content: FeaturedTab},
];

const RemarkablePlaces: React.FC<RemarkablePlacesProps> = () => {
  return (
    <>
      {!_.isEmpty(tabData[0].content()) && (
        <TabView
          tabData={tabData}
          tabBarStyle={styles.tabBarStyle}
          isTabBarFullWidth
        />
      )}
    </>
  );
};

export default RemarkablePlaces;
