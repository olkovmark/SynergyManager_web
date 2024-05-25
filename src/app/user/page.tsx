"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { getServicesWithUsers } from "@/services/ManagerApi";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ServiceData, UserData } from "@/common/Types";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import Link from "next/link";

const Page: React.FC = () => {
  return <div></div>;
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<ServiceData[] | undefined>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {};

  useEffect(() => {
    getServicesWithUsers()
      .then((services) => {
        if (services) {
          setServices(services);
          setError("");
        }
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div>
      <section className={styles.searchBlock}>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="username"
        />
        <Button onClick={handleSearch}>Пошук</Button>
      </section>
      {error && <p>{error}</p>}
      <section className={styles.userList}>
        {services?.map((user) => (
          <Link key={user.id} href={`/user/${user.id}`}>
            <a>
              <InfoBlock title={`${user} ${user}`}>
                <p>
                  <b>id:</b> {user.id}
                </p>
                <p>
                  <b>username:</b> {user.name}
                </p>
              </InfoBlock>
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Page;
