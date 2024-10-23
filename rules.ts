import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key
  {
    description: "Control to Hyper Key (⌃⌥⇧⌘) and Caps Lock to Control",
    manipulators: [
      {
        description:
          "Change caps_lock to left_control if pressed with other keys, change caps_lock to escape if pressed alone.",
        from: {
          key_code: "caps_lock",
          modifiers: { optional: ["any"] },
        },
        to: [{ key_code: "left_control" }],
        to_if_alone: [{ key_code: "escape" }],
        type: "basic",
      },
      {
        description: "Control -> Hyper Key",
        from: { key_code: "left_control", modifiers: { optional: ["any"] } },
        to: [{ set_variable: { name: "hyper", value: 1 } }],
        to_after_key_up: [{ set_variable: { name: "hyper", value: 0 } }],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // Spacebar = Open applications
    spacebar: {
      1: app("Telegram"),
      2: app("Spotify"),
      j: app("Visual Studio Code"),
      k: app("Arc"),
      l: app("WezTerm"),
      p: app("Postman"),
      s: app("Slack"),
      d: app("DBeaver"),
      f: app("Finder"),
      t: app("Toggl Track"),
      o: app("Obsidian"),
      c: app("Calendar"),
      n: app("Notes"),
      r: app("Reminders"),
      m: app("Mail"),
    },

    // s = "System"
    s: {
      u: { to: [{ key_code: "volume_increment" }] },
      j: { to: [{ key_code: "volume_decrement" }] },
      i: { to: [{ key_code: "display_brightness_increment" }] },
      k: { to: [{ key_code: "display_brightness_decrement" }] },
      p: { to: [{ key_code: "play_or_pause" }] },
    },

    // Vim movement
    h: { to: [{ key_code: "left_arrow" }] },
    j: { to: [{ key_code: "down_arrow" }] },
    k: { to: [{ key_code: "up_arrow" }] },
    l: { to: [{ key_code: "right_arrow" }] },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
