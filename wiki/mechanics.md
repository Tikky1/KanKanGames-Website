# Mechanics

This page explains how the game works: character stats, block breaking, combat, the day cycle, enemies, loot and the boss.

> 🔒 = Full version only.

**Contents:** [Character](mechanics.md?id=character) · [Inventory and equipment](mechanics.md?id=inventory-and-equipment) · [Block breaking](mechanics.md?id=block-breaking) · [Combat](mechanics.md?id=combat) · [Time and day cycle](mechanics.md?id=time-and-day-cycle) · [World and biomes](mechanics.md?id=world-and-biomes) · [Enemies](mechanics.md?id=enemies) · [Chests and loot](mechanics.md?id=chests-and-loot) · [Dracula](mechanics.md?id=dracula) · [Death and respawn](mechanics.md?id=death-and-respawn) · [Multiplayer and saving](mechanics.md?id=multiplayer-and-saving) · [Achievements](mechanics.md?id=achievements)

---

## Character

| Stat | Starting value |
|---|---|
| Health | 100 |
| Armor (defense) | 5 |
| Movement speed | 5 |
| Jump force | 10 |
| Climb speed (ladders) | 5 |
| Critical hit rate | 10% |
| Critical damage multiplier | ×1.5 |
| Base damage | 0 (damage comes from the weapon) |
| Stamina | 100 |
| Stamina regeneration | 10 per second (after a 1 s delay) |
| Health regeneration | 3 per second (3.5 s after combat) |
| Respawn time | 10 s |

### Dash

Press `Left Shift` to dash quickly in your movement direction.

- **Cost:** 25 stamina
- **Cooldown:** 2 s
- **Duration:** 0.3 s

---

## Inventory and equipment

| | Count |
|---|---|
| Inventory slots | 36 (9-slot hotbar + 3 rows) |
| Armor slots | 3 (Head, Chest, Legs) |
| Accessory slots | 3 |
| Chest capacity | 27 slots |

- Press `1`–`9` to select a hotbar slot; the selected item is the one in your hand.
- Press `Tab` to open the inventory. You can pick items up with the cursor and move or swap them.
- Press `T` to **throw** (drop) the item in your hand.
- If your inventory is full, picked-up or crafted items drop on the ground.
- **Shift + Left Click** quickly transfers an item between inventory and a chest/crafting UI.
- The inventory has a **trash slot**. Dropping an item on it replaces whatever was there before — even if it's the same item type, the old stack is discarded and only the new one remains (e.g. drop 10 Wood, then drop 1 Wood: only 1 Wood remains in the trash slot). Items in the trash slot can still be retrieved by dragging them back out.
---

## Block breaking

Break blocks by holding left-click with a **pickaxe** (or bare-handed for some blocks). Pickaxe range is **5** (Diamond Pickaxe **6**); bare-hand range is **6** blocks.

### Break time

```text
Break time (s) = Block hardness ÷ Tool speed
```

If your tool **tier** is lower than the block's required tier, **the block cannot be broken**.

**Tool tiers (low to high):** Hand → Wood → Stone → Iron → Gold → Diamond

### Block hardness and required tier

| Block | Hardness | Required tool tier | Drops |
|---|---|---|---|
| Dirt | 0.7 | Hand | Dirt |
| Grass | 1.0 | Hand | Grass |
| Leaf | 0.1 | Hand | Leaf |
| Smooth Stone | 3.0 | Wood | Smooth Stone |
| Snow 🔒 | 0.5 | Hand | Snow |
| Stone | 1.3 | Wood | Stone |
| Wood | 1.0 | Hand | Wood |
| Coal Ore | 2.0 | Stone | Coal |
| Diamond Ore | 3.0 | Gold | Diamond |
| Gold Ore | 2.6 | Iron | Gold (Raw) |
| Iron Ore | 2.3 | Stone | Iron (Raw) |
| Glacierore Leaf 🔒 | 0.1 | Hand | Glacierore Leaf |
| Glacierore Wood 🔒 | 1.0 | Hand | Glacierore Wood |
| Mesquite Leaf 🔒 | 0.1 | Hand | Mesquite Leaf |
| Mesquite Wood 🔒 | 1.0 | Hand | Mesquite Wood |
| Sand 🔒 | 0.7 | Hand | Sand |
| Stone Sand 🔒 | 1.3 | Wood | Stone Sand |
| Stone Snow 🔒 | 1.3 | Wood | Stone Snow |

