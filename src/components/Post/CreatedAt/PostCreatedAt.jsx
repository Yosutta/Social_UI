import React from "react";

const PostCreatedAt = (props) => {
  const createdTime = new Date(props.postCreatedAt).getTime();
  const currentTime = new Date().getTime();
  const deltaTime = new Date(currentTime - createdTime);

  // TODO Simplify code
  const deltaYear = deltaTime.getUTCFullYear() - 1970;
  let createdAt = deltaYear + " years";
  //   console.log("Years ", deltaYear);
  if (!deltaYear) {
    const deltaMonth = deltaTime.getUTCMonth();
    createdAt = deltaMonth + " months";
    if (!deltaMonth) {
      const deltaDays = deltaTime.getUTCDate();
      //   console.log("Days ", deltaDays - 1);
      createdAt = deltaDays + " days";
      if (!(deltaDays - 1)) {
        const deltaHours = deltaTime.getUTCHours();
        // console.log("Hours ", deltaHours);
        createdAt = deltaHours + " hours";
        if (!deltaHours) {
          const deltaMinutes = deltaTime.getUTCMinutes();
          //   console.log("Minutes ", deltaMinutes);
          createdAt = deltaMinutes + " minutes";
          if (!deltaMinutes) {
            const deltaSeconds = deltaTime.getUTCSeconds();
            // console.log("Seconds ", deltaSeconds);
            createdAt = deltaSeconds + " seconds";
            if (!deltaSeconds) {
              createdAt = null;
            }
          }
        }
      }
    }
  }

  return (
    <span className="postCreatedAt">
      <span style={{ fontSize: "16px" }}>·</span> Posted {createdAt} ago
    </span>
  );
};

export default PostCreatedAt;
