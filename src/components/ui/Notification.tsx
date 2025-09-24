import React from "react";
import { Card } from "./card";
import { Badge } from "./badge";

const Notification = ({ notifications }) => {
  function formatUTCTo12HourTime(isoString) {
    const date = new Date(isoString);

    let hours = date.getUTCHours(); // UTC hours
    let minutes = date.getUTCMinutes(); // UTC minutes

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // 0 ko 12 me convert
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <div className=" p-6 w-[calc(100%-32px)]  ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Updates</h3>
        <Badge variant="outline" className="bg-primary/10">
          {notifications.length}
        </Badge>
      </div>
      <div className="space-y-3 max-h-49 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 ${
                notification.title === "assignment"
                  ? "bg-primary"
                  : notification.title === "achievement"
                  ? "bg-success"
                  : "bg-orange-500"
              }`}
            ></div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs text-muted-foreground">
                {formatUTCTo12HourTime(notification.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
