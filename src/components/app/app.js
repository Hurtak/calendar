import React from "react";
import glamorous from "glamorous";
import MenuWrapper from "../menu/menu.js";
import ConditionalUpdater from "../conditional-updater/conditional-updater.js";
import Clock from "../clock/clock.js";
import Calendar from "../calendar/calendar.js";
import YearProgress from "../year-progress/year-progress.js";
import Age from "../age/age.js";
import * as s from "../../shared/styles.js";
import * as types from "../../shared/types.js";
import * as time from "../../shared/time.js";

// TODO: move images somewhere else
// import img from '../img/moonlight.jpg'
import dark from "../../img/night.jpg";
import light from "../../img/47.jpg";
import iconCog from "../../icons/cog.svg";

class App extends React.Component {
  static config = {
    yearProgressDecimalPlaces: 8,
    ageDecimalPlaces: 9
  };

  state = {
    backgroundImage: light,
    menuOpened: false,
    menuOpened: true,
    selectedView: types.views.AGE
  };

  toggleMenuOpenedState = () => {
    this.setState(prevState => ({
      menuOpened: !prevState.menuOpened
    }));
  };

  closeMenu = () => {
    this.setState({
      menuOpened: false
    });
  };

  setViewType = newViewType => {
    this.setState({
      selectedView: newViewType
    });
  };

  setRandomBackgroundImage = () => {
    this.setState(prevState => ({
      backgroundImage: prevState.backgroundImage === light ? dark : light
    }));
  };

  render() {
    return (
      <AppWrapper
        style={{
          backgroundImage: `url("${this.state.backgroundImage}")`
        }}
      >
        <AppContent>
          {(() => {
            switch (this.state.selectedView) {
              case types.views.CLOCK:
                return (
                  <ConditionalUpdater
                    updateEveryN={time.minute}
                    component={time => <Clock time={time} />}
                    key={this.state.selectedView}
                  />
                );

              case types.views.CALENDAR:
                return (
                  <ConditionalUpdater
                    updateEveryN={time.day}
                    component={time => <Calendar time={time} />}
                    key={this.state.selectedView}
                  />
                );

              case types.views.YEAR_PROGRESS:
                return (
                  <ConditionalUpdater
                    updateEveryN={
                      time.year /
                      100 /
                      10 ** App.config.yearProgressDecimalPlaces
                    }
                    component={time => (
                      <YearProgress
                        time={time}
                        decimalPlaces={App.config.yearProgressDecimalPlaces}
                      />
                    )}
                    key={this.state.selectedView}
                  />
                );

              case types.views.AGE: {
                // TODO
                const birthDate = new Date(1991, 3, 20).getTime();
                return (
                  <ConditionalUpdater
                    updateEveryN={time.year / 10 ** App.config.ageDecimalPlaces}
                    component={time => (
                      <Age
                        time={time}
                        birthDate={birthDate}
                        decimalPlaces={App.config.ageDecimalPlaces}
                      />
                    )}
                    key={this.state.selectedView}
                  />
                );
              }

              case types.views.NOTHING:
                return null;

              default:
                throw new Error("Unknown view");
            }
          })()}
        </AppContent>

        <MenuButton onClick={this.toggleMenuOpenedState}>
          <MenuButtonIcon src={iconCog} />
        </MenuButton>

        <AppMenu opened={this.state.menuOpened}>
          <MenuWrapper
            opened={this.state.menuOpened}
            selectedView={this.state.selectedView}
            setViewType={this.setViewType}
            setRandomBackgroundImage={this.setRandomBackgroundImage}
            closeMenu={this.closeMenu}
          />
        </AppMenu>
      </AppWrapper>
    );
  }
}

const AppWrapper = glamorous.div({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: s.grid(1),
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  // Menu is overflowing and is hidden on the right side
  overflowX: "hidden"
});

const AppContent = glamorous.main({
  display: "flex",
  flexDirection: "column",
  maxWidth: "1200px",
  width: "100%"
});

const AppMenu = glamorous.aside(
  {
    boxSizing: "border-box",
    position: "absolute",
    top: "0",
    left: "100%",
    width: "400px",
    height: "100%",
    transition: "0.5s all ease",
    zIndex: s.zIndex.menu
  },
  props => {
    if (props.opened) {
      return { transform: "translateX(-100%)" };
    }
  }
);

const MenuButton = glamorous.button({
  position: "absolute",
  left: s.grid(1),
  top: s.grid(1),
  border: 0,
  background: "rgba(255, 0, 0, 0.2)",
  padding: "10px",
  cursor: "pointer"
});

const MenuButtonIcon = glamorous.img({
  display: "block",
  width: "500px",
  height: "400px",
  objectFit: "contain"
});

export default App;
