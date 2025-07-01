import React from "react";
import { Checkbox, Flex, Typography } from "antd";

const list: string[][] = [
  [
    "网络",
    "办理宽带",
    "光猫 IP 调为 192.168.1.1",
    "能连上 DeepSmart 软件",
    "【非阻塞】光猫改桥接模式",
  ],
  [
    "Home Assistant",
    "购买 冬瓜OS 的 HA盒子",
    "HA盒子 连上路由器",
    "HA 关联 KNX",
  ],
  ["KNX 设备", "得到 KNX 设备列表", "添加 KNX 设备到 HA"],
  ["HomeKit", "HA 关联 HomeKit", "【自测】Siri 语音控制"],
  [
    "小米生态",
    "手机安装米家 APP",
    "购买小米中枢网关",
    "购买小米蓝牙模块",
    "HA 绑定小米账户",
    "自动化双向绑定 KNX 与 小米蓝牙模块",
  ],
];

const DocsPage = () => {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  const updateChecked = (key: string, value: boolean) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: value };

      // Local Storage sync
      localStorage.setItem("mi-diy-checked", JSON.stringify(next));

      return next;
    });
  };

  React.useEffect(() => {
    const storedChecked = localStorage.getItem("mi-diy-checked");
    if (storedChecked) {
      setChecked(JSON.parse(storedChecked));
    }
  }, []);

  return (
    <Flex vertical gap="middle">
      <Typography.Title level={3}>任务清单</Typography.Title>
      <Typography.Text type="secondary">（完成一步勾一步）</Typography.Text>
      {list.map(([title, ...subList], index) => {
        const allPass = subList.every((dep) => checked[dep]);

        return (
          <React.Fragment key={title}>
            <Checkbox key={index} checked={allPass} indeterminate={!allPass}>
              {title}
            </Checkbox>
            {subList.map((dep) => (
              <Checkbox
                style={{ marginLeft: 24 }}
                key={dep}
                checked={checked[dep]}
                onChange={(e) => updateChecked(dep, e.target.checked)}
              >
                {dep}
              </Checkbox>
            ))}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};

export default DocsPage;
