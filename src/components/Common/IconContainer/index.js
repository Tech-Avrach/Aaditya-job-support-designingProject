import React, { useRef, useState } from "react";
import { Tooltip } from "reactstrap";

const IconContainer = ({
  handleOnClick,
  Icon,
  text,
  iconColor = "#545cd8",
  fontSize,
}) => {
  const iconRef = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div
        ref={iconRef}
        style={{ paddingLeft: "5px", paddingRight: "5px", cursor: "pointer" }}
      >
        <Icon fontSize={ fontSize ||"20px"} color={iconColor} onClick={handleOnClick} />
      </div>
      <Tooltip isOpen={tooltipOpen} target={iconRef} toggle={toggle}>
        {text}
      </Tooltip>
    </>
  );
};

export default IconContainer;