### Break times (seconds)

`✖` = cannot be broken with that tool.

| Block (required tier) | Hand | Wood | Stone | Iron | Gold | Diamond |
|---|---|---|---|---|---|---|
| Dirt (Hand) | 1.17 s | 0.93 s | 0.70 s | 0.35 s | 0.23 s | 0.17 s |
| Wood (Hand) | 1.67 s | 1.33 s | 1.00 s | 0.50 s | 0.33 s | 0.25 s |
| Stone (Wood) | ✖ | 1.73 s | 1.30 s | 0.65 s | 0.43 s | 0.33 s |
| Coal Ore (Stone) | ✖ | ✖ | 2.00 s | 1.00 s | 0.67 s | 0.50 s |
| Iron Ore (Stone) | ✖ | ✖ | 2.30 s | 1.15 s | 0.77 s | 0.57 s |
| Gold Ore (Iron) | ✖ | ✖ | ✖ | 1.30 s | 0.87 s | 0.65 s |
| Diamond Ore (Gold) | ✖ | ✖ | ✖ | ✖ | 1.00 s | 0.75 s |
| Smooth Stone (Wood) | ✖ | 4.00 s | 3.00 s | 1.50 s | 1.00 s | 0.75 s |

### Placement

- Block and wall placement range is **5 blocks**.
- The **Iron Chisel** breaks walls and reshapes some blocks.
- Some blocks (Workbench, Furnace, Chest, Bed…) cannot be reshaped.

---

## Combat

### Damage calculation

```text
1. Crit?        → chance = attacker's crit rate
                → if crit, damage × crit multiplier
2. Reduction    = Defense ÷ (Defense + 10)
3. Final damage = Damage × (1 − Reduction)     (minimum 1)
```

Examples (Defense → reduction): 5 → 33% · 14 (Iron set) → 58% · 23 (Gold set) → 70% · 35 (Diamond set) → 78%.

Equipment and accessories raise your defense (e.g. Shield +10). Some attackers can have armor penetration, which lowers the target's effective defense.

### Other rules

- A hit target is **knocked back**. There is a short cooldown, so you can't be chain-knocked-back.
- Being hit interrupts health regeneration (the combat cooldown restarts).

For weapon damage values see [Items → Weapons](items.md?id=weapons).

---

## Time and day cycle

- The in-game clock starts at **08:00**.
- **1 real second = 1 in-game minute**, so one in-game day is **24 real minutes**.
- **Day:** 06:00 – 18:00 (12 real minutes)
- **Night:** 18:00 – 06:00 (12 real minutes)

At night **more and more dangerous enemies** spawn on the surface. The background also changes.

---

## World and biomes

| | Demo | Full version |
|---|---|---|
| Size | 300 × 200 blocks | 800 × 500 blocks |
| Surface level | ~85% of world height | ~90% of world height |
| Biomes | Forest (100%) | Desert (33%), Forest (33%), Snow (34%) |
| Cave pockets | 15–20 | 60–70 |
| Castle Ruins | 1 | 1 |

Each biome has two **layers**: **Surface** and **Underground**. The world is generated in steps: biomes, surface height, terrain fill, caves, ores, then structures. The same **seed** always produces the same world.

### Ore depth

Percentages are height measured from the **bottom** of the world (0% = deepest).

| Ore | Range | Most common at | Vein size | Pickaxe needed |
|---|---|---|---|---|
| Coal | 55% – 87% | 60% | 5–10 blocks | Stone |
| Iron | 15% – 65% | 25% | 5–10 blocks | Stone |
| Gold | 0% – 25% | 10% | 8–16 blocks | Iron |
| Diamond | 0% – 15% | 5% | 6–12 blocks | Gold |

### Structures

