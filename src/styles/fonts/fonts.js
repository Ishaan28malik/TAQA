import localFont from "next/font/local";

const groldMedium = localFont({
  variable: "--grold-medium",
  src: "./fonts/Grold-Medium.otf",
  display: "swap",
});
const groldRegular = localFont({
  variable: "--grold-regular",
  src: "./fonts/Grold-Regular.otf",
  display: "swap",
});
const robotoMedium = localFont({
  variable: "--roboto-medium",
  src: "./fonts/Roboto-Medium.ttf",
  display: "swap",
});
const robotoRegular = localFont({
  variable: "--roboto-regular",
  src: "./fonts/Roboto-Regular.ttf",
  display: "swap",
});
const bukraRegular = localFont({
  variable: "--bukra-regular",
  src: "./fonts/Bukra-Regular.otf",
  display: "swap",
});
const bukraSemiBold = localFont({
  variable: "--bukra-semiBold",
  src: "./fonts/Bukra-SemiBold.otf",
  display: "swap",
});
const ibmPlexRegular = localFont({
  variable: "--ibmPlex-regular",
  src: "./fonts/IBMPlex-Regular.otf",
  display: "swap",
});
const ibmPlexMedium = localFont({
  variable: "--ibmPlex-medium",
  src: "./fonts/IBMPlex-Medium.otf",
  display: "swap",
});
const ibmPlexSemiBold = localFont({
  variable: "--ibmPlex-semiBold",
  src: "./fonts/IBMPlex-SemiBold.otf",
  display: "swap",
});

export {
  groldMedium,
  groldRegular,
  robotoMedium,
  robotoRegular,
  bukraRegular,
  bukraSemiBold,
  ibmPlexRegular,
  ibmPlexMedium,
  ibmPlexSemiBold,
};
