import React from "react";
import styles from "./styles.module.css";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import BarChart from "@/components/BarChart/BarChart";
import Table from "@/components/Table/Table";

type StatObj = {
  [key: string]: StatObj | string | number;
};

type ServiceStatType = {
  name: string;
  statistics: StatObj;
  charts: {
    name: string;
    type: "bar" | "line" | "pie";
    data: { [key: string]: number };
  }[];
  tables: {
    name: string;
    data: { [key: string]: number };
  }[];
  actions: {
    callback_types: { type: string; count: number }[];
    message_types: { type: string; count: number }[];
  };
};

const page = async ({ params }: { params: { id: number } }) => {
  let serviceInfo: ServiceStatType | undefined;
  try {
    const res = await fetch(`http://localhost:3001/api/service/${params.id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error("Failed to fetch");
    serviceInfo = await res.json();
  } catch (error) {
    return <div>Failed to fetch</div>;
  }

  if (!serviceInfo) return <div>Service not found</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Сервіс: {serviceInfo.name}</h2>
      <section className={styles.infoBlocks}>
        <InfoBlock title="Загальна інформація">
          <div className={styles.general_info}>{generateStatisticList(serviceInfo.statistics)}</div>
        </InfoBlock>
      </section>
      <section className={styles.tablesBlock}>
        {serviceInfo.tables?.map((chart, index) => (
          <div key={index} className={styles.tableItem}>
            <h3>{chart.name}</h3>
            <Table
              key={index}
              headers={[]}
              data={Object.entries(chart.data)
                .map((v: any) => [v[0], v[1]])
                .sort((a, b) => b[1] - a[1])}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;

function generateStatisticList(statObj: StatObj, deep = 0) {
  return Object.entries(statObj).map(([key, value]) => {
    if (typeof value === "object") {
      return (
        <div style={{ marginLeft: 20 * deep, marginTop: 20 }} key={key}>
          <b>{key}</b>
          {generateStatisticList(value, deep + 1)}
        </div>
      );
    }
    return (
      <div style={{ marginLeft: 20 * deep }} key={key}>
        <b>{key}</b>: {value}
      </div>
    );
  });
}
