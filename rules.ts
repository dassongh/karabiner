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
  ...createHyperSubLayers({
    // number row
    1: app("WezTerm"),
    2: app("Zen"),
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
    z: app("Notes"),
    x: app("Reminders"),
    c: app("Calendar"),
    b: app("Books"),
    m: app("Mail"),

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
      b: { to: [{ key_code: "rewind" }] },
      n: { to: [{ key_code: "fastforward" }] },
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
