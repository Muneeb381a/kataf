export const site = {
  name: "Al-Kausar",
  domain: "kataf.pk", // TODO confirm .pk or .com
  whatsapp: "923051015353",
  email: "alkausarcomputerinstitue@gmail.com",
  city: "Islamabad, Pakistan", // TODO confirm address
  hours: "Mon-Sat, 10:00-19:00", // TODO
};

export const siteUrl = `https://${site.domain}`;

export const whatsappLink = (text = "Hi Al-Kausar, I would like a quote.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// Display form of the WhatsApp number, e.g. +92 305 1015353
export const whatsappDisplay = `+${site.whatsapp.slice(0, 2)} ${site.whatsapp.slice(2, 5)} ${site.whatsapp.slice(5)}`;
