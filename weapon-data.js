// Classmod weapon data — loaded by index.html BEFORE its main script.
// Plain ES5 globals (no modules) so the site also works opened straight from
// disk (file://), not just on GitHub Pages.
//
// ── Classmod (the mod) ──
// WEAPONS: one class per weapon. Damage arrays are [vs T3, vs T2, vs T1];
// players have 100 HP. altMode: true → the weapon has a Normal/Alt pair on
// mordstats.com (Executioner's and Maul have no alt). HAND-AUTHORED — the
// generators below never touch it.
// WEAPON_TIMINGS: w = windup (ms), r = release (ms), rec = miss recovery (ms),
// t = turncaps [x, y], cw = combo-windup increase (omit and set nc: true when
// the attack cannot combo). Fully Blueprint-derived; regenerate with
// _work/gen-weapon-data.mjs (needs a fresh CDO export) — verify everything
// with _work/compare-site.mjs (the /verify-stats command).

var WEAPONS = [
      { name: "Greatsword", armor: [3, 3, 3], altMode: true, extras: "+ Shortsword",
        strike: { head: [52, 60, 70], body: [36, 38, 52] },
        stab:    { head: [52, 60, 70], body: [36, 38, 52] },
        alt: {
          strike: { head: [45, 49, 65], body: [30, 34, 50] },
          stab:    { head: [45, 66, 75], body: [40, 51, 60] }
        },
        note: "Head+Head kills T3. Head+Body leaves T2 with 2 HP." },
      { name: "Longsword", armor: [2, 3, 3], altMode: true, extras: "+ Cleaver | Fury",
        strike: { head: [52, 55, 70], body: [36, 40, 52] },
        stab:    { head: [52, 55, 70], body: [36, 40, 52] },
        alt: {
          strike: { head: [60, 61, 63], body: [40, 41, 43] },
          stab:    { head: [40, 41, 43], body: [25, 26, 28] }
        } },
      { name: "Bardiche", armor: [2, 3, 3], altMode: true,
        strike: { head: [60, 70, 100], body: [40, 50, 60] },
        stab:    { head: [30, 35, 40], body: [25, 30, 35] },
        alt: {
          strike: { head: [60, 71, 100], body: [45, 51, 75] },
          stab:    { head: [35, 40, 50], body: [20, 25, 33] }
        },
        note: "Head 1-shots T1. Head+Body kills T3. Body+Body kills T2." },
      { name: "Bastard Sword", armor: [2, 3, 3], altMode: true, extras: "+ Mace, Firepot | Second Wind",
        strike: { head: [38, 42, 60], body: [34, 37, 50] },
        stab:    { head: [38, 42, 60], body: [34, 37, 50] },
        alt: {
          strike: { head: [38, 42, 80], body: [34, 37, 65] },
          stab:    { head: [45, 60, 90], body: [38, 45, 75] }
        } },
      { name: "Spear", armor: [2, 3, 3], altMode: true, extras: "+ Shortsword, Firepot | Second Wind",
        strike: { head: [32, 38, 45], body: [17, 23, 30] },
        stab:    { head: [52, 60, 85], body: [36, 38, 52] },
        alt: {
          strike: { head: [35, 48, 64], body: [20, 33, 49] },
          stab:    { head: [45, 67, 77], body: [38, 52, 62] }
        },
        note: "Head+Head kills T3. Body+Body stabs leave T2 with 24 HP." },
      { name: "Eveningstar", armor: [2, 2, 2], altMode: true,
        strike: { head: [60, 70, 90], body: [50, 60, 70] },
        stab:    { head: [30, 35, 40], body: [25, 30, 35] },
        alt: {
          strike: { head: [65, 77, 100], body: [55, 57, 59] },
          stab:    { head: [50, 65, 70], body: [40, 55, 60] }
        },
        note: "2-shots everything with strikes (Body+Body kills T3). Does NOT 1-shot T1 head." },
      { name: "Halberd", armor: [2, 2, 2], altMode: true,
        strike: { head: [60, 70, 100], body: [40, 60, 80] },
        stab:    { head: [50, 52, 75], body: [35, 45, 60] },
        alt: {
          strike: { head: [58, 70, 100], body: [40, 60, 80] },
          stab:    { head: [50, 52, 75], body: [35, 45, 60] }
        },
        note: "Head 1-shots T1. Body+Head kills T3. Body+Body kills T2." },
      { name: "Executioner's", armor: [1, 2, 2],
        strike: { head: [60, 70, 100], body: [50, 60, 70] },
        stab:    { head: [25, 30, 40], body: [20, 25, 35] },
        note: "Head 1-shots T1. Body+Body kills T3." },
      { name: "Maul", armor: [1, 2, 2], extras: "+ Shortsword | Rush",
        strike: { head: [100, 100, 100], body: [70, 80, 90] },
        stab:    { head: [30, 35, 40], body: [25, 30, 35] },
        note: "1-shots Head across ALL armor tiers." },
      { name: "Zweihander", armor: [2, 1, 1], altMode: true, extras: "+ Dagger | Flesh Wound",
        strike: { head: [50, 70, 80], body: [38, 50, 60] },
        stab:    { head: [45, 52, 65], body: [35, 38, 50] },
        alt: {
          strike: { head: [44, 52, 70], body: [34, 37, 55] },
          stab:    { head: [48, 70, 78], body: [40, 55, 63] }
        },
        note: "2-shots T2 body. Similar HTK to Halberd, but does not 1-shot T1 head." },
      { name: "Estoc", armor: [1, 1, 1], altMode: true,
        strike: { head: [32, 35, 45], body: [17, 23, 30] },
        stab:    { head: [52, 60, 85], body: [36, 40, 52] },
        alt: {
          strike: { head: [60, 61, 63], body: [40, 41, 43] },
          stab:    { head: [40, 41, 43], body: [25, 26, 28] }
        },
        note: "Head+Head kills T3. Head+Body kills T2." }
    ];

