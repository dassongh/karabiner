import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key
  {
    description: "Tab to Hyper Key (⌃⌥⇧⌘) and Caps Lock to Control",
    manipulators: [
      {
        description:
          "CapsLock -> Left Control with other keys, CapsLock -> Escape alone",
        from: {
          key_code: "caps_lock",
          modifiers: { optional: ["any"] },
        },
        to: [{ key_code: "left_control" }],
        to_if_alone: [{ key_code: "escape" }],
        type: "basic",
      },
      // {
      //   description:
      //     "Left Shift -> CapsLock alone, Left Shift -> Shift with other keys",
      //   from: {
      //     key_code: "left_shift",
      //     modifiers: { optional: ["any"] },
      //   },
      //   to: [{ key_code: "left_shift" }],
      //   to_if_alone: [{ key_code: "caps_lock" }],
      //   type: "basic",
      // },
      {
        description: "Tab -> Hyper Key",
        from: { key_code: "tab", modifiers: { optional: ["any"] } },
        to: [{ set_variable: { name: "hyper", value: 1 } }],
        to_if_alone: [{ key_code: "tab" }],
        to_after_key_up: [{ set_variable: { name: "hyper", value: 0 } }],
        type: "basic",
      },
    ],
  },
  // ...createAltSubLayers({
  //   1: app("Calendar"),
  //   2: app("Telegram"),
  //   3: app("Spotify"),
  //   // z is reserved for main desktop
  //   x: app("WezTerm"),
  //   c: app("Visual Studio Code"),
  //   v: app("Arc"),
  //   b: app("Postman"),
  //   s: app("Slack"),
  //   d: app("DBeaver"),
  //   f: app("Finder"),
  //   r: app("Reminders"),
  //   t: app("Toggl Track"),
  //   o: app("Obsidian"),
  //   n: app("Notes"),
  //   m: app("Mail"),
  // }),
  ...createHyperSubLayers({
    // number row
    1: app("WezTerm"),
    2: app("Arc"),
    3: app("Cursor"),
    6: app("Spotify"),

    // top row
    r: app("Telegram"),
    t: app("Toggl Track"),
    o: app("Obsidian"),

    // center row
    a: app("Postman"),
    s: app("Slack"),
    d: app("DBeaver"),

    // bottom row
    c: app("Calendar"),
    b: app("Reminders"),
    n: app("Notes"),
    m: app("Mail"),

    // // Open apps
    // e: {
    //   // center row
    //   // f: app("Finder"),
    //   h: app("WezTerm"),
    //   j: app("Visual Studio Code"),
    //   k: app("Arc"),
    //   l: app("DBeaver"),

    //   // up row
    //   w: app("Spotify"),

    //   u: app("Slack"),
    //   i: app("Telegram"),
    //   e: app("Toggl Track"),
    //   o: app("Obsidian"),
    //   p: app("Postman"),

    //   // bottom row
    //   b: app("Reminders"),
    //   n: app("Notes"),
    //   m: app("Mail"),
    //   comma: app("Calendar"),
    // },

    // Vim movement
    h: { to: [{ key_code: "left_arrow" }] },
    j: { to: [{ key_code: "down_arrow" }] },
    k: { to: [{ key_code: "up_arrow" }] },
    l: { to: [{ key_code: "right_arrow" }] },

    // Spacebar for system
    spacebar: {
      u: { to: [{ key_code: "volume_increment" }] },
      j: { to: [{ key_code: "volume_decrement" }] },
      i: { to: [{ key_code: "display_brightness_increment" }] },
      k: { to: [{ key_code: "display_brightness_decrement" }] },
      p: { to: [{ key_code: "play_or_pause" }] },
    },

    // Raycast
    q: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      o: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: { show_in_menu_bar: false },
      profiles: [{ name: "Default", complex_modifications: { rules } }],
    },
    null,
    2
  )
);
