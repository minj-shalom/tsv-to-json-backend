export function JsonFormatter(json: Array<any>) {
  const data = json.filter(
    (item) => item?.English !== "" && item?.한국어 !== ""
  );

  let en: any = {};

  for (let i = 0; i < data.length; i++) {
    if (!en[data[i]["Group 1"]]) {
      en = { ...en, [data[i]["Group 1"]]: {} };
    }
    if (
      !en[data[i]["Group 1"]][data[i]["Group 2"]] &&
      data[i]["Group 2"] !== ""
    ) {
      en = {
        ...en,
        [data[i]["Group 1"]]: {
          ...en[data[i]["Group 1"]],
          [data[i]["Group 2"]]: {},
        },
      };
    }
    if (data[i]["Group 2"] !== "") {
      if (!en[data[i]["Group 1"]][data[i]["Group 2"]][data[i]["Type"]]) {
        en = {
          ...en,
          [data[i]["Group 1"]]: {
            ...en[data[i]["Group 1"]],
            [data[i]["Group 2"]]: {
              ...en[data[i]["Group 1"]][data[i]["Group 2"]],
              [data[i]["Type"]]: {},
            },
          },
        };
      }
      en = {
        ...en,
        [data[i]["Group 1"]]: {
          ...en[data[i]["Group 1"]],
          [data[i]["Group 2"]]: {
            ...en[data[i]["Group 1"]][data[i]["Group 2"]],
            [data[i]["Type"]]: {
              ...en[data[i]["Group 1"]][data[i]["Group 2"]][data[i]["Type"]],
              [data[i]["Name"]]: data[i]["English"],
            },
          },
        },
      };
    } else {
      if (!en[data[i]["Group 1"]][data[i]["Type"]]) {
        en = {
          ...en,
          [data[i]["Group 1"]]: {
            ...en[data[i]["Group 1"]],
            [data[i]["Type"]]: {},
          },
        };
      }
      en = {
        ...en,
        [data[i]["Group 1"]]: {
          ...en[data[i]["Group 1"]],
          [data[i]["Type"]]: {
            ...en[data[i]["Group 1"]][data[i]["Type"]],
            [data[i]["Name"]]: data[i]["English"],
          },
        },
      };
    }
  }

  let ko: any = {};

  for (let i = 0; i < data.length; i++) {
    if (!ko[data[i]["Group 1"]]) {
      ko = { ...ko, [data[i]["Group 1"]]: {} };
    }
    if (
      !ko[data[i]["Group 1"]][data[i]["Group 2"]] &&
      data[i]["Group 2"] !== ""
    ) {
      ko = {
        ...ko,
        [data[i]["Group 1"]]: {
          ...ko[data[i]["Group 1"]],
          [data[i]["Group 2"]]: {},
        },
      };
    }
    if (data[i]["Group 2"] !== "") {
      if (!ko[data[i]["Group 1"]][data[i]["Group 2"]][data[i]["Type"]]) {
        ko = {
          ...ko,
          [data[i]["Group 1"]]: {
            ...ko[data[i]["Group 1"]],
            [data[i]["Group 2"]]: {
              ...ko[data[i]["Group 1"]][data[i]["Group 2"]],
              [data[i]["Type"]]: {},
            },
          },
        };
      }
      ko = {
        ...ko,
        [data[i]["Group 1"]]: {
          ...ko[data[i]["Group 1"]],
          [data[i]["Group 2"]]: {
            ...ko[data[i]["Group 1"]][data[i]["Group 2"]],
            [data[i]["Type"]]: {
              ...ko[data[i]["Group 1"]][data[i]["Group 2"]][data[i]["Type"]],
              [data[i]["Name"]]: data[i]["한국어"],
            },
          },
        },
      };
    } else {
      if (!ko[data[i]["Group 1"]][data[i]["Type"]]) {
        ko = {
          ...ko,
          [data[i]["Group 1"]]: {
            ...ko[data[i]["Group 1"]],
            [data[i]["Type"]]: {},
          },
        };
      }
      ko = {
        ...ko,
        [data[i]["Group 1"]]: {
          ...ko[data[i]["Group 1"]],
          [data[i]["Type"]]: {
            ...ko[data[i]["Group 1"]][data[i]["Type"]],
            [data[i]["Name"]]: data[i]["한국어"],
          },
        },
      };
    }
  }

  const en_json = {
    translation: en,
  };

  const ko_json = {
    translation: ko,
  };

  return { en_json, ko_json };
}
