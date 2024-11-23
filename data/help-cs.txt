# HELP : `!seed` Command Help

The `!seed` command allows you to generate seeds, tailored to your preferences. This command lets you choose a seed type and ban specific combinations of settings that you find too difficult, annoying, or simply don’t want to play.

## How to Use:

- **Basic Usage:**  
  To generate a seed, use the command followed by options for the type and any settings you want to ban.

  **Example:**  
  `!seed classic ban=tokensanity;shuffle_smallkeys;shuffle_overworld_entrances`  
  This will generate a **RSL S7** seed without *tokensanity*, *keysanity*, and *overworld entrance randomization* (ER OW).

## Available Options:

- **Type:**
    - `s6` → Generates a **Beginner S6** seed.
    - `intermediate` → Generates a **Intermediate S7** seed. It's old version of Beginner S7.
    - `classic` → Generates a **RSL S7** seed.
    - `classic-s6` → Generates a **RSL S6** seed.
    - If no type is specified, it will default to a **Beginner S7** seed. It's a new version of Beginner, easier.

- **Ban Settings:**  
  You can ban multiple settings by specifying them after `ban=`, separated by semicolons (`;`).

  **Example:**  
  `ban=tokensanity;shuffle_smallkeys;shuffle_overworld_entrances`  
  This will ban *tokensanity*, *small keys shuffling*, and *overworld entrances randomization*.

  If nothing is specified, no setting will be banned

- **List Settings:**  
  To see the full list of available settings that you can ban, use:  
  `!seed list`

- **Help:**  
  To display this help message, use:  
  `!seed help`

## Quick Example:

To generate a seed of type **RSL S7** without *tokensanity*, *small keys shuffling*, and *overworld entrance randomization*, your command would look like this:  
`!seed classic ban=tokensanity;shuffle_smallkeys;shuffle_overworld_entrances`

---

This message gives users a clear, step-by-step guide on how to use the command, what options are available, and includes examples to help them understand how it works.