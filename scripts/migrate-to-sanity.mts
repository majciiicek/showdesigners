/**
 * Migrační skript — přenese data z references.ts do Sanity
 * Spuštění: npx tsx scripts/migrate-to-sanity.mts
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import { join } from "path";
// Inline data — kopie z references.ts kvůli ESM kompatibilitě v tsx
const { references } = await import("../src/lib/references.ts");

const token = process.env.SANITY_MIGRATION_TOKEN;
if (!token) {
  console.error("❌ Chybí SANITY_MIGRATION_TOKEN v prostředí");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6i1t4r1j",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const PUBLIC_DIR = join(process.cwd(), "public");

// Cache uploadnutých assets — stejný soubor nenahráváme dvakrát
const uploadedAssets = new Map<string, string>();

async function uploadImage(imagePath: string): Promise<string | null> {
  if (!imagePath) return null;

  if (uploadedAssets.has(imagePath)) {
    return uploadedAssets.get(imagePath)!;
  }

  const fullPath = join(PUBLIC_DIR, imagePath);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ Soubor nenalezen: ${imagePath}`);
    return null;
  }

  try {
    const asset = await client.assets.upload("image", createReadStream(fullPath), {
      filename: imagePath.split("/").pop(),
    });
    uploadedAssets.set(imagePath, asset._id);
    console.log(`  ✓ Nahráno: ${imagePath.split("/").pop()}`);
    return asset._id;
  } catch (err) {
    console.error(`  ✗ Chyba při nahrávání ${imagePath}:`, err);
    return null;
  }
}

async function migrate() {
  console.log(`\nZahajuji migraci ${references.length} referencí...\n`);

  for (const [i, ref] of references.entries()) {
    console.log(`[${i + 1}/${references.length}] ${ref.title}`);

    // Hlavní obrázek
    const mainImageId = await uploadImage(ref.image);

    // Základní dokument
    const doc: Record<string, unknown> = {
      _type: "caseStudy",
      _id: `reference-${ref.slug}`,
      slug: { _type: "slug", current: ref.slug },
      title: ref.title,
      type: ref.type,
      description: ref.description,
      tags: ref.tags,
      order: i,
      ...(mainImageId && {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: mainImageId },
        },
      }),
    };

    // Detail sekce
    if (ref.detail) {
      const d = ref.detail;

      // Galerie
      const galleryAssets: unknown[] = [];
      for (const src of d.gallery) {
        const assetId = await uploadImage(src);
        if (assetId) {
          galleryAssets.push({
            _type: "image",
            _key: assetId.replace("image-", "").substring(0, 12),
            asset: { _type: "reference", _ref: assetId },
          });
        }
      }

      // Show designer foto
      let showDesignerPhotoId: string | null = null;
      if (d.showDesigner?.photo) {
        showDesignerPhotoId = await uploadImage(d.showDesigner.photo);
      }

      doc.detail = {
        subtitle: d.subtitle,
        date: d.date,
        guests: d.guests,
        venue: d.venue,
        brief: d.brief,
        solution: d.solution,
        ...(d.quote && { quote: d.quote }),
        gallery: galleryAssets,
        ...(d.showDesigner && {
          showDesigner: {
            name: d.showDesigner.name,
            bio: d.showDesigner.bio,
            ...(showDesignerPhotoId && {
              photo: {
                _type: "image",
                asset: { _type: "reference", _ref: showDesignerPhotoId },
              },
            }),
          },
        }),
      };
    }

    await client.createOrReplace(doc);
    console.log(`  ✓ Dokument vytvořen\n`);
  }

  console.log("✅ Migrace dokončena!");
}

migrate().catch((err) => {
  console.error("❌ Migrace selhala:", err);
  process.exit(1);
});
