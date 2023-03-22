import Div100Vh from "react-div-100vh";
import styled from "@emotion/styled";

import { ThemeProvider } from "@/components/themes/ThemeContext";
import AppLogo from "@/components/themes/AppLogo";
import AppBackground from "@/components/theme-front/AppBackground";
import DesktopAlert from "@/components/theme-front/DesktopAlert";
import RouterScrollToTop from "@/components/theme-front/RouterScrollToTop";

const Div100Vw = styled.div`
  & {
    width: 100vw;
  }
`;

const FrontLayout = (props: any) => {
  return (
    <ThemeProvider>
      <Div100Vw>
        <Div100Vh>
          <AppBackground />
          <AppLogo />
          <DesktopAlert />
          <RouterScrollToTop>{props.children}</RouterScrollToTop>
        </Div100Vh>
      </Div100Vw>
    </ThemeProvider>
  );
};

export default FrontLayout;