// Safety net: every altMode weapon must have alt tables (fill with dashes if
// a hand-edit ever removes one).
WEAPONS.forEach(function (w) {
  if (w.altMode && !w.alt) w.alt = {
    strike: { head: [null, null, null], body: [null, null, null] },
    stab:    { head: [null, null, null], body: [null, null, null] }
  };
});

var WEAPON_TIMINGS = {
  "Greatsword": {"strike":{"w":575,"r":525,"rec":1000,"t":[257,180],"cw":175},"stab":{"w":675,"r":325,"rec":1000,"t":[284,198],"cw":250},"altStrike":{"w":575,"r":500,"rec":850,"t":[262.5,183.75],"cw":200},"altStab":{"w":600,"r":350,"rec":700,"t":[300,210],"cw":125}},
  "Longsword": {"strike":{"w":560,"r":525,"rec":850,"t":[266,187],"cw":150},"stab":{"w":615,"r":350,"rec":850,"t":[299,209],"cw":200},"altStrike":{"w":540,"r":500,"rec":700,"t":[275,192.5],"cw":200},"altStab":{"w":550,"r":350,"rec":700,"t":[312.5,218.75],"cw":225}},
  "Bardiche": {"strike":{"w":625,"r":500,"rec":900,"t":[257,180],"cw":175},"stab":{"w":625,"r":350,"rec":900,"t":[289,202],"cw":250},"altStrike":{"w":675,"r":475,"rec":1000,"t":[257,180],"nc":true},"altStab":{"w":650,"r":325,"rec":1000,"t":[263,184],"nc":true}},
  "Bastard Sword": {"strike":{"w":525,"r":475,"rec":1000,"t":[287.5,201.25],"cw":150},"stab":{"w":575,"r":325,"rec":1000,"t":[325,227.5],"cw":225},"altStrike":{"w":525,"r":525,"rec":700,"t":[287.5,201.25],"cw":150},"altStab":{"w":575,"r":350,"rec":700,"t":[325,227.5],"cw":225}},
  "Spear": {"strike":{"w":625,"r":475,"rec":1100,"t":[249,175],"nc":true},"stab":{"w":650,"r":350,"rec":1000,"t":[252,176],"nc":true},"altStrike":{"w":575,"r":450,"rec":1000,"t":[284,198],"cw":100},"altStab":{"w":575,"r":350,"rec":1000,"t":[284,198],"cw":200}},
  "Eveningstar": {"strike":{"w":675,"r":500,"rec":1000,"t":[245,171],"cw":175},"stab":{"w":625,"r":325,"rec":1000,"t":[278,195],"cw":275},"altStrike":{"w":650,"r":450,"rec":900,"t":[262.5,183.75],"cw":175},"altStab":{"w":675,"r":300,"rec":900,"t":[275,192.5],"cw":275}},
  "Halberd": {"strike":{"w":625,"r":500,"rec":1000,"t":[257,180],"cw":125},"stab":{"w":675,"r":325,"rec":1000,"t":[276,193],"cw":175},"altStrike":{"w":675,"r":500,"rec":1100,"t":[245,171.5],"nc":true},"altStab":{"w":700,"r":325,"rec":1100,"t":[249,175],"nc":true}},
  "Executioner's": {"strike":{"w":650,"r":500,"rec":1100,"t":[247,173],"nc":true},"stab":{"w":625,"r":350,"rec":1100,"t":[270,189],"nc":true}},
  "Maul": {"strike":{"w":725,"r":475,"rec":1000,"t":[268,187],"nc":true},"stab":{"w":650,"r":325,"rec":1000,"t":[263,184],"nc":true}},
  "Zweihander": {"strike":{"w":650,"r":525,"rec":1000,"t":[252,176],"cw":100},"stab":{"w":725,"r":325,"rec":1000,"t":[276,193],"cw":225},"altStrike":{"w":600,"r":500,"rec":850,"t":[262.5,183.75],"cw":175},"altStab":{"w":625,"r":350,"rec":700,"t":[300,210],"cw":125}},
  "Estoc": {"strike":{"w":525,"r":500,"rec":900,"t":[289,202],"cw":175},"stab":{"w":625,"r":350,"rec":900,"t":[284,198],"cw":175},"altStrike":{"w":600,"r":500,"rec":700,"t":[262.5,183.75],"cw":225},"altStab":{"w":575,"r":325,"rec":700,"t":[300,210],"cw":225}}
};

