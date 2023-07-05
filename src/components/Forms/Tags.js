import React, { useState, useContext, useEffect } from "react";

//Style
import Avatar from "@material-ui/core/Avatar";

//Assets
import Profile from "../../assets/Profile.png";

//Components
//--> Button
import Button from "../Button/Button";

//Context
import { AuthContext, AuthActionContext } from "../../context/AuthContext";
import { TicketActionContext } from "../../context/TicketContext";

// import emailjs from "@emailjs/browser";

function Tags(props) {
  const { data, type, ref } = props;

  //State
  const [user, setUser] = useState({});

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  console.log(data);
  //Context
  const { usersDetails } = useContext(AuthActionContext);

  useEffect(() => {
    usersDetails(data.uid, setUser);
  }, [data]);

  return (
    <div className="feedback" ref={type === "display" ? ref : null}>
      {/* {type === "display" ? (
        <>
          <TagHeaderPersonal data={data} />
          <TagBodyPersonal data={data} />
        </>
      ) : (
      )} */}
      <>
        <TagHeader data={{ ...data, ...user }} />
        <TagBody data={{ ...data, ...user, setStart, setEnd }} />
      </>
      <TagFooter
        data={user ? { ...data, ...user, start, end } : data}
        type={type}
      />
    </div>
  );
}

export default Tags;

// const TagHeaderPersonal = (props) => {
//   //Context
//   const { user } = useContext(AuthContext);

//   return (
//     <div style={{ display: "flex", alignItems: "center", width: 250 }}>
//       <Avatar
//         alt="Profile Picture"
//         src={user.avatar ? user.avatar : Profile}
//         style={{ width: 50, height: 50 }}
//       />
//       <div style={{ margin: "0px 10px" }}>
//         <h2 className="userName" name="Name">
//           {user.name ? user.name : "User Name"}{" "}
//         </h2>
//         <h3 className="time" name="user_email">
//           {user.email}
//         </h3>
//       </div>
//     </div>
//   );
// };

const TagHeader = (props) => {
  const { data } = props;

  const TimeStamp = data.createdAt ? data.createdAt.toDate() : false;
  let date = TimeStamp ? TimeStamp.toDateString() : null;
  let time = TimeStamp ? TimeStamp.toTimeString().split(" ", 1) : null;

  return (
    <div style={{ display: "flex", alignItems: "center", width: 250 }}>
      <Avatar
        alt="Profile Picture"
        src={data.avatar ? data.avatar : Profile}
        style={{ width: 50, height: 50 }}
      />
      <div style={{ margin: "0px 10px" }}>
        <h2 className="userName">{data.name ? data.name : "User Name"} </h2>
        <h3 className="time">
          {date} - {time}
        </h3>
      </div>
    </div>
  );
};

// const TagBodyPersonal = (props) => {
//   const { amount, recipient, Model, No, Start, End } = props.data;

//   const start = Start ? Start.replace("T", " - ") : null;
//   const end = End ? End.replace("T", " - ") : null;

//   return (
//     <div className="feedbody">
//       <BodyPara label="Eth Amount: " data={amount} />
//       <BodyPara label="recipient" data={recipient} />
//       {/* <BodyPara label="Model" data={Model} />
//       <BodyPara label="No Plate" data={No} />
//       <BodyPara label="Start Date & Time" data={start} name="startTime" />
//       <BodyPara label="End Date & Time" data={end} name="endTime" /> */}
//     </div>
//   );
// };

