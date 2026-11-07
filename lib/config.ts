export const site = {
  name: "Al-Kausar",
  domain: "kataf.pk", // TODO confirm .pk or .com
  whatsapp: "92XXXXXXXXXX", // TODO
  email: "hello@kataf.pk", // TODO
  city: "Islamabad, Pakistan", // TODO confirm address
  hours: "Mon-Sat, 10:00-19:00", // TODO
};

export const siteUrl = `https://${site.domain}`;

export const whatsappLink = (text = "Hi Al-Kausar, I would like a quote.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// Display form of the WhatsApp number, e.g. +92 XXX XXXXXXX
export const whatsappDisplay = `+${site.whatsapp}`;
