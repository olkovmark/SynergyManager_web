import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { ServiceData, UsersFullInfo, UserType } from "@/common/Types";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import UsersFullList from "@/components/UsersFullList/UsersFullList";

const page = async () => {
  const res = await fetch(`http://localhost:3001/api/service`, {
    next: { revalidate: 5 },
  });

  const services: ServiceData[] = await res.json();
  const convertInfo = ConvertUsersFullInfo(services);

  return (
    <div>
      <section className={styles.container}>
        <h1 className={styles.title}>Service List</h1>
        <ul className={styles.list}>
          {services.map(({ id, name }) => (
            <Link key={id} href={"service/" + id}>
              {name}
            </Link>
          ))}
        </ul>
      </section>
      <section className={styles.users_header}>
        <h1 className={styles.title}>Users list</h1>
        <InfoBlock title="Statistic">
          <ul>
            {Object.keys(convertInfo.stat).map((key: any) => {
              const textProc =
                Math.round((convertInfo.stat[key] / convertInfo.users.length) * 100) +
                "% (" +
                convertInfo.stat[key] +
                ")";
              return (
                <p key={key}>
                  {key}: {textProc}
                </p>
              );
            })}
          </ul>
        </InfoBlock>

        <UsersFullList services={services} users={convertInfo.users} />
      </section>
    </div>
  );
};

export default page;

function ConvertUsersFullInfo(services: ServiceData[]): UsersFullInfo {
  const users = new Map<number, UserType>();

  services.forEach((service) => {
    if (!service.users) return;
    service.users.forEach((user) => {
      if (!users.has(user.id)) {
        users.set(Number(user.id), user);
      }

      const userFull = users.get(user.id);
      if (userFull) {
        if (!userFull.services) {
          userFull.services = new Map<number, string>();
        }

        userFull.services.set(service.id, service.name);
      }
    });
  });

  const stat: { [key: number]: number } = {};

  const usersArray = Array.from(users.values());

  usersArray.forEach(({ services }) => {
    if (!services) return;
    if (!stat[services.size]) stat[services.size] = 0;
    stat[services.size]++;
  });

  return {
    stat,
    users: usersArray,
  };
}
