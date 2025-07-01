import React from "react";
import { useNavigate } from "umi";
import { Button, Checkbox, Flex, Typography } from "antd";

const deps: Record<string, boolean> = {
  认识电闸: true,
  会配路由器: false,
  "有一字、十字螺丝刀": false,
  会网购搜索: false,
  有时间和耐心: false,
};

export default function HomePage() {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  const [baseCan, goodCan] = React.useMemo(() => {
    let baseCan = 0;
    let goodCan = 0;
    Object.keys(deps).forEach((dep) => {
      if (deps[dep]) {
        baseCan += 1;
      } else {
        goodCan += 1;
      }

      if (deps[dep] && checked[dep]) {
        baseCan -= 1;
      } else if (!deps[dep] && checked[dep]) {
        goodCan -= 1;
      }
    });

    return [baseCan, goodCan];
  }, [checked]);

  const result = React.useMemo(() => {
    if (baseCan !== 0) {
      return (
        <Typography.Text type="danger" style={{ fontSize: "inherit" }}>
          不行
        </Typography.Text>
      );
    }

    if (goodCan !== 0) {
      return (
        <Typography.Text type="warning" style={{ fontSize: "inherit" }}>
          可以
        </Typography.Text>
      );
    }

    return (
      <Typography.Text type="success" style={{ fontSize: "inherit" }}>
        难不倒你
      </Typography.Text>
    );
  }, [baseCan, goodCan]);

  return (
    <Flex vertical gap="middle">
      <Typography.Title level={3}>我是否能 DIY 智能家居?</Typography.Title>
      <Typography.Text type="secondary">（按照实际情况勾选）</Typography.Text>
      {Object.keys(deps).map((dep) => (
        <Checkbox
          key={dep}
          checked={checked[dep]}
          onChange={(e) => setChecked({ ...checked, [dep]: e.target.checked })}
        >
          {dep}
        </Checkbox>
      ))}
      <Typography.Title level={2}>结论：{result}</Typography.Title>

      <Button
        style={{
          alignSelf: "center",
        }}
        disabled={baseCan !== 0}
        type="primary"
        onClick={() => navigate("/list")}
      >
        开始吧
      </Button>
    </Flex>
  );
}
