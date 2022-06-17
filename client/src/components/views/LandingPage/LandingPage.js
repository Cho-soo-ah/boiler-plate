import React from "react";
import { Layout, Typography } from "antd";

const { Title } = Typography;
const { Content, Footer } = Layout;

function LandingPage() {
  return (
    <>
      <Content
        style={{
          padding: "50px",
        }}
      >
        <div className="site-layout-content">
          <Title level={3}>Hiii~~~</Title>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Boiler Plate © 2022
      </Footer>
    </>
  );
}

export default LandingPage;
