import React from "react";
import { Tabs } from "antd";
import IndicatorView from "./IndicatorView";
import ProfileView from "./ProfileView";

const { TabPane } = Tabs;

const QualityIndicatorCardview = ({ filter, search }) => {
  return (
    <>
      <Tabs defaultActiveKey="1" destroyInactiveTabPane>
        <TabPane tab="Indikator Mutu" key="1">
          <IndicatorView filter={filter} search={search} />
        </TabPane>
        <TabPane tab="Profil Indikator Mutu" key="2">
          <ProfileView filter={filter} search={search} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default QualityIndicatorCardview;