// ── Vanilla (unmodded Mordhau baseline) ──
// Generated from https://mordstats.com/res/mordstats.json (Latest) by
// _work/gen-weapon-data.mjs — re-run that script to refresh.
// Same shapes/encodings as the classmod data. The Body row is torso damage;
// vanilla leg damage differs (the mod makes legs equal torso).

var VANILLA = {
  "Greatsword": {"strike":{"head":[48,60,80],"body":[38,43,65],"legs":[34,34,55]},"stab":{"head":[45,65,75],"body":[35,50,60],"legs":[25,35,50]},"alt":{"strike":{"head":[45,49,65],"body":[30,34,50],"legs":[27,31,40]},"stab":{"head":[45,66,75],"body":[40,51,60],"legs":[35,46,50]}}},
  "Longsword": {"strike":{"head":[44,53,83],"body":[36,38,68],"legs":[34,36,58]},"stab":{"head":[43,60,70],"body":[34,45,55],"legs":[30,35,50]},"alt":{"strike":{"head":[60,61,63],"body":[40,41,43],"legs":[35,36,38]},"stab":{"head":[40,41,43],"body":[25,26,28],"legs":[15,16,18]}}},
  "Bardiche": {"strike":{"head":[60,71,100],"body":[45,51,75],"legs":[40,45,65]},"stab":{"head":[35,40,50],"body":[20,25,33],"legs":[15,20,28]},"alt":{"strike":{"head":[60,71,100],"body":[45,51,75],"legs":[40,45,65]},"stab":{"head":[35,40,50],"body":[20,25,33],"legs":[15,20,28]}}},
  "Bastard Sword": {"strike":{"head":[38,42,80],"body":[34,37,65],"legs":[30,34,60]},"stab":{"head":[45,60,90],"body":[38,45,75],"legs":[28,35,65]},"alt":{"strike":{"head":[38,42,80],"body":[34,37,65],"legs":[30,34,60]},"stab":{"head":[45,60,90],"body":[38,45,75],"legs":[28,35,65]}}},
  "Spear": {"strike":{"head":[27.5,32,40],"body":[12.5,17,25],"legs":[7.5,12,20]},"stab":{"head":[45,67,77],"body":[38,52,62],"legs":[34,42,57]},"alt":{"strike":{"head":[35,48,64],"body":[20,33,49],"legs":[10,23,39]},"stab":{"head":[45,67,77],"body":[38,52,62],"legs":[34,42,57]}}},
  "Eveningstar": {"strike":{"head":[65,77,100],"body":[55,57,59],"legs":[45,47,50]},"stab":{"head":[35,45,55],"body":[30,32,40],"legs":[25,27,35]},"alt":{"strike":{"head":[65,77,100],"body":[55,57,59],"legs":[45,47,50]},"stab":{"head":[60,65,70],"body":[50,55,60],"legs":[30,35,40]}}},
  "Halberd": {"strike":{"head":[48,70,100],"body":[40,55,75],"legs":[37,45,65]},"stab":{"head":[45,70,85],"body":[40,55,75],"legs":[34,40,65]},"alt":{"strike":{"head":[50,72,100],"body":[42,57,77],"legs":[39,47,67]},"stab":{"head":[45,70,85],"body":[40,55,75],"legs":[34,40,65]}}},
  "Executioner's": {"strike":{"head":[60,65,100],"body":[50,55,90],"legs":[40,45,85]},"stab":{"head":[15,20,25],"body":[15,20,25],"legs":[5,10,15]}},
  "Maul": {"strike":{"head":[100,100,100],"body":[66,67,83],"legs":[65,66,73]},"stab":{"head":[45,46,48],"body":[35,36,38],"legs":[25,26,28]}},
  "Zweihander": {"strike":{"head":[50,70,100],"body":[40,55,85],"legs":[34,40,65]},"stab":{"head":[45,70,75],"body":[40,55,60],"legs":[35,45,50]},"alt":{"strike":{"head":[44,52,70],"body":[34,37,55],"legs":[31,34,40]},"stab":{"head":[48,70,78],"body":[40,55,63],"legs":[35,45,53]}}},
  "Estoc": {"strike":{"head":[35,38,60],"body":[25,28,50],"legs":[20,25,40]},"stab":{"head":[50,66,100],"body":[40,51,65],"legs":[36,41,55]},"alt":{"strike":{"head":[60,61,63],"body":[40,41,43],"legs":[35,36,38]},"stab":{"head":[40,41,43],"body":[25,26,28],"legs":[15,16,18]}}}
};

