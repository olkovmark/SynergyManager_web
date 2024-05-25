"use client";
import Link from "next/link";
import React, { use, useState } from "react";
import { Service, UserType } from "@/common/Types";
import Input from "../Input/Input";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const UsersFullList: React.FC<{ services: Service[]; users: UserType[] }> = ({ users, services }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedService, setSortedServices] = useState<number>(0);
  const router = useRouter();
  const cellHandler = (service_id: number, user_id: number) => {
    router.push(`/service/${service_id}/user/${user_id}`);
  };

  return (
    <div>
      <div className="header">
        <h1>Список користувачів</h1>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Username"
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            {services.map((service) => (
              <th
                className={styles.service_col}
                onClick={() => setSortedServices(service.id)}
                key={service.id}
                scope="col"
              >
                {service.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.username?.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
              if (sortedService === undefined) return 0;

              const bService = b.services?.has(sortedService);
              if (!bService) return -1;
              return 1;
            })
            .map((user) => (
              <tr key={user.id}>
                <td>
                  {user.first_name} {user.last_name}{" "}
                  {user.username ? (
                    <Link target="_blank" href={`https://t.me/` + user.username}>
                      @{user.username}
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
                {services.map((service) => (
                  <td
                    onClick={user.services?.has(service.id) ? () => cellHandler(service.id, user.id) : undefined}
                    className={styles.service_cell}
                    key={service.id}
                  >
                    {user.services?.has(service.id) ? "✓" : ""}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersFullList;
