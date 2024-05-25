"use server";
import React from "react";
import styles from "./styles.module.css";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import Link from "next/link";
import Table from "@/components/Table/Table";
import UserActionsList from "@/components/UserActionsList/UserActionsList";

type UsersServiceStatInfo = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  statistic: { bots?: any[]; chats?: any[] };
};

const page = async ({ params: { id, user_id } }: { params: { id: number; user_id: number } }) => {
  let userServiceInfo: UsersServiceStatInfo | null = null;
  let actions: any[] = [];
  try {
    const res = await fetch(`http://localhost:3001/api/service/${id}/user/${user_id}`, {
      next: { revalidate: 60 * 5 },
    });

    userServiceInfo = await res.json();
  } catch (error) {
    console.log(error);
  }

  if (!userServiceInfo) return <div>error</div>;
  return (
    <div className={styles.container}>
      <section className={styles.userSection}>
        <InfoBlock title="Користувач">
          <p>
            <b>id:</b> {userServiceInfo.id}
          </p>
          <p>
            <b>
              {userServiceInfo.first_name} {userServiceInfo.last_name}(
              <Link style={{ color: "gray" }} href={"https://t.me/" + userServiceInfo.username} target="_blank">
                @{userServiceInfo.username}
              </Link>
              )
            </b>
          </p>
        </InfoBlock>
        {Object.entries(userServiceInfo.statistic).map((c, i) => (
          <InfoBlockList key={i} title={c[0]} list={c[1]} />
        ))}
        {<UserActionsList actions={actions} user_id={user_id} service_id={id} />}
      </section>
    </div>
  );
};

export default page;

export const InfoBlockList = ({ title, list }: any) => {
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
