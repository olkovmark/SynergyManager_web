import React from "react";
import styles from "./styles.module.css";
import InfoBlock from "../InfoBlock/InfoBlock";
import Link from "next/link";

const InfoBlockList = ({ title, list }: any) => {
  return (
    <InfoBlock title={title}>
      <div className={styles.botList}>
        {list.map((item: { [key: string]: any }) => (
          <div key={item.id} className={styles.bot}>
            {Array.from(Object.entries(item)).map(([key, value], index): any => {
              if (key === "username")
                return (
                  <p key={index}>
                    <b>{key}:</b>{" "}
                    <Link key={index} style={{ color: "gray" }} href={"https://t.me/" + item.username} target="_blank">
                      @{item.username}
                    </Link>
                  </p>
                );
              return (
                <p key={index}>
                  <b>{key}:</b> {value}
                </p>
              );
            })}
          </div>
        ))}
      </div>
    </InfoBlock>
  );
};

export default InfoBlockList;
