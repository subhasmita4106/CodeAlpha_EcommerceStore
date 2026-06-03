import { Product } from './types';

export const products: Product[] = [
  {
    id: 'ceramic-vase',
    name: 'Minimalist Ceramic Vase',
    price: 45.00,
    subtitle: 'SERIES 01 / ARTIFACT',
    description: 'A sculptural piece designed to capture the essence of stillness. Hand-crafted from sustainable terracotta with a unique matte bone finish, this vessel balances architectural form with organic textures. Perfect as a standalone statement or a home for seasonal botanicals.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQljLFusoSJ8-hzQrwQGpgwA0Od6K90dW6mV5qjZ2aZS3hJtPUj4lotz4US2ufxyQG6aoJHAB98_iTFJ299z3B9u57RRcC2ZCAAboDE01vsvqZlz_JZBqFkFKd8KC6iIKaVIB7Y73bNGlDRICAMKWNHoCjTRYwewOaHYjihM1hndDSPoSdB8hichgoriXNTGW7pcVOeKxTtvZXOqhZ8te7_429XXGVkeQtK4pWtcYpYkWs8tmug4MQPrvqj6JhrvwoZeUZJM7PSZo',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCTGqXuMN8QI9vvxLHOjAyxMWyeqCuke15BTW8xrcyyg36XkDaBrzk6_AU-BGeug2rmHCWkHxyA0wEbqgLIjSwMBP_n_C7M5Mn7xZSVjEfa6B20oc-LloJBJraHo4VsXCCFmY6tmeTnke1fmNiiWXvh6yfZHSg3ao6mDDB9k_MEbT9GPPgxvFjiBeiOnOTNINBRZFInhR9Zp9LBKCx_3LdFIAtx3wM3zwSKQKROJz0zsQP5oPBHuK_Yk0c_Eu7K300J_SsfjBrQ7k',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHO0bNEQvFo9L9xctWiCQqByZuDIO3rAOT5cGbDr9vfKIeir8vc8_aeVUv7THNqIEQ-qJyvmrs1nrj9NUeOrkwCYqs6R3UhuLBaG9rzKNkCqoAqcV4Nn59LhbxNcKqohRzDl7lIVLzEs3LPFf7q7QHr_YrowM4tSsEEsTriQiLHEydvyFlFAu3B2gaQ96HnPk87unl9sCUrHFJNl7HSa2ma9-QUQRwOQTRMXSvuF-gw8VT44XQ2G-8A4O9H6W7rwI84PKpL2V1h5Y'
    ],
    colors: ['#F5F5F0', '#E5E1DA', '#484742'],
    sizes: ['SMALL', 'MEDIUM', 'LARGE'],
    specifications: [
      'Material: 100% Hand-fired Ceramic',
      'Dimensions: 12cm x 24cm (Small)',
      'Weight: 1.2kg',
      'Origin: Handcrafted in Portugal'
    ],
    shippingReturns: 'Free standard shipping on orders over $150. Easy returns within 30 days of delivery. Environmentally friendly plastic-free packaging.'
  },
  {
    id: 'serene-frames',
    name: 'Serene Frames',
    price: 180.00,
    subtitle: 'DESIGNER EYEWEAR',
    description: 'Handmade luxury designer frame crafted with premium Japanese acetate, combining structural durability with lightweight daily comfort. Featuring anti-reflective, blue-block protective lenses and premium titanium hinge mechanisms.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKX5_D02oSwdP_DMDNuIeAyloSbkMJ9OgO2dHX7zhsRwbw2rEiiogzZRFwtD9HYSmbIKWR9nOVUCaWa-357EYyx622_1LrEBEVxPELrnoQR87hC4XH8sZeKYelvwzYzT2yifhzZRiuSh6tWcjRFimely5eXQQYqVVYZ2GQl-ltDakSIjhOq6LsKSOWlg2YkV-_YYKz9hl31FIIhvwlWSYxAtyLe5bKqKaThqxz59QbjDPyGbEhauwxH4QJO5Cf_BRi6GYO6a5WorQ'
    ],
    colors: ['#484742', '#E5E1DA'],
    sizes: ['ONESIZE'],
    specifications: [
      'Frame Acetate: 100% Biodegradable Japanese Acetate',
      'Lenses: Premium nylon blue-light filtering',
      'Form factor: Unisex geometric frame',
      'Includes custom protective storage leather pouch'
    ],
    shippingReturns: 'Complimentary express worldwide shipping. Returns accepted within 14 days in original unworn condition.'
  },
  {
    id: 'tempo-runner',
    name: 'Tempo Runner',
    price: 145.00,
    subtitle: 'ACTIVE PERFORMANCE',
    description: 'Sleek and responsive athletic design maximizing comfort and lightness. Engineered with high-precision knit uppers, structural mid-foot reinforcements, and natural rubber traction outsoles for peak support.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnL3R4kCCQqClDejseqciUR3zs2z2YlIdi0DU2x-X8FH1OMpmDsfj6i84S2sxGonTrJbuSVsPJlKaydeduMm-2SX8tLsEmXSL7rJcuKiNwvozSMPZ8m_nc9BAsJ_lAF5m04rqKyFwbSOvXuRcapH7KdxGElN5Sz3YRi-_ozYm778-pdo_Stfu2lEUnvRjOUs64rtwT34qjB8rDzNreJmaTbSpYll2RuqrHM3yjBCLpxdUnt8Pl3PpkvPPq1HsbLTBnZbyGMLZ9Tro'
    ],
    colors: ['#E5E1DA', '#484742'],
    sizes: ['8', '9', '10', '11'],
    specifications: [
      'Upper: Dynamic structured active knit mesh',
      'Midsole: Cushioned high-density compound polymer',
      'Outsole: 100% raw high-traction textured rubber',
      'Vegan construction with recycled materials'
    ],
    shippingReturns: 'Free standard shipping. Returns or exchanges within 30 days.'
  },
  {
    id: 'studio-carryall',
    name: 'Studio Carryall',
    price: 210.00,
    subtitle: 'DAILY TOTE',
    description: 'Premium full-grain leather tote meticulously structured with minimalist curves. Generous interior volume with custom organizer pockets, premium zipper closures, and hand-finished, heavy-duty carry handles.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyJ8I85yhzYDn95mVajzxxWv22Cgrf7m36wtV8SpUwbAklMdlDY6A3L9HNbEIgeAetaeEAbrzUqssBEaLqqgTzSEP73eHLHj61GaHau93kXjNlci5u7kTzmkN2bJEpFtd1I-b6cYnzwVFNzYI0cE5vA81W7NdpXnkLNmmzOyXb86CCC4C9JjBzE7fIOBOUOxGsL40Z96_DIgYXIbELUintUn8FYVd-13ZonILjnZUlhhJwjvo4D_Leryr4OjY7Bnd-yiwaSRlxygA'
    ],
    colors: ['#1C1C17', '#F5F5F0'],
    sizes: ['ONESIZE'],
    specifications: [
      'Material: Full-grain Italian Calfskin Leather',
      'Dimensions: 38cm x 30cm x 15cm',
      'Interior: Organic cotton lining with device divider',
      'Handmade in small artisanal batches'
    ],
    shippingReturns: 'Complimentary express shipping with luxury signature gift packaging. Authorized returns within 30 days.'
  },
  {
    id: 'vessel-no-4',
    name: 'Vessel No. 4',
    price: 95.00,
    subtitle: 'OBJECT ART',
    description: 'A minimalist ceramic vessel highlighting organic curves and natural stone finishes. Crafted entirely by hand, capturing light gradients through smooth silhouette folds. An exceptional addition to shelves or entryway consoles.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNUGrydh7S-sV8pC52XNOr-F9IBkdFRxM23hvE5o1qHYSpqH-DyXZHF4qFMZvUOGA3Jx5LQ_AKJnBNgqRzlN6jIstHNixHA2Tc3yFyFY73SWgFCyZgas0bf4AMnz-5s857VhuPq08t-1DwMlHF4ombeBGhYiipRL0eR0K2PEFHeQ3-_tzGyS34xHt-xpIRUT1qYp24B6wzpuNqYvZhWHDbE7tn3D3WmIuWEG7ZiMuGOQe7Nm-px7f94jpcXfu3tb-aSEjxonlf5fA'
    ],
    colors: ['#E5E1DA', '#484742'],
    sizes: ['ONESIZE'],
    specifications: [
      'Material: 100% Terracotta Clay with textured finish',
      'Dimensions: 16cm x 16cm x 18cm',
      'Weight: 1.8kg',
      'Due to handcrafting, minor sculptural nuances will occur.'
    ],
    shippingReturns: 'Secured protective shipping in double-walled fragile items casing. Returns accepted within 30 days.'
  },
  {
    id: 'face-oil',
    name: 'Nourishing Face Oil',
    price: 54.00,
    subtitle: '30ml / Glass Bottle',
    description: 'A botanical face oil curated to nourish, restore elasticity, and protect your skin\'s moisture barrier. Soft clay tones, high-end organic ingredients, sustainable packaging.',
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAyznIugsCRhzN3JxnxJ9SHV_rbMHkcppkO0ie0XnR9rx1nQX_k0RQjhjOBfZD4Y7LQW_oDpU1Aw2hdp2ZGX8uvWg3tTgRmy5zdRivApjvFXh9CJJ1lan0lJocTSpFZvCRR-LgON8CZ9SExlMwz56pV2bt1ggOMltKPK_27qlG09V3BpR2r8XI-kfWOC95qpojiMVgaon3OLtIhNYCeBCFVW_s6fQx8dVZ6hwVo3ywzWM3vT7WtNHROyfAcVjFoO_SVvNRZ43zwZI"],
    colors: ['#F5F5F0'],
    sizes: ['30ml'],
    specifications: [
      'Volume: 30ml',
      'Packaging: Recyclable amber glass bottle with dropper',
      'Organic certified cold-pressed oils',
      'Fragrance-free formula ideal for sensitive skin'
    ]
  },
  {
    id: 'sandalwood-candle',
    name: 'Sandalwood Candle',
    price: 38.00,
    subtitle: 'Soy Wax / 12oz',
    description: 'Premium ceramic sandalwood candle featuring a textured matte finish. Slow burn soy wax blend releasing layers of calming woody cedar and vanilla aromatics into your workspace.',
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBLqtOyEuX2pB2AydITfc-GEUemjoe1IGg--gNPKs5VTEWy_9yiyClkrFTsKwlZAKkIHh_-Q9CwlLQNtK2u0txK_WHX_CcakcpsToKu5izxBNwvW-OCrsXowXX1T41J7zyZM8o-teNrQg6FRlWySOTvZTT3BT2fVx2xZpwLHu2zOZe8eAUC8p61JSVeapqXhKVvIN5Yfp_hzmta72ANznfecsKEBmLfaN1u8KETF9IWGYPNdiBwJoTak-5TUbXh64C9KSrwnSAaD0c"],
    colors: ['#E5E1DA'],
    sizes: ['12oz'],
    specifications: [
      'Wax: 100% natural, clean-burning soy wax',
      'Burn Time: Approximately 60 hours',
      'Wick: Hand-centered organic cotton wick',
      'Container: Artistically textured reusable ceramic jar'
    ]
  },
  {
    id: 'linen-shorts',
    name: 'Linen Lounge Shorts',
    price: 85.00,
    subtitle: 'Oatmeal / Medium',
    description: 'Fine organic linen lounge shorts designed for high comfort. Featuring breathable texture, adjustable drawstring waist, soft off-white and charcoal elements.',
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCDZE9fBYXEGhr7gopU8bj9d3mVR986LOou-eloeQlbLOyIKdxTx5P0nR_1jkXNeEBBMPuElLbo0yDMDjNg_Kfrv36r1L8ILhNTBtRIGs343g6Sg4Fxo31yGmRcgHxX9Cd7cwMHYdeqhgxYC0WQfaF3XK4OihVr-Rbtr9Dyy3B3pjLvJxkbUh0AflGp3pSrfAiIxfSY5ZCbCSRtyaJuEBCS9PqoX7F4K1JHU-JbXeE35khRHdLrg0CWDUhGUEvSjtsgJfb-XcdvVVc"],
    colors: ['#E5E1DA'],
    sizes: ['SMALL', 'MEDIUM', 'LARGE'],
    specifications: [
      'Fabric: 100% Organic certified linen',
      'Waist: Elastic waistband with woven drawcord',
      'Fit: Relaxed modern leg openings',
      'Sustainably certified dyed'
    ]
  },
  {
    id: 'arcane-sneaker',
    name: 'Arcane Sneaker',
    price: 240.00,
    subtitle: 'Cloud White / 42',
    description: 'A side view of a minimalist, luxury white sneaker with subtle cream suede accents. High-quality structured leather panels.',
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBYHVM_WUbbacQ4MKLyUW4u-GquPL4xR8HAueFArbeNPwK2E_sE_nqaO8r81gn0shOOU4iFlsGFMMhwwOzV1RWb7IauowjpGy8TvWwyPhKJxKIct3cd86Egm3igkZyqiAetohMpgvRAjXW_5nncMx7kp89WqIQNKHj3vFEiCu4jGFie08UIgfyicLmqBZda_N4yTPI3ZgWBDz5D3LvOhNhI5m9xjUL1tpbdwvadyYy8dLbP2HgKvddefWs4gJ2r14Vv75PkWhGaJ5o"],
    colors: ['#F5F5F0'],
    sizes: ['41', '42', '43']
  }
];

export const initialCartItems = [
  {
    id: 'face-oil-default',
    product: products.find(p => p.id === 'face-oil')!,
    quantity: 1,
    selectedColor: '#F5F5F0',
    selectedSize: '30ml'
  },
  {
    id: 'sandalwood-candle-default',
    product: products.find(p => p.id === 'sandalwood-candle')!,
    quantity: 2,
    selectedColor: '#E5E1DA',
    selectedSize: '12oz'
  },
  {
    id: 'linen-shorts-default',
    product: products.find(p => p.id === 'linen-shorts')!,
    quantity: 1,
    selectedColor: '#E5E1DA',
    selectedSize: 'MEDIUM'
  }
];
