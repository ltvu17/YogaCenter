
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const Bedicon = styled(BedtimeIcon)`
  font-size: 70px !important;
  margin-left: 10px !important;
`;

const Sunnyicon = styled(WbSunnyIcon)`
 font-size: 70px !important;
  margin-left: 10px !important;
`;
export default function TextAnimation() {


const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12 && currentHour >= 5) {
      setGreeting("Good Morning");
      setIcon(<Sunnyicon />);
    } else if (currentHour <= 18 && currentHour >= 12) {
      setGreeting("Good Afternoon");
      setIcon(<Bedicon />);
    } else {
      setGreeting("Good Evening");
      setIcon(<Bedicon />);
    }
  }, []);
  const arrayText = [...greeting.split(""), icon];

    const delayMultiplier = 0.1;
    return(
      
       <Wrapper>
    {arrayText.map((item, index) => (
      <span key={index} style={{ animationDelay: `${index * delayMultiplier}s` }}>
        {React.isValidElement(item) ? item : item}
      </span>
    ))}
  </Wrapper>

    )
}

const animation = keyframes`
    0% {opacity:0;transform:translateY(-75px) skewX(10deg) skewY(10deg) rotateX(30deg); filter:blur(10px)}
    25% {opacity:1;transform:translateY(0) skewX(0deg) skewY(0deg) rotateX(0deg); filter:blur(0px)}
    75% {opacity:1;transform:translateY(0) skewX(0deg) skewY(0deg) rotateX(0deg); filter:blur(0px)}
    100%{opacity:0;transform:translateY(-75px skewX(10deg) skewY(10deg) rotateX(30deg)); filter:blur(10px)}
`

const Wrapper = styled.span`
    display: flex;
    align-items: center;
    span {
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration:  6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }

`;