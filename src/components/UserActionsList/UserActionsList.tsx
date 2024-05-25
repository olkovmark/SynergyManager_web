"use client";
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { getUserActions } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

interface UserActionsProps {
  user_id: number;
  service_id: number;
  actions: { callback_type: string; message_type: string; date: string }[];
}

const UserActionsList: React.FC<UserActionsProps> = ({ service_id, user_id }) => {
  const [date, setDate] = useState<Date>();
  const [actions, setActions] = useState([]);

  const { pending } = useFormStatus();

  useEffect(() => {
    getUserActions(service_id, user_id).then((v) => {
      if (v) {
        console.log(v);
        setActions(v);
      }
    });
  }, []);

  const handleClick = (event: any) => {
    const selectedDate = date ? new Date(date) : undefined;

    getUserActions(service_id, user_id, selectedDate).then((v) => {
      if (v) {
        setActions(v);
      }
    });
    if (pending) {
      event.preventDefault();
    }
  };

  const handleDateChange = (event: any) => {
    const localDate = event.target.value;
    const dateObject = new Date(localDate);
    const utcDate = new Date(
      Date.UTC(
        dateObject.getFullYear(),
        dateObject.getMonth(),
        dateObject.getDate(),
        dateObject.getHours(),
        dateObject.getMinutes(),
        dateObject.getSeconds()
      )
    );

    setDate(utcDate);
  };

  const data = actions.map(({ callback_type, message_type, date }: any) => [date, callback_type, message_type]);

  return (
    <div className="">
      <h3>Дії користувача</h3>
      <form action={(e) => handleClick(e)}>
        <div className="">
          <input
            className="input-group-text d-inline"
            type="datetime-local"
            placeholder="Enter date"
            onChange={handleDateChange}
          />
          <button className="btn btn-primary d-inline m-4" type="submit" disabled={pending}>
            Пошук
          </button>
        </div>
      </form>
      <Table headers={["Дата", "Колбекі", "Повідомелння"]} data={data} />
    </div>
  );
};

export default UserActionsList;
