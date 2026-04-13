import { defineField, defineType } from "sanity";

export const referenceType = defineType({
  name: "caseStudy",
  title: "Reference",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL — česky)",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slugEn",
      title: "Slug (URL — EN)",
      type: "slug",
      options: { source: "titleEn" },
    }),
    defineField({
      name: "slugDe",
      title: "Slug (URL — DE)",
      type: "slug",
      options: { source: "titleDe" },
    }),
    defineField({
      name: "title",
      title: "Název akce",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Typ akce",
      type: "string",
      options: {
        list: [
          "Korporátní akce",
          "Soukromá akce",
          "Kulturní akce",
          "Hotel / resort",
          "Festival",
          "Family day",
          "Městská akce",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Perex (krátký popis pro výpis)",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Hlavní foto (karta ve výpisu)",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Štítky programu",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Pořadí (nižší = dříve)",
      type: "number",
    }),

    // --- Překlady EN ---
    defineField({ name: "titleEn", title: "Název akce (EN)", type: "string" }),
    defineField({ name: "descriptionEn", title: "Perex (EN)", type: "text", rows: 3 }),

    // --- Překlady DE ---
    defineField({ name: "titleDe", title: "Název akce (DE)", type: "string" }),
    defineField({ name: "descriptionDe", title: "Perex (DE)", type: "text", rows: 3 }),

    // --- Detail sekce ---
    defineField({
      name: "detail",
      title: "Detail reference (volitelné)",
      type: "object",
      fields: [
        defineField({ name: "subtitle", title: "Podnadpis (pod hero)", type: "string" }),
        defineField({ name: "subtitleEn", title: "Podnadpis (EN)", type: "string" }),
        defineField({ name: "subtitleDe", title: "Podnadpis (DE)", type: "string" }),

        defineField({ name: "date", title: "Datum", type: "string" }),
        defineField({ name: "dateEn", title: "Datum (EN)", type: "string" }),
        defineField({ name: "dateDe", title: "Datum (DE)", type: "string" }),

        defineField({ name: "guests", title: "Počet hostů", type: "string" }),
        defineField({ name: "guestsEn", title: "Počet hostů (EN)", type: "string" }),
        defineField({ name: "guestsDe", title: "Počet hostů (DE)", type: "string" }),

        defineField({ name: "venue", title: "Místo konání", type: "string" }),
        defineField({ name: "venueEn", title: "Místo konání (EN)", type: "string" }),
        defineField({ name: "venueDe", title: "Místo konání (DE)", type: "string" }),

        defineField({ name: "brief", title: "Zadání", type: "text", rows: 4 }),
        defineField({ name: "briefEn", title: "Zadání (EN)", type: "text", rows: 4 }),
        defineField({ name: "briefDe", title: "Zadání (DE)", type: "text", rows: 4 }),

        defineField({ name: "solution", title: "Naše řešení", type: "text", rows: 6 }),
        defineField({ name: "solutionEn", title: "Naše řešení (EN)", type: "text", rows: 6 }),
        defineField({ name: "solutionDe", title: "Naše řešení (DE)", type: "text", rows: 6 }),

        defineField({ name: "quote", title: "Citát / pull quote (volitelné)", type: "string" }),
        defineField({ name: "quoteEn", title: "Citát (EN)", type: "string" }),
        defineField({ name: "quoteDe", title: "Citát (DE)", type: "string" }),

        defineField({
          name: "showDesigner",
          title: "Show designer na akci (volitelné)",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Jméno", type: "string" }),
            defineField({ name: "photo", title: "Fotografie", type: "image", options: { hotspot: true } }),
            defineField({ name: "bio", title: "Bio (role na akci)", type: "text", rows: 3 }),
            defineField({ name: "bioEn", title: "Bio (EN)", type: "text", rows: 3 }),
            defineField({ name: "bioDe", title: "Bio (DE)", type: "text", rows: 3 }),
          ],
        }),
        defineField({
          name: "gallery",
          title: "Fotogalerie",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "image",
    },
  },
});
