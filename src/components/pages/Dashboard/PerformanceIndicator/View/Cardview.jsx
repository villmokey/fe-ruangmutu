import React from "react";
import { Tabs } from "antd";
import IndicatorView from "./IndicatorView";
import ProfileView from "./ProfileView";

const { TabPane } = Tabs;

const PerformanceIndicatorCardview = ({ filter, search }) => {
  return (
    <>
      <Tabs defaultActiveKey="1" destroyInactiveTabPane>
        <TabPane tab="Indikator Kinerja" key="1">
          <IndicatorView filter={filter} search={search} />
        </TabPane>
        <TabPane tab="Profil Indikator Kinerja" key="2">
          <ProfileView filter={filter} search={search} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default PerformanceIndicatorCardview;