| Structure | Where | Contents |
|---|---|---|
| **Tree** | Surface: Forest 50–75, Snow 🔒 25–50, Desert 🔒 5–10 | Wood, Leaf (Mesquite / Glacierore Wood in desert / snow) |
| **Cave pocket** | Underground, 5%–35% height from the bottom | Chests |
| **Castle Ruins** (Dracula's Lair) | Underground, 5%–20% height from the bottom, **1 per world** | **Vampire Altar**, torches, stone brick walls |

The Blood Compass points you to the Castle Ruins.

---

## Enemies

Enemies spawn automatically depending on your layer and the time of day, and despawn when you move far away.

### Spawn rules

| Layer | Time | Max enemies | Spawn interval | Spawn distance |
|---|---|---|---|---|
| Forest surface | Day | 5 | 10 s | 10–20 blocks |
| Forest surface | Night | 10 | 6 s | 10–20 blocks |
| Underground | Day / Night | 20 | 6 s | 10–15 blocks |

Desert and Snow surfaces 🔒 use the **same** values as the forest surface (5 by day / 10 by night, same interval and distance).

### What spawns where

Percentages are computed from spawn weights (one enemy is picked per spawn).

| Place / Time | Enemies |
|---|---|
| **Forest – Day** | Green Slime 67%, Slime 33% |
| **Forest – Night** | Creature 53%, Slime 13%, Green Slime 13%, Boar 13%, Phoenix 7% |
| **Underground** | Bat 56%, Slime 33%, Creature 11% |
| **Desert – Day** 🔒 | Yellow Slime 50%, Orange Slime 50% |
| **Desert – Night** 🔒 | Creature 42%, Cactus Man 26%, Elder Phoenix 11%, Yellow Slime 11%, Orange Slime 11% |
| **Snow – Day** 🔒 | Purple Slime 62%, Slime 38% |
| **Snow – Night** 🔒 | Gingerbread Man 41%, Creature 24%, Purple Slime 24%, Slime 12% |

### Enemy stats

| Enemy | Health | Contact damage | Behavior |
|---|---|---|---|
| **Slime** | 30 | 5 | Hops along; attacks if it notices you within 10 blocks. |
| **Green Slime** | 40 | 7 | A tougher Slime. |
| **Yellow Slime** 🔒 | 35 | 6 | Desert; a bit faster than the Slime. |
| **Orange Slime** 🔒 | 50 | 9 | Desert; slow but hits hard. |
| **Purple Slime** 🔒 | 45 | 8 | Snow. |
| **Bat** | 20 | 4 | Flies erratically; 12-block vision. |
| **Boar** | 80 | 12 | **Charges** when it sees you (0.8 s wind-up, 1.2 s recovery). |
| **Creature** | 30 | 5 | Throws **Pillows** from range (10 damage), 10-block attack range. |
| **Phoenix** | 60 | 5 | Hovers above you and **drops eggs** (20 damage). |
| **Cactus Man** 🔒 | 30 | 13 | Throws cactus spines from range (20 damage). |
| **Gingerbread Man** 🔒 | 30 | 12 | Throws cookies from range (20 damage). |
| **Elder Phoenix** 🔒 | 120 | 10 | A stronger Phoenix; its eggs deal 30 damage. |

### Enemy drops

| Enemy | Drops |
|---|---|
| **Slime** | 1–3 Slime Gel (always) · 20% 1–2 Raw Iron · 5% 1 Raw Gold |
| **Bat** | 20% Bat Wing · 1–2 rolls, each 15% 1–2 Raw Iron, 5% Raw Gold |
| **Boar** | 70% 1–2 Boar Tooth · 0–1 roll: 15% Raw Iron, 5% Raw Gold |
| **Creature** | 20% 1–2 Raw Iron · 5% Raw Gold · 4% Pillow |
| **Phoenix** | 0–1 roll of **Phoenix Feather** (1–2) and a separate 0–1 roll of **Phoenix Meat** (1–2). Either may or may not drop. |
| **Cactus Man** 🔒 | 85% 1–3 Cactus Fiber · 24% Raw Iron · 6% Raw Gold |
| **Gingerbread Man** 🔒 | 65% Cookie · 12% Raw Iron · 3% Raw Gold |
| **Elder Phoenix** 🔒 | Elder Phoenix Feather (0–1 roll, 1–2) · 1–2 Phoenix Meat (always) |
| **Dracula** | Heart, Cape or Teeth (one of three, equal chance) |
---

## Chests and loot

**Chests** are found in underground cave pockets. Right-click a chest to open it. Each chest rolls **three pools**:

**Pool 1 — 4 to 8 rolls**

| Item | Chance | Amount |
|---|---|---|
| Torch | 35% | 8–16 |
| Wood | 25% | 8–16 |
| Throwable Light | 20% | 4–8 |
| Bottle | 20% | 2–4 |

**Pool 2 — 3 to 5 rolls**

| Item | Chance | Amount |
|---|---|---|
| Arrow | 33% | 8–16 |
| Dart | 22% | 8–16 |
| Healing Potion | 17% | 1–2 |
| Bed | 11% | 1 |
| Bow | 11% | 1 |
| Pillow | 6% | 1 |

**Pool 3 — 1 roll (rare)**

| Result | Chance | Amount |
|---|---|---|
| Nothing | 36% | — |
| Dracula Pendant Fragment | 15% | 1 |
| Blood Compass | 10% | 1 |
| Coal | 10% | 8–16 |
| Iron Ingot | 10% | 2–4 |
| Return Mirror | 5% | 1 |
| Gold Ingot | 5% | 1–2 |
| Four Leaf Clover | 3% | 1 |
| Sneakers / Jump Boots / Shield | 2% each | 1 |

> **Demo:** the demo world has **one** cave-pocket chest (underground, 5%–35% height) with a **guaranteed Dracula Pendant Fragment**. The full version has no such special chest; you have to find the Fragment in normal chests (15%).

---

## Dracula

The game's first big boss, and the last step of the Guide.

### Summoning

1. Use the **Blood Compass** to find the Castle Ruins (Dracula's Lair).
2. Find the **Vampire Altar** in this underground structure.
3. **Right-click** the altar while you have the **Dracula Pendant** in your inventory.

The Pendant is crafted at an Alchemy Table: 1× Pendant Fragment + 3× Bat Wing + 2× Gold Ingot + 1× Diamond. Pendant Fragments come from underground chests.

> *"Hint: Dracula hates sunshine."* — the Pendant's description

- **In the demo**, the Pendant is **not consumed** when summoning Dracula.
- **In the full version**, the Pendant **is consumed** upon summoning.
- The **altar persists** and can be reused to summon Dracula again.
- Dracula can be summoned **at any time of day** — the altar is underground, so there's no day/night restriction. (The "hates sunshine" hint is flavor text, not a gameplay mechanic.)

### The fight

| | Phase 1 | Phase 2 (below 50% health) |
|---|---|---|
| Health | 2000 (scales with players *) | — |
| Armor | 8 | 2 |
| Movement | Flies in circles around the target | Fast **dash chain** (4 dashes in a row) |
| Damage | 15 | 15 |
| Crit | 10% (×1.5) | 30% (×1.8) |
| Special | Summons a **Bat** every 8 s (max 2 alive) | **Drain aura**: 3 damage per second within 4 blocks |

\* Health scales with player count: `Max Health = Base Health × (1 + 0.6 × (extra players))`. Each player beyond the first adds **+60% max health** (e.g. 2 players → 2600 HP, 3 players → 3200 HP, 4 players → 3800 HP).

- **Phase 2 has lower armor (2 vs. 8) by design** — the trade-off for Dracula becoming faster and more aggressive (dash chain, drain aura) is that he's easier to hit.
- The phase threshold is confirmed: **health ≤ 50%** triggers Phase 2.
- The boss has dedicated sound effects and music cues for summoning, phase change, and death.

### Loot

When Dracula dies he drops one of **Heart, Cape or Teeth**. They are currently **not usable in the demo**. In the demo, defeating Dracula opens the **Demo Completed** screen.

---

## Death and respawn

- When you die, the "You have died!" screen appears and you respawn after **10 seconds**.
- **Dying does not cost you any items.** Your inventory and equipment stay with you.
- You respawn at **the last bed you used**, or at the world spawn if you have none.
- The **Return Mirror** teleports you to your bed.
- In multiplayer, you can **spectate** other players at any time — not just while dead (`N` cycles the target, `R` returns to yourself).

---

## Multiplayer and saving

- Up to **4 players**.
- One player is the **host**; the world runs on their machine. The host handles physics and health calculations.
- Join with **Steam** or **IP**.
- **Autosave** runs every 300 seconds (5 minutes).
- A **backup** is made when you delete a world.
- Worlds can be kept **locally** or synced to **Steam Cloud** — toggle this with the cloud icon in the world selection screen.

---

## Achievements

| Achievement | How to earn it |
|---|---|
| **Easy Crafting** | Craft your first item. |
| **First Blood** | Slay your first enemy. |
| **Monster Slayer** | Slay every type of enemy. |
| **Master Miner** | Break 100 blocks. |
| **Jeweler's Apprentice** | Break a diamond ore. |
| **Christopher Columbiome** | Visit every type of biome. |
| **Deepbound** | Visit the deepest area in the world. |
| **Lord Of The Vampires** | Defeat the Vampire King, Dracula. |
