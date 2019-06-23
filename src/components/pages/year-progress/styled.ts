import styled from "styled-components/macro";
import * as s from "../../../styles/styles";

export const Wrapper = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});

export const ProgressBar = styled.div({
  position: "absolute",
  top: "80%",
  boxSizing: "border-box",
  width: s.sizePx(400),
  height: s.gridPx(8),
  border: `${s.gridPx(0.5)} solid ${s.colors.whiteTransparentDefault}`,
  borderRadius: s.sizePx(4),
});

type ProgressBarProps = { progress: number };

export const ProgressBarInner = styled.div.attrs((props: ProgressBarProps) => ({
  style: {
    width: props.progress * 100 + "%",
  },
}))((_: ProgressBarProps) => ({
  height: "100%",
  backgroundColor: s.colors.whiteTransparentDefault,
}));

export const Text = styled.div({
  ...s.text({ family: "NUMBERS", weight: "BOLD", selectable: false }),

  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: s.gridPx(3),
  opacity: s.opacity.default,
});