var VANILLA_TIMINGS = {
  "Greatsword": {"strike":{"w":575,"r":500,"rec":700,"t":[245,171.5],"cw":200},"stab":{"w":675,"r":325,"rec":700,"t":[270,189],"cw":250},"altStrike":{"w":575,"r":500,"rec":550,"t":[262.5,183.75],"cw":200},"altStab":{"w":600,"r":350,"rec":400,"t":[300,210],"cw":125}},
  "Longsword": {"strike":{"w":560,"r":500,"rec":550,"t":[253.75,177.625],"cw":150},"stab":{"w":615,"r":350,"rec":550,"t":[285,199.5],"cw":200},"altStrike":{"w":540,"r":500,"rec":400,"t":[275,192.5],"cw":200},"altStab":{"w":550,"r":350,"rec":400,"t":[312.5,218.75],"cw":225}},
  "Bardiche": {"strike":{"w":625,"r":500,"rec":600,"t":[245,171.5],"cw":175},"stab":{"w":625,"r":350,"rec":600,"t":[275,192.5],"cw":250},"altStrike":{"w":675,"r":475,"rec":700,"t":[245,171.5],"nc":true},"altStab":{"w":650,"r":325,"rec":700,"t":[250,175],"nc":true}},
  "Bastard Sword": {"strike":{"w":525,"r":475,"rec":700,"t":[287.5,201.25],"cw":150},"stab":{"w":575,"r":325,"rec":700,"t":[325,227.5],"cw":225},"altStrike":{"w":525,"r":500,"rec":400,"t":[287.5,201.25],"cw":150},"altStab":{"w":575,"r":350,"rec":400,"t":[325,227.5],"cw":225}},
  "Spear": {"strike":{"w":625,"r":475,"rec":800,"t":[237.5,166.25],"nc":true},"stab":{"w":650,"r":325,"rec":700,"t":[240,168],"nc":true},"altStrike":{"w":575,"r":450,"rec":700,"t":[270,189],"cw":100},"altStab":{"w":575,"r":325,"rec":700,"t":[270,189],"cw":200}},
  "Eveningstar": {"strike":{"w":675,"r":500,"rec":700,"t":[237.5,166.25],"cw":175},"stab":{"w":625,"r":325,"rec":700,"t":[270,189],"cw":275},"altStrike":{"w":650,"r":450,"rec":600,"t":[262.5,183.75],"cw":175},"altStab":{"w":675,"r":300,"rec":600,"t":[275,192.5],"cw":275}},
  "Halberd": {"strike":{"w":625,"r":500,"rec":700,"t":[245,171.5],"cw":125},"stab":{"w":675,"r":325,"rec":700,"t":[262.5,183.75],"cw":175},"altStrike":{"w":675,"r":500,"rec":800,"t":[237.5,166.25],"nc":true},"altStab":{"w":700,"r":325,"rec":800,"t":[237.5,166.25],"nc":true}},
  "Executioner's": {"strike":{"w":650,"r":500,"rec":800,"t":[240,168],"nc":true},"stab":{"w":625,"r":350,"rec":800,"t":[262.5,183.75],"nc":true}},
  "Maul": {"strike":{"w":725,"r":475,"rec":700,"t":[255,178.5],"nc":true},"stab":{"w":650,"r":325,"rec":700,"t":[262.5,183.75],"nc":true}},
  "Zweihander": {"strike":{"w":650,"r":525,"rec":700,"t":[240,168],"cw":150},"stab":{"w":725,"r":325,"rec":700,"t":[262.5,183.75],"cw":225},"altStrike":{"w":600,"r":500,"rec":550,"t":[262.5,183.75],"cw":175},"altStab":{"w":625,"r":350,"rec":400,"t":[300,210],"cw":125}},
  "Estoc": {"strike":{"w":525,"r":500,"rec":600,"t":[275,192.5],"cw":175},"stab":{"w":565,"r":360,"rec":600,"t":[270,189],"cw":175},"altStrike":{"w":600,"r":500,"rec":400,"t":[262.5,183.75],"cw":225},"altStab":{"w":575,"r":325,"rec":400,"t":[300,210],"cw":225}}
};