const TagBody = (props) => {
  const {  recepient,  ticketID } =
    props.data;
// const start = createdAt ? createdAt.toDate() : false
  // const dateTimeFormat = (data) => {
  //   return data < 10 ? "0" + data : data;
  // };

  // const dateTime = (dateTime) => {
  //   let date = new Date(dateTime.toDate());
  //   return `${date.getFullYear()}-${dateTimeFormat(
  //     date.getMonth() + 1,
  //   )}-${dateTimeFormat(date.getDate())} - ${dateTimeFormat(
  //     date.getHours(),
  //   )}:${dateTimeFormat(date.getMinutes())}`;
  // };

  // const start = startTime ? dateTime(startTime) : null;
  // const end = endTime ? dateTime(endTime) : null;

  // useEffect(() => {
  //   setStart(start);
  //   setEnd(end);
  // }, [start, end]);
  // const start = startTime ? startTime.replace("T", " - ") : null;
  // const end = endTime ? endTime.replace("T", " - ") : null;

  return (
    <div className="feedbody">
      <BodyPara label="Transaction ID" data={ticketID} name="parking" />
      <BodyPara label="Recepient" data={recepient} />
      <BodyPara label="USD per ETH" data={1937} />
      <BodyPara label="PKR per USD" data={275} />
      {/* <BodyPara label="Start Date & Time" data={start} name="startTime" />
      <BodyPara label="End Date & Time" data={end} name="endTime" /> */}
    </div>
  );
};
const BodyPara = (props) => {
  const { label, data, name } = props;
  return (
    <p style={{ borderBottom: "1px solid #ccc", marginBottom: 5 }}>
      <b>{label}: </b>
      <p name={name ? name : null}>{data ? data : null}</p>
    </p>
  );
};

const TagFooter = (props) => {
  const { type, data } = props;
  const { amount, approvedAt, ticketID } = props.data;
  console.log(approvedAt)
  const approve = approvedAt !== "" ? true : false;

  //Context
  const { user } = useContext(AuthContext);
  const { updateTicketStatus, deleteTicketStatus } =
    useContext(TicketActionContext);

  const commontStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const status = approve
    ? { padding: 5, color: "#fff", background: "green" }
    : {
        padding: 5,
        color: "#fff",
        background: "red",
      };

  // const handleApprove = () => {
  //   console.log(data);
  //   // emailjs
  //   //   .send(
  //   //     "service_rzwnlpq",
  //   //     "template_u8w7ljy",
  //   //     {
  //   //       name: data.name,
  //   //       user_email: data.email,
  //   //       createdAt: data.createdAt,
  //   //       amount: data.amount,
  //   //       completedAt: data.completedAt,
  //   //       approvedAt: data.approvedAt,
  //   //       recepient: data.recepient,
  //   //     },
  //   //     "user_aV26QX2PM16kK0e6JMN6v",
  //   //   )
  //   //   .then(
  //   //     (result) => {
  //   //       console.log(result.text);
  //   //     },
  //   //     (error) => {
  //   //       console.log(error.text);
  //   //     },
  //   //   );
  //   updateTicketStatus(ticketID, data);
  // };

  return (
    <div>
      <div style={commontStyle}>
        <h4>Approval: </h4>
        <h4 style={status} name="status">
          {approve ? "Approve" : "Not approve yet"}
        </h4>
      </div>
      <div style={commontStyle}>
        <h3>Total amount:</h3>
        {amount ? <h3 name="price">ETH {amount}</h3> : <h3>ETH 0</h3>}
      </div>
      <div style={commontStyle}>
        <h3>Total amount in PKR:</h3>
        {amount ? <h3 name="price">PKR {((amount * 1937) * 275).toFixed(3)}</h3> : <h3>PKR 0</h3>}
      </div>

      {user.type === "admin" && type !== "display" && !approve ? (
        <div style={commontStyle}>
          <Button
            label="Decline"
            variant="contained"
            styleType="decline"
            width={140}
            onClickEvent={() => deleteTicketStatus(ticketID)}
          />
          <Button
            label="Accept"
            variant="contained"
            styleType="accept"
            width={140}
            onClickEvent={() => updateTicketStatus(ticketID)}
          />
        </div>
      ) : user.type === "admin" && type !== "display" && approve ? (
        <div style={commontStyle}>
          <Button
            label="Delete Ticket"
            variant="contained"
            styleType="decline"
            width={300}
            onClickEvent={() => deleteTicketStatus(ticketID)}
          />
        </div>
      ) : null}
    </div>
  );
};
