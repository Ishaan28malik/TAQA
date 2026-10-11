export const colors = {
  "--color-blue": "#00093F",
  "--color-green": "#0AB3A1",
  "--color-purple": "#6B42D1",
  "--color-font-black": "#1a1a1d",
  "--color-grey-75": "#717288",
  "--color-grey-50": "#9798A9",
  "--color-grey-25": "#D3D3D3",
  "--color-grey-10": "#FAFAFA",
  "--color-dBlue-25": "#80849F",
  "--color-dBlue-50": "#40476F"
};
export const brandColor = {
  residential: colors["--color-green"],
  business: colors["--color-purple"],
  partners: colors["--color-blue"],
};

export const brandSecondary = {
  residential: colors["--color-purple"],
  business: colors["--color-green"],
  partners: colors["--color-blue"],
};

export const regionMapForRegionSelector = {
  "ABU DHABI": "addc",
  "AL AIN": "aadc",
};

export const REDIRECT_PROMPT_LS_KEY = "doNotPromptRedirect";
export const REGION_SELECTOR_LS_KEY = "regionSelected";
export const NO_RESULTS_FOUND = {
  "en-us": "No results found",
  "ar-ae": "لا توجد نتائج",
};
export const SOMETHING_WENT_WRONG = {
  "en-us": "Something went wrong, please try again",
  "ar-ae": "حدث خطأ ما, يرجى إعادة المحاولة",
};

export const SECTIONS_EXCLUDED_FOR_SECONDARY_MENU = [
  "sitemap",
  "privacy-policy",
  "terms-of-use",
  "search"
]
