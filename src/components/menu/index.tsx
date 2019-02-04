import React from "react";
import { view } from "react-easy-state";
import {
  MenuWrapper,
  ToggleButton,
  ToggleButtonIcon,
  ToggleButtonSpacer,
  Heading,
  Text,
  MenuSectionsWrapper,
  MenuSectionStyled,
  HeadingSmall,
  RadioLabel,
  RadioText
} from "./styled";
import { eventToAgeOfBirthValues } from "./utils";
import { state } from "../../state/state";
import { timestampToDateInputValue } from "../../shared/time";
import iconCog from "../../icons/cog.svg";

type MenuProps = {
  isDev: boolean;
};

export const Menu = view((props: MenuProps) => {
  return (
    <MenuWrapper
      settingsHidden={
        state.settings.settingsHidden && !state.settings.menuOpened
      }
    >
      <ToggleButton onClick={state.settings.toggleMenu}>
        <ToggleButtonIcon src={iconCog} rotated={state.settings.menuOpened} />
      </ToggleButton>

      <ToggleButtonSpacer />

      <div inert={state.settings.menuOpened === false ? "inert" : null}>
        <MenuContent isDev={props.isDev} />
      </div>
    </MenuWrapper>
  );
});

// React.memo used to prevent rerendering of whole menu when menuOpened state
// changes in parent component
// TODO: might not be needed after we chagned state library?
const MenuContent = view((props: MenuProps) => {
  return (
    <>
      <Heading>Hello Friend &ndash; New Tab Page</Heading>
      <Text>
        This is your new cool new tab page. Enjoy a nice background from Bing
        every day or have a look at some nice background that I preselected.
        There is also a bunch of useful that you can display in front of the
        background, like clock and stuff!
      </Text>

      <MenuSectionsWrapper>
        <MenuSection title="Background image">
          {!state.browser.online && (
            <div>You are currently offline, falling back to local images</div>
          )}
          {state.image.imageBing.type === "ERROR" && (
            <>
              {/* TODO: proper error matching */}
              <p>Error</p>
              <p>errorType: {state.image.imageBing.errorType}</p>
              <p>errorData: {String(state.image.imageBing.data)}</p>
              <pre>
                <code>{JSON.stringify(state.image.imageBing)}</code>
              </pre>
            </>
          )}

          <Radio
            name="images"
            onChange={() => state.image.setImageSource("BING")}
            checked={state.image.imageSourceWithFallback === "BING"}
            disabled={state.browser.online === false}
          >
            Bing image of the day
          </Radio>

          <Radio
            name="images"
            onChange={() => state.image.setImageSource("LOCAL")}
            checked={state.image.imageSourceWithFallback === "LOCAL"}
          >
            Predefined
          </Radio>

          {state.image.imageSourceWithFallback === "BING" &&
            state.image.imageBing.type === "DONE" && (
              <section>
                {state.image.imageBing.data.title && (
                  <Text>title: {state.image.imageBing.data.title}</Text>
                )}
                {state.image.imageBing.data.description && (
                  <Text>
                    description: {state.image.imageBing.data.description}
                  </Text>
                )}
                {state.image.imageBing.data.link && (
                  <Text>
                    <a href={state.image.imageBing.data.link}>link</a>
                  </Text>
                )}
              </section>
            )}

          {state.image.imageSourceWithFallback === "LOCAL" && (
            <section>
              <button onClick={() => state.image.shiftImageLocalIndex(-1)}>
                Prev
              </button>
              <button onClick={state.image.setImageLocalRandom}>
                Random image
              </button>
              <button onClick={() => state.image.shiftImageLocalIndex(1)}>
                Next
              </button>

              {(() => {
                const image = state.image.imageLocal;

                return (
                  <>
                    <Text>
                      image: {state.image.imageLocalIndex + 1}/
                      {state.image.imagesLocal.length}
                    </Text>
                    {image.name && <Text>name: {image.name}</Text>}
                    {image.location && <Text>location: {image.location}</Text>}
                    {image.source && (
                      <Text>
                        <a href={image.source}>source</a>
                      </Text>
                    )}
                  </>
                );
              })()}
            </section>
          )}
        </MenuSection>

        <MenuSection title="View type">
          <Radio
            name="view"
            onChange={() => state.settings.setSelectedView("CLOCK")}
            checked={state.settings.selectedView === "CLOCK"}
          >
            Clock
          </Radio>

          <Radio
            name="view"
            onChange={() => state.settings.setSelectedView("AGE")}
            checked={state.settings.selectedView === "AGE"}
          >
            Age
          </Radio>

          <Radio
            name="view"
            onChange={() => state.settings.setSelectedView("NOTHING")}
            checked={state.settings.selectedView === "NOTHING"}
          >
            Nothing
          </Radio>

          {state.settings.selectedView === "CLOCK" && (
            <label>
              <Text>
                <input
                  type="checkbox"
                  checked={state.settings.clockShowSeconds}
                  onChange={state.settings.toggleClockShowSeconds}
                />
                Show seconds
              </Text>
            </label>
          )}

          {state.settings.selectedView === "AGE" && (
            <label>
              Your date of birth
              <input
                type="date"
                min={timestampToDateInputValue(Date.UTC(1900, 0, 1))}
                max={timestampToDateInputValue(Date.now())}
                value={state.settings.ageDateOfBirthInputValue}
                onChange={e =>
                  state.settings.setAgeDateOfBirth(eventToAgeOfBirthValues(e))
                }
              />
            </label>
          )}
        </MenuSection>

        <MenuSection title="Minimalistic version">
          <Text>
            Settings button will be hidden unless you hover the mouse over the
            area where the button is. Also bunch of useless text (like this
            paragraph) will be hidden.
          </Text>
          <label>
            <input
              type="checkbox"
              checked={state.settings.settingsHidden}
              onChange={state.settings.toggleSettingsHidden}
            />
            Hide stuff
          </label>
        </MenuSection>

        <MenuSection title="Contact">
          <Text>
            If you find any bugs or if you would like to tell me how much you
            like this swell plugin you can do so on following channels. Also
            this plugin is open source, so you contribute on GitHub!
          </Text>
          <a href="https://github.com/hurtak/hello-friend">Github</a>
          <a href="https://twitter.com/PetrHurtak">Twitter</a>
          <a href="mailto:petr.hurtak@gmail.com">Mail</a>
        </MenuSection>

        {props.isDev && (
          <MenuSection title="Dev menu">
            <Text>This menu is only visible in development mode</Text>
            <button onClick={state.settings.resetAppState}>
              Reset app state
            </button>
          </MenuSection>
        )}
      </MenuSectionsWrapper>
    </>
  );
});

const MenuSection = (props: {
  title: string;
  children: (false | JSX.Element)[]; // TODO: why false?
}) => (
  <MenuSectionStyled>
    <HeadingSmall>{props.title}</HeadingSmall>
    {props.children}
  </MenuSectionStyled>
);

const Radio = (props: {
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}) => (
  <RadioLabel>
    <input
      type="radio"
      name={props.name}
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange}
    />
    <RadioText>{props.children}</RadioText>
  </RadioLabel>
);