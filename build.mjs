#!/usr/bin/env node
/**
 * Static i18n build script for Salam Transfers.
 *
 * Reads the canonical English HTML files in the repo root, extracts the
 * TRANSLATIONS object from main.js, and emits pre-rendered HTML for each
 * non-English language under /es/, /fr/, /ar/.
 *
 * Each language directory ends up with its own copy of every page, with:
 *   - data-i18n text content replaced
 *   - data-i18n-placeholder values replaced
 *   - <html lang="..."> and dir="rtl" on Arabic
 *   - per-page <title>, meta description, OG/Twitter title/description, og:locale
 *   - self-referencing <link rel="canonical">
 *   - hreflang block pointing to every language version
 *   - relative asset paths rewritten to ../ so /es/index.html still loads /styles.css
 *   - "EN" label in the language switcher changed to ES/FR/AR
 *
 * The sitemap.xml at the root is regenerated to list every language variant.
 *
 * Usage:  node build.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://salamtransfers.com';
const LANGS = ['es', 'fr', 'ar'];
const RTL_LANGS = new Set(['ar']);

const PAGES = [
  'index.html',
  'services.html',
  'routes-prices.html',
  'muslim-friendly.html',
  'how-it-works.html',
  'faq.html',
  'contact.html',
  'terms.html',
  'privacy.html',
  'cancellation.html',
  '404.html',
];

const OG_LOCALES = { en: 'en_US', es: 'es_MX', fr: 'fr_FR', ar: 'ar_SA' };

// Per-page localized <title> and <meta description>.
// Kept inline here (rather than in a separate JSON) so the build is a single
// dependency-free file.
const PAGE_META = {
  'index.html': {
    en: {
      title: 'Salam Transfers | Premium Private Transportation in Cancun & Riviera Maya',
      description: 'Private airport transfers, daily chauffeur, and Muslim-friendly transportation in Cancun, Playa del Carmen, and Tulum. 24/7 bilingual support, fixed transparent rates, alcohol-free vehicles, and prayer-stop coordination.',
    },
    es: {
      title: 'Salam Transfers | Transportación Privada Premium en Cancún y Riviera Maya',
      description: 'Traslados privados de aeropuerto, chofer por día y transporte Muslim-Friendly en Cancún, Playa del Carmen y Tulum. Atención bilingüe 24/7, tarifas fijas transparentes, vehículos libres de alcohol y coordinación de paradas de oración.',
    },
    fr: {
      title: 'Salam Transfers | Transport Privé Premium à Cancun et Riviera Maya',
      description: 'Transferts privés aéroport, chauffeur à la journée et transport adapté aux voyageurs musulmans à Cancun, Playa del Carmen et Tulum. Assistance bilingue 24/7, tarifs fixes transparents, véhicules sans alcool et coordination des arrêts de prière.',
    },
    ar: {
      title: 'سلام ترانسفيرز | خدمة نقل خاصة فاخرة في كانكون وريفييرا مايا',
      description: 'نقل خاص من المطار، سائق يومي، ونقل ملائم للمسلمين في كانكون وبلايا ديل كارمن وتولوم. دعم ثنائي اللغة على مدار الساعة، أسعار ثابتة شفافة، مركبات خالية من الكحول، وتنسيق توقفات الصلاة.',
    },
  },
  'services.html': {
    en: {
      title: 'Services | Salam Transfers — Airport Transfers, Chauffeur, Mosque & Events',
      description: 'Detailed private transportation services in Cancun: airport transfers, daily private chauffeur, mosque trips (Masjid Al-Rahim & Al-Rahman), and wedding/event logistics. Modern Toyota Sienna & HiAce fleet with bilingual drivers.',
    },
    es: {
      title: 'Servicios | Salam Transfers — Traslados al Aeropuerto, Chofer, Mezquita y Eventos',
      description: 'Servicios detallados de transportación privada en Cancún: traslados al aeropuerto, chofer privado por día, viajes a mezquita (Masjid Al-Rahim y Al-Rahman) y logística de bodas/eventos. Flota moderna Toyota Sienna y HiAce con choferes bilingües.',
    },
    fr: {
      title: 'Services | Salam Transfers — Transferts Aéroport, Chauffeur, Mosquée et Événements',
      description: 'Services détaillés de transport privé à Cancun : transferts aéroport, chauffeur privé à la journée, trajets vers la mosquée (Masjid Al-Rahim et Al-Rahman) et logistique mariages/événements. Flotte moderne Toyota Sienna et HiAce avec chauffeurs bilingues.',
    },
    ar: {
      title: 'الخدمات | سلام ترانسفيرز — نقل من المطار، سائق خاص، مسجد وفعاليات',
      description: 'خدمات نقل خاصة مفصلة في كانكون: نقل من المطار، سائق خاص يومي، رحلات إلى المساجد (الرحيم والرحمن)، ولوجستيات حفلات الزفاف/الفعاليات. أسطول حديث من تويوتا سيينا وهايس مع سائقين ثنائيي اللغة.',
    },
  },
  'routes-prices.html': {
    en: {
      title: 'Routes & Prices | Salam Transfers — Fixed-Rate Transfers Cancun, Playa del Carmen, Tulum',
      description: 'Transparent fixed-rate price tables in MXN for private transfers in Cancun, Playa del Carmen, and Tulum. Airport transfers, tours, and inter-resort routes with deposit amounts.',
    },
    es: {
      title: 'Rutas y Precios | Salam Transfers — Tarifas Fijas Cancún, Playa del Carmen, Tulum',
      description: 'Tablas de precios fijos y transparentes en MXN para traslados privados en Cancún, Playa del Carmen y Tulum. Traslados al aeropuerto, tours y rutas entre resorts con montos de depósito.',
    },
    fr: {
      title: 'Itinéraires et Tarifs | Salam Transfers — Tarifs Fixes Cancun, Playa del Carmen, Tulum',
      description: 'Grilles de prix fixes et transparents en MXN pour transferts privés à Cancun, Playa del Carmen et Tulum. Transferts aéroport, excursions et itinéraires inter-resorts avec montants des acomptes.',
    },
    ar: {
      title: 'المسارات والأسعار | سلام ترانسفيرز — تعرفات ثابتة كانكون وبلايا ديل كارمن وتولوم',
      description: 'جداول أسعار ثابتة وشفافة بالبيزو المكسيكي لرحلات النقل الخاصة في كانكون وبلايا ديل كارمن وتولوم. نقل من المطار، جولات سياحية، ومسارات بين المنتجعات مع مبالغ العربون.',
    },
  },
  'muslim-friendly.html': {
    en: {
      title: 'Muslim-Friendly Transportation in Cancun & Riviera Maya | Salam Transfers',
      description: 'Pioneer Muslim-friendly private transportation in the Mexican Caribbean. Alcohol-free vehicles, prayer mat onboard, Salat prayer-stop coordination, and direct trips to Masjid Al-Rahim (Cancun) and Masjid Al-Rahman (Playa del Carmen).',
    },
    es: {
      title: 'Transporte Muslim-Friendly en Cancún y Riviera Maya | Salam Transfers',
      description: 'Pionero en transportación privada Muslim-Friendly en el Caribe Mexicano. Vehículos libres de alcohol, alfombra de oración a bordo, coordinación de paradas para Salat y traslados directos a la Mezquita Al-Rahim (Cancún) y Al-Rahman (Playa del Carmen).',
    },
    fr: {
      title: 'Transport Adapté aux Musulmans à Cancun et Riviera Maya | Salam Transfers',
      description: 'Pionnier du transport privé adapté aux voyageurs musulmans dans les Caraïbes mexicaines. Véhicules sans alcool, tapis de prière à bord, coordination des arrêts pour la Salat et trajets directs vers la Masjid Al-Rahim (Cancun) et Al-Rahman (Playa del Carmen).',
    },
    ar: {
      title: 'نقل ملائم للمسلمين في كانكون وريفييرا مايا | سلام ترانسفيرز',
      description: 'الرائد في النقل الخاص الملائم للمسلمين في الكاريبي المكسيكي. مركبات خالية من الكحول، سجادة صلاة على متن السيارة، تنسيق توقفات الصلاة، ورحلات مباشرة إلى مسجد الرحيم (كانكون) ومسجد الرحمن (بلايا ديل كارمن).',
    },
  },
  'how-it-works.html': {
    en: {
      title: 'How It Works | Salam Transfers — Booking, Payment & Cancellation',
      description: 'Step-by-step guide to booking your private transfer with Salam Transfers. Online deposit, instant quote, driver assignment, flight delay courtesy, and free date changes up to 24h before service.',
    },
    es: {
      title: 'Cómo Funciona | Salam Transfers — Reserva, Pago y Cancelación',
      description: 'Guía paso a paso para reservar tu traslado privado con Salam Transfers. Depósito en línea, cotización al instante, asignación de chofer, cortesía por retraso de vuelo y cambios de fecha gratuitos hasta 24 h antes del servicio.',
    },
    fr: {
      title: 'Comment Ça Marche | Salam Transfers — Réservation, Paiement et Annulation',
      description: 'Guide étape par étape pour réserver votre transfert privé avec Salam Transfers. Acompte en ligne, devis instantané, attribution du chauffeur, courtoisie en cas de retard et changements de date gratuits jusqu\'à 24 h avant le service.',
    },
    ar: {
      title: 'كيف نعمل | سلام ترانسفيرز — الحجز والدفع والإلغاء',
      description: 'دليل خطوة بخطوة لحجز رحلتك الخاصة مع سلام ترانسفيرز. عربون عبر الإنترنت، عرض سعر فوري، تخصيص السائق، انتظار مجاني عند تأخر الرحلة، وتعديلات مجانية للتواريخ حتى 24 ساعة قبل الخدمة.',
    },
  },
  'faq.html': {
    en: {
      title: 'FAQ | Salam Transfers — Private Transfers Cancun & Riviera Maya',
      description: 'Frequently asked questions about private transfers in Cancun, Playa del Carmen, and Tulum. Payment methods, flight delays, child seats, mosque trips, and Muslim-friendly accommodations explained.',
    },
    es: {
      title: 'Preguntas Frecuentes | Salam Transfers — Traslados Privados Cancún y Riviera Maya',
      description: 'Preguntas frecuentes sobre traslados privados en Cancún, Playa del Carmen y Tulum. Métodos de pago, retrasos de vuelo, sillas para niños, viajes a mezquitas y atenciones Muslim-Friendly.',
    },
    fr: {
      title: 'FAQ | Salam Transfers — Transferts Privés Cancun et Riviera Maya',
      description: 'Questions fréquentes sur les transferts privés à Cancun, Playa del Carmen et Tulum. Modes de paiement, retards de vols, sièges enfant, trajets vers la mosquée et services adaptés aux voyageurs musulmans.',
    },
    ar: {
      title: 'الأسئلة الشائعة | سلام ترانسفيرز — رحلات نقل خاصة في كانكون وريفييرا مايا',
      description: 'إجابات على الأسئلة الشائعة حول النقل الخاص في كانكون وبلايا ديل كارمن وتولوم. طرق الدفع، تأخر الرحلات، مقاعد الأطفال، رحلات المسجد، والخدمات الملائمة للمسلمين.',
    },
  },
  'contact.html': {
    en: {
      title: 'Contact | Salam Transfers — 24/7 Bilingual Support',
      description: 'Contact Salam Transfers for private transportation in Cancun, Playa del Carmen, and Tulum. WhatsApp +52 984 219 0001. Bilingual 24/7 support in English, Spanish, French, and Arabic.',
    },
    es: {
      title: 'Contacto | Salam Transfers — Atención Bilingüe 24/7',
      description: 'Contacta a Salam Transfers para transportación privada en Cancún, Playa del Carmen y Tulum. WhatsApp +52 984 219 0001. Atención bilingüe 24/7 en inglés, español, francés y árabe.',
    },
    fr: {
      title: 'Contact | Salam Transfers — Assistance Bilingue 24/7',
      description: 'Contactez Salam Transfers pour un transport privé à Cancun, Playa del Carmen et Tulum. WhatsApp +52 984 219 0001. Assistance bilingue 24/7 en anglais, espagnol, français et arabe.',
    },
    ar: {
      title: 'تواصل معنا | سلام ترانسفيرز — دعم ثنائي اللغة على مدار الساعة',
      description: 'تواصل مع سلام ترانسفيرز للنقل الخاص في كانكون وبلايا ديل كارمن وتولوم. واتساب +52 984 219 0001. دعم ثنائي اللغة 24/7 بالإنجليزية والإسبانية والفرنسية والعربية.',
    },
  },
  'terms.html': {
    en: {
      title: 'Terms of Service | Salam Transfers Private Transportation',
      description: 'Terms of Service for Salam Transfers private transportation in Cancun and the Riviera Maya. Booking, deposits, passenger behavior, flight delays, and liability.',
    },
    es: {
      title: 'Términos del Servicio | Salam Transfers Transportación Privada',
      description: 'Términos del Servicio de Salam Transfers para transportación privada en Cancún y la Riviera Maya. Reservas, depósitos, comportamiento del pasajero, retrasos de vuelo y responsabilidad.',
    },
    fr: {
      title: 'Conditions Générales | Salam Transfers Transport Privé',
      description: 'Conditions générales d\'utilisation de Salam Transfers pour le transport privé à Cancun et la Riviera Maya. Réservation, acomptes, comportement des passagers, retards de vols et responsabilité.',
    },
    ar: {
      title: 'شروط الخدمة | سلام ترانسفيرز للنقل الخاص',
      description: 'شروط خدمة سلام ترانسفيرز للنقل الخاص في كانكون وريفييرا مايا. الحجز، العربون، سلوك الركاب، تأخر الرحلات والمسؤولية.',
    },
  },
  'privacy.html': {
    en: {
      title: 'Privacy Policy | Salam Transfers Private Transportation',
      description: 'Privacy Policy for Salam Transfers. How we collect, use, and protect your personal data when booking private transfers in Cancun and the Riviera Maya.',
    },
    es: {
      title: 'Política de Privacidad | Salam Transfers Transportación Privada',
      description: 'Política de Privacidad de Salam Transfers. Cómo recopilamos, usamos y protegemos tus datos personales al reservar traslados privados en Cancún y la Riviera Maya.',
    },
    fr: {
      title: 'Politique de Confidentialité | Salam Transfers Transport Privé',
      description: 'Politique de confidentialité de Salam Transfers. Comment nous collectons, utilisons et protégeons vos données personnelles lors de la réservation de transferts privés à Cancun et la Riviera Maya.',
    },
    ar: {
      title: 'سياسة الخصوصية | سلام ترانسفيرز للنقل الخاص',
      description: 'سياسة الخصوصية لسلام ترانسفيرز. كيف نجمع ونستخدم ونحمي بياناتك الشخصية عند حجز رحلات النقل الخاصة في كانكون وريفييرا مايا.',
    },
  },
  'cancellation.html': {
    en: {
      title: 'Cancellation & Changes Policy | Salam Transfers Private Transportation',
      description: 'Cancellation and changes policy for Salam Transfers. Deposit non-refundable, free date/time changes up to 24h prior, complimentary flight delay waiting, no-show rules.',
    },
    es: {
      title: 'Política de Cancelación y Cambios | Salam Transfers Transportación Privada',
      description: 'Política de cancelación y cambios de Salam Transfers. Depósito no reembolsable, cambios de fecha/hora gratuitos hasta 24 h antes, espera por retraso de vuelo sin costo y reglas de no-show.',
    },
    fr: {
      title: 'Politique d\'Annulation et de Modification | Salam Transfers Transport Privé',
      description: 'Politique d\'annulation et de modification de Salam Transfers. Acompte non remboursable, modifications de date/heure gratuites jusqu\'à 24 h avant, attente gratuite en cas de retard et règles de non-présentation.',
    },
    ar: {
      title: 'سياسة الإلغاء والتعديل | سلام ترانسفيرز للنقل الخاص',
      description: 'سياسة الإلغاء والتعديل لسلام ترانسفيرز. العربون غير قابل للاسترداد، تعديلات مجانية للتاريخ/الوقت حتى 24 ساعة قبل الموعد، انتظار مجاني عند تأخر الرحلات وقواعد عدم الحضور.',
    },
  },
  '404.html': {
    en: { title: 'Page Not Found | Salam Transfers', description: 'The page you are looking for could not be found.' },
    es: { title: 'Página No Encontrada | Salam Transfers', description: 'La página que buscas no se encontró.' },
    fr: { title: 'Page Introuvable | Salam Transfers', description: 'La page que vous cherchez est introuvable.' },
    ar: { title: 'الصفحة غير موجودة | سلام ترانسفيرز', description: 'الصفحة التي تبحث عنها غير موجودة.' },
  },
};

// --- Helpers ---

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function loadTranslations() {
  const src = await fs.readFile('main.js', 'utf8');
  const match = src.match(/const TRANSLATIONS = (\{[\s\S]+?\n\});\s*\n\s*\/\/ ---/);
  if (!match) throw new Error('Could not extract TRANSLATIONS from main.js');
  // The TRANSLATIONS literal is a plain JS object — evaluated in a function
  // scope to keep it isolated. This file is generated by us, so eval is safe.
  return new Function('return ' + match[1])();
}

function replaceI18nText(html, dict) {
  // Match opening tag with data-i18n and grab the content up to matching close.
  // Assumes no same-tag nesting inside an i18n element (true for this codebase).
  return html.replace(
    /<(\w+)([^>]*\bdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (match, tag, attrs, key, _oldContent) => {
      if (!(key in dict)) return match; // unknown key, leave as-is
      return `<${tag}${attrs}>${dict[key]}</${tag}>`;
    }
  );
}

function replaceI18nPlaceholders(html, dict) {
  // Find each tag that has data-i18n-placeholder, then rewrite its placeholder attr.
  return html.replace(/<(\w+)([^>]*?)>/g, (match, tag, attrs) => {
    const km = attrs.match(/\bdata-i18n-placeholder="([^"]+)"/);
    if (!km) return match;
    const key = km[1];
    if (!(key in dict)) return match;
    const newPlaceholder = escapeAttr(dict[key]);
    let newAttrs;
    if (/\bplaceholder="[^"]*"/.test(attrs)) {
      newAttrs = attrs.replace(/\bplaceholder="[^"]*"/, `placeholder="${newPlaceholder}"`);
    } else {
      newAttrs = `${attrs} placeholder="${newPlaceholder}"`;
    }
    return `<${tag}${newAttrs}>`;
  });
}

function updateHtmlLangAttr(html, lang) {
  const dir = RTL_LANGS.has(lang) ? ' dir="rtl"' : '';
  return html.replace(/<html\s+lang="[^"]+"(?:\s+dir="[^"]*")?/, `<html lang="${lang}"${dir}`);
}

function updateLangButtonLabel(html, lang) {
  return html.replace(
    /<span id="current-lang-text">[^<]*<\/span>/,
    `<span id="current-lang-text">${lang.toUpperCase()}</span>`
  );
}

function updateTitleAndDescription(html, page, lang) {
  const meta = PAGE_META[page]?.[lang];
  if (!meta) return html;
  const title = meta.title;
  const desc = meta.description;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(desc)}">`
  );
  // OG title / description
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(title)}">`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(desc)}">`
  );
  // Twitter title/description (present on most pages)
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(desc)}">`
  );
  // og:locale
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:locale" content="${OG_LOCALES[lang]}">`
  );
  return html;
}

function buildLangUrl(lang, page) {
  const pagePart = page === 'index.html' ? '' : page;
  const langPart = lang === 'en' ? '' : `/${lang}`;
  return `${SITE_URL}${langPart}/${pagePart}`;
}

function updateCanonicalAndAlternates(html, page, lang) {
  const canonical = buildLangUrl(lang, page);
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`
  );

  // Rebuild the hreflang block
  const lines = [
    `<link rel="alternate" hreflang="en" href="${escapeAttr(buildLangUrl('en', page))}">`,
    `<link rel="alternate" hreflang="es" href="${escapeAttr(buildLangUrl('es', page))}">`,
    `<link rel="alternate" hreflang="fr" href="${escapeAttr(buildLangUrl('fr', page))}">`,
    `<link rel="alternate" hreflang="ar" href="${escapeAttr(buildLangUrl('ar', page))}">`,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(buildLangUrl('en', page))}">`,
  ].join('\n  ');

  // Match the original block of consecutive <link rel="alternate" hreflang=...> tags
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]*"\s*\/?>(?:\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]*"\s*\/?>)+/,
    lines
  );

  return html;
}

function rewriteRelativeAssetPaths(html) {
  // For pages emitted under /<lang>/, relative paths like styles.css need to
  // resolve from /<lang>/, so we prefix with ../ to point back at the root.
  // Nav links like "services.html" stay as-is so they resolve to /<lang>/services.html.
  const prefixes = [
    'styles\\.css',
    'main\\.js',
    'Logo\\/',
    'assets\\/',
  ];
  for (const p of prefixes) {
    const re = new RegExp(`(href|src|srcset)="(${p}[^"]*)"`, 'g');
    html = html.replace(re, '$1="../$2"');
  }
  // <link rel="canonical">/<meta og:url>/<link rel="manifest"> are absolute URLs;
  // favicon and manifest already use leading / which works from any depth.
  return html;
}

function regenerateSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const indexedPages = PAGES.filter(p => p !== '404.html');
  const priorities = {
    'index.html': '1.0',
    'services.html': '0.9',
    'routes-prices.html': '0.9',
    'muslim-friendly.html': '0.9',
    'how-it-works.html': '0.7',
    'faq.html': '0.7',
    'contact.html': '0.7',
    'terms.html': '0.3',
    'privacy.html': '0.3',
    'cancellation.html': '0.3',
  };
  const changefreqs = {
    'index.html': 'weekly',
    'routes-prices.html': 'weekly',
    'services.html': 'monthly',
    'muslim-friendly.html': 'monthly',
    'how-it-works.html': 'monthly',
    'faq.html': 'monthly',
    'contact.html': 'monthly',
    'terms.html': 'yearly',
    'privacy.html': 'yearly',
    'cancellation.html': 'yearly',
  };

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n`;

  for (const lang of ['en', ...LANGS]) {
    for (const page of indexedPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${buildLangUrl(lang, page)}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${changefreqs[page]}</changefreq>\n`;
      xml += `    <priority>${priorities[page]}</priority>\n`;
      for (const altLang of ['en', ...LANGS]) {
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${buildLangUrl(altLang, page)}"/>\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${buildLangUrl('en', page)}"/>\n`;
      xml += `  </url>\n\n`;
    }
  }

  xml += `</urlset>\n`;
  return xml;
}

// --- Build pipeline ---

async function build() {
  const translations = await loadTranslations();

  // 1. Refresh the EN root files (canonical/hreflang point to language URLs).
  console.log('Updating EN root files with path-based hreflang…');
  for (const page of PAGES) {
    let html = await fs.readFile(page, 'utf8');
    html = updateCanonicalAndAlternates(html, page, 'en');
    html = updateTitleAndDescription(html, page, 'en');
    await fs.writeFile(page, html);
  }

  // 2. Emit each non-EN language directory.
  for (const lang of LANGS) {
    console.log(`Building ${lang}/…`);
    await fs.mkdir(lang, { recursive: true });
    const dict = translations[lang];
    if (!dict) throw new Error(`No translation block for ${lang}`);

    for (const page of PAGES) {
      let html = await fs.readFile(page, 'utf8');
      html = replaceI18nText(html, dict);
      html = replaceI18nPlaceholders(html, dict);
      html = updateHtmlLangAttr(html, lang);
      html = updateLangButtonLabel(html, lang);
      html = updateTitleAndDescription(html, page, lang);
      html = updateCanonicalAndAlternates(html, page, lang);
      html = rewriteRelativeAssetPaths(html);
      await fs.writeFile(path.join(lang, page), html);
    }
  }

  // 3. Regenerate sitemap.
  console.log('Writing sitemap.xml…');
  await fs.writeFile('sitemap.xml', regenerateSitemap());

  console.log('\nDone. Pages built:');
  console.log(`  EN root:  ${PAGES.length} pages`);
  for (const lang of LANGS) {
    console.log(`  ${lang}/:      ${PAGES.length} pages`);
  }
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
