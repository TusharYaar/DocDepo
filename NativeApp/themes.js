let THEMES = {};
const fonts = {
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  }

THEMES.darkTheme = {
  animation: {
    scale: 1,
  },
  dark: true,
  value: "darkTheme",
  label: "Dark Theme",
  colors: {
    accent: "#03dac6",
    backdrop: "rgba(0, 0, 0, 0.5)",
    background: "rgb(1, 1, 1)",
    border: "rgb(39, 39, 41)",
    card: "rgb(18, 18, 18)",
    disabled: "rgba(255, 255, 255, 0.38)",
    error: "#CF6679",
    notification: "rgb(255, 69, 58)",
    onSurface: "#FFFFFF",
    placeholder: "rgba(255, 255, 255, 0.54)",
    primary: "rgb(10, 132, 255)",
    surface: "#121212",
    text: "rgb(229, 229, 231)",
  },
  fonts:fonts,
  mode: "adaptive",
  roundness: 4,
};

THEMES.lightTheme = {
  value: "lightTheme",
  label: "Light Theme",
  animation: {
    scale: 1,
  },
  colors: {
    accent: "#03dac4",
    backdrop: "rgba(0, 0, 0, 0.5)",
    background: "rgb(242, 242, 242)",
    border: "rgb(216, 216, 216)",
    card: "rgb(255, 255, 255)",
    disabled: "rgba(0, 0, 0, 0.26)",
    error: "#B00020",
    notification: "rgb(255, 59, 48)",
    onSurface: "#000000",
    placeholder: "rgba(0, 0, 0, 0.54)",
    primary: "rgb(0, 122, 255)",
    surface: "#ffffff",
    text: "rgb(28, 28, 30)",
  },
  dark: false,
  fonts: fonts,
  roundness: 4,
};


export default THEMES;
