import React, { useContext } from "react";

//Style
import { makeStyles } from "@material-ui/core/styles";

//Component
//--> Drawer
import SideDrawer from "../components/Drawer/SideDrawer";
//--> Cover
import { Warning } from "../components/Alert/Alert";
//--> Title
import Title from "../components/Title";
//--> Counter
import Counter from "../components/Counter/Counter";
//--> Profile
import Profile from "../components/Profile/Profile";

// //Context
import { TicketContext } from "../context/TicketContext";
import { FeedContext } from "../context/FeedbackContext";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Dashboard() {
  const classes = useStyles();

  //Context
  const { tickets, approveCount, notApproveCount } = useContext(TicketContext);
  const { feedbacks, receiver } = useContext(FeedContext);

  const emailVerified = localStorage.getItem("emailVerified");

  const counter = [
    {
      label: "Transactions",
      number: tickets.length || 0,
      duration: 2,
    },
    {
      label: "NGO Recipients",
      number: receiver.length || 0,
      duration: 2,
    },
    {
      label: "Feedbacks",
      number: feedbacks.length || 0,
      duration: 2,
    },
    {
      label: "Tickets",
      number: notApproveCount,
      duration: 2,
    },
  ];

  return (
    <div style={{ display: "flex", backgroundColor: "#F3F4F7" }}>
      <SideDrawer />
      <div style={{ flex: 1 }}>
        <div className={classes.toolbar} />
        {!emailVerified ? (
          <Warning
            style={{ flex: 1 }}
            title="Generate Ticket"
            msg="There is no Ticket generated by your team."
          />
        ) : null}
        {/* <Cover title="Admin Dashboard" /> */}
        <div className={classes.content}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexFlow: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="counterContainer">
              <Title title="Total Number of" overlay="Track" />
              <div className="counterSubcontainer">
                {counter.map((data, index) => {
                  return <Counter data={data} key={index} />;
                })}
              </div>
            </div>
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}