// ── Promod (ProClasses) ──
// Pulled from https://kingkuess.github.io/ProClasses/weapons (page v1.0.3,
// "promod base + Season 6 tuning", generated 2026-09-01) on 2026-09-04 by
// _work/gen-promod.mjs — re-run that script on a fresh page save to refresh.
// Same shapes/encodings as the classmod data; timings additionally carry
// rec (miss recovery, ms), feint, stam and missStam, which the site does
// not render yet. Damage capped at 100 for display.

var PROMOD = {
  "Greatsword": {"strike":{"head":[50,60,80],"body":[38,43,65],"legs":[34,34,55]},"stab":{"head":[45,65,75],"body":[35,50,60],"legs":[35,35,50]},"alt":{"strike":{"head":[45,49,65],"body":[30,34,50],"legs":[27,31,40]},"stab":{"head":[45,66,75],"body":[40,51,60],"legs":[35,46,50]}}},
  "Longsword": {"strike":{"head":[44,53,83],"body":[36,38,68],"legs":[34,36,58]},"stab":{"head":[43,60,70],"body":[34,45,55],"legs":[34,35,50]},"alt":{"strike":{"head":[60,61,63],"body":[40,41,43],"legs":[35,36,38]},"stab":{"head":[40,41,43],"body":[25,26,28],"legs":[15,16,18]}}},
  "Bardiche": {"strike":{"head":[60,71,100],"body":[45,51,75],"legs":[40,45,65]},"stab":{"head":[40,48,57],"body":[25,33,40],"legs":[20,28,35]},"alt":{"strike":{"head":[60,71,100],"body":[45,51,75],"legs":[40,45,65]},"stab":{"head":[35,40,50],"body":[20,25,33],"legs":[15,20,28]}}},
  "Bastard Sword": {"strike":{"head":[38,42,80],"body":[34,37,65],"legs":[34,34,60]},"stab":{"head":[45,60,90],"body":[38,45,75],"legs":[38,35,65]},"alt":{"strike":{"head":[38,42,80],"body":[34,37,65],"legs":[30,34,60]},"stab":{"head":[45,60,90],"body":[38,45,75],"legs":[28,35,65]}}},
  "Spear": {"strike":{"head":[35,41,45],"body":[20,26,30],"legs":[15,21,25]},"stab":{"head":[60,71,83],"body":[42,56,68],"legs":[38,46,63]},"alt":{"strike":{"head":[35,48,64],"body":[20,33,49],"legs":[10,23,39]},"stab":{"head":[45,67,77],"body":[38,52,62],"legs":[34,42,57]}}},
  "Eveningstar": {"strike":{"head":[65,77,100],"body":[55,57,59],"legs":[45,47,50]},"stab":{"head":[40,48,55],"body":[35,35,40],"legs":[35,35,35]},"alt":{"strike":{"head":[65,77,100],"body":[55,57,59],"legs":[45,47,50]},"stab":{"head":[60,65,70],"body":[50,55,60],"legs":[30,35,40]}}},
  "Halberd": {"strike":{"head":[48,70,100],"body":[40,55,75],"legs":[37,45,65]},"stab":{"head":[45,70,85],"body":[40,55,75],"legs":[34,40,65]},"alt":{"strike":{"head":[70,72,100],"body":[42,57,77],"legs":[39,47,67]},"stab":{"head":[50,70,85],"body":[40,55,75],"legs":[34,40,65]}}},
  "Executioner's": {"strike":{"head":[57,65,100],"body":[50,55,90],"legs":[44,47,85]},"stab":{"head":[15,20,25],"body":[15,20,25],"legs":[5,10,15]}},
  "Maul": {"strike":{"head":[100,100,100],"body":[66,67,83],"legs":[65,66,73]},"stab":{"head":[45,46,48],"body":[35,36,38],"legs":[35,36,28]}},
  "Zweihander": {"strike":{"head":[60,70,100],"body":[40,55,85],"legs":[34,40,65]},"stab":{"head":[60,70,75],"body":[40,55,60],"legs":[35,45,50]},"alt":{"strike":{"head":[44,52,70],"body":[34,37,55],"legs":[31,34,40]},"stab":{"head":[48,70,78],"body":[40,55,63],"legs":[35,45,53]}}},
  "Estoc": {"strike":{"head":[35,38,60],"body":[25,28,50],"legs":[25,25,40]},"stab":{"head":[50,66,100],"body":[40,51,65],"legs":[40,41,55]},"alt":{"strike":{"head":[60,61,63],"body":[40,41,43],"legs":[35,36,38]},"stab":{"head":[40,41,43],"body":[25,26,28],"legs":[15,16,18]}}}
};

