import localFont from "next/font/local";

export const CabinetGrotesk = localFont({
  src: [
    {
      path: "./fonts/CabinetGrotesk/Fonts/OTF/CabinetGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },

    {
      path: "./fonts/CabinetGrotesk/Fonts/OTF/CabinetGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk/Fonts/OTF/CabinetGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk/Fonts/OTF/CabinetGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk/Fonts/OTF/CabinetGrotesk-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },

    {
      path: "./fonts/CabinetGrotesk/Fonts/OTF/CabinetGrotesk-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-CabinetGrotesk",
});