var PROMOD_TIMINGS = {
  "Greatsword": {"strike":{"w":575,"r":525,"rec":1000,"feint":350,"stam":19,"missStam":13,"t":[257,180],"cw":200},"stab":{"w":675,"r":325,"rec":1000,"feint":300,"stam":19,"missStam":13,"t":[284,198],"cw":250},"altStrike":{"w":575,"r":500,"rec":850,"feint":375,"stam":18,"missStam":12,"t":[262.5,183.75],"cw":200},"altStab":{"w":600,"r":350,"rec":700,"feint":350,"stam":18,"missStam":12,"t":[300,210],"cw":150}},
  "Longsword": {"strike":{"w":560,"r":525,"rec":850,"feint":400,"stam":19,"missStam":11,"t":[266,187],"cw":150},"stab":{"w":615,"r":350,"rec":850,"feint":350,"stam":18,"missStam":11,"t":[299,209],"cw":200},"altStrike":{"w":540,"r":500,"rec":700,"feint":375,"stam":19,"missStam":11,"t":[275,192.5],"cw":200},"altStab":{"w":550,"r":350,"rec":700,"feint":400,"stam":17,"missStam":10,"t":[312.5,218.75],"cw":225}},
  "Bardiche": {"strike":{"w":625,"r":500,"rec":900,"feint":325,"stam":19,"missStam":13,"t":[257,180],"cw":175},"stab":{"w":625,"r":350,"rec":900,"feint":375,"stam":18,"missStam":12,"t":[289,202],"cw":250},"altStrike":{"w":675,"r":475,"rec":1000,"feint":275,"stam":20,"missStam":18,"t":[257,180],"nc":true},"altStab":{"w":650,"r":325,"rec":1000,"feint":325,"stam":19,"missStam":16,"t":[263,184],"nc":true}},
  "Bastard Sword": {"strike":{"w":525,"r":500,"rec":1000,"feint":400,"stam":17,"missStam":10,"t":[287.5,201.25],"cw":150},"stab":{"w":575,"r":325,"rec":1000,"feint":400,"stam":17,"missStam":10,"t":[325,227.5],"cw":225},"altStrike":{"w":525,"r":500,"rec":700,"feint":400,"stam":18,"missStam":10,"t":[287.5,201.25],"cw":150},"altStab":{"w":575,"r":350,"rec":700,"feint":400,"stam":18,"missStam":10,"t":[325,227.5],"cw":225}},
  "Spear": {"strike":{"w":625,"r":475,"rec":1100,"feint":325,"stam":18,"missStam":16,"t":[249,175],"nc":true},"stab":{"w":675,"r":350,"rec":1000,"feint":300,"stam":20,"missStam":16,"t":[252,176],"nc":true},"altStrike":{"w":575,"r":450,"rec":1000,"feint":375,"stam":17,"missStam":11,"t":[284,198],"cw":100},"altStab":{"w":575,"r":350,"rec":1000,"feint":375,"stam":19,"missStam":14,"t":[284,198],"cw":200}},
  "Eveningstar": {"strike":{"w":675,"r":500,"rec":1000,"feint":400,"stam":21,"missStam":17,"t":[245,171],"nc":true},"stab":{"w":625,"r":325,"rec":1000,"feint":325,"stam":17,"missStam":16,"t":[278,195],"nc":true},"altStrike":{"w":650,"r":450,"rec":900,"feint":300,"stam":20,"missStam":12,"t":[262.5,183.75],"cw":175},"altStab":{"w":675,"r":300,"rec":900,"feint":275,"stam":21,"missStam":18,"t":[275,192.5],"cw":275}},
  "Halberd": {"strike":{"w":625,"r":500,"rec":1000,"feint":325,"stam":20,"missStam":16,"t":[257,180],"cw":125},"stab":{"w":675,"r":325,"rec":1000,"feint":300,"stam":19,"missStam":16,"t":[276,193],"cw":175},"altStrike":{"w":675,"r":500,"rec":1100,"feint":275,"stam":21,"missStam":19,"t":[245,171.5],"nc":true},"altStab":{"w":700,"r":325,"rec":1100,"feint":300,"stam":20,"missStam":16,"t":[249,175],"nc":true}},
  "Executioner's": {"strike":{"w":650,"r":500,"rec":1100,"feint":300,"stam":20,"missStam":15,"t":[247,173],"nc":true},"stab":{"w":625,"r":350,"rec":1100,"feint":325,"stam":17,"missStam":9,"t":[270,189],"nc":true}},
  "Maul": {"strike":{"w":725,"r":475,"rec":1000,"feint":225,"stam":24,"missStam":16,"t":[268,187],"nc":true},"stab":{"w":650,"r":325,"rec":1000,"feint":300,"stam":19,"missStam":11,"t":[263,184],"nc":true}},
  "Zweihander": {"strike":{"w":650,"r":535,"rec":1000,"feint":300,"stam":20,"missStam":16,"t":[252,176],"cw":150},"stab":{"w":725,"r":325,"rec":1000,"feint":300,"stam":19,"missStam":15,"t":[276,193],"cw":225},"altStrike":{"w":600,"r":500,"rec":850,"feint":350,"stam":18,"missStam":14,"t":[262.5,183.75],"cw":175},"altStab":{"w":625,"r":350,"rec":700,"feint":325,"stam":19,"missStam":13,"t":[300,210],"cw":125}},
  "Estoc": {"strike":{"w":525,"r":500,"rec":900,"feint":400,"stam":16,"missStam":8,"t":[289,202],"cw":200},"stab":{"w":625,"r":350,"rec":900,"feint":325,"stam":18,"missStam":11,"t":[284,198],"cw":200},"altStrike":{"w":600,"r":500,"rec":700,"feint":350,"stam":18,"missStam":11,"t":[262.5,183.75],"cw":250},"altStab":{"w":575,"r":325,"rec":700,"feint":375,"stam":17,"missStam":10,"t":[300,210],"cw":250}}
};